import type { Request, Response } from "express";

export const validateRequest = (schema: any) => {
    return (req: Request, res: Response, next: any) => {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        } catch (error: any) {
            return res.status(400).json({
                error: "Validation failed",
                details: error.errors || error.message
            });
        }
    };
};
