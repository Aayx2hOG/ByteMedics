import { z } from "zod";

export const RoleEnum = z.enum(["USER", "BOT"]);

export const UserSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1).max(100),
    email: z.string().email(),
    password: z.string().min(6),
});

export const UserCreateSchema = UserSchema.omit({ id: true });
export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const ChatSessionSchema = z.object({
    id: z.string().uuid().optional(),
    userId: z.string().uuid(),
    startedAt: z.date().optional(),
    endedAt: z.date().optional().nullable(),
    symptomsId: z.string().uuid().optional().nullable(),
});

export const ChatSessionCreateSchema = ChatSessionSchema.omit({
    id: true,
    startedAt: true,
    endedAt: true,
});

export const ChatMessageSchema = z.object({
    id: z.string().uuid().optional(),
    sessionId: z.string().uuid(),
    sender: z.string().min(1),
    message: z.string().min(1),
    timestamp: z.date().optional(),
    role: RoleEnum,
    chatSessionId: z.string().uuid().optional().nullable(),
});

export const ChatMessageCreateSchema = ChatMessageSchema.omit({
    id: true,
    timestamp: true,
});

export const ReminderSchema = z.object({
    id: z.string().uuid().optional(),
    userId: z.string().uuid(),
    title: z.string().min(1).max(200),
    description: z.string().max(1000),
    date: z.coerce.date(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const ReminderCreateSchema = ReminderSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const SymptomSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1).max(100),
    description: z.string().max(1000),
    severity: z.number().min(1).max(10),
    createdAt: z.date().optional(),
});

export const SymptomCreateSchema = SymptomSchema.omit({
    id: true,
    createdAt: true,
});

export type Role = z.infer<typeof RoleEnum>;

export type User = z.infer<typeof UserSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;

export type ChatSession = z.infer<typeof ChatSessionSchema>;
export type ChatSessionCreate = z.infer<typeof ChatSessionCreateSchema>;

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatMessageCreate = z.infer<typeof ChatMessageCreateSchema>;

export type Reminder = z.infer<typeof ReminderSchema>;
export type ReminderCreate = z.infer<typeof ReminderCreateSchema>;

export type Symptom = z.infer<typeof SymptomSchema>;
export type SymptomCreate = z.infer<typeof SymptomCreateSchema>;
