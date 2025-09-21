"use client";

import { SignUp } from '@clerk/nextjs';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Shield, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  const { colors } = useTheme();

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: colors.gradients.background }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-20 animate-pulse"
          style={{ background: colors.gradients.primary }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-15 animate-pulse delay-1000"
          style={{ background: colors.gradients.secondary }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 animate-pulse delay-500"
          style={{ background: colors.gradients.accent }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-lg font-semibold transition-all duration-200 hover:scale-105"
              style={{ color: colors.text.primary }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Button>
          </Link>
          
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8" style={{ color: colors.primary[600] }} />
            <span 
              className="text-2xl font-bold"
              style={{ color: colors.text.primary }}
            >
              ByteMedics
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 
                className="text-4xl lg:text-5xl font-bold leading-tight"
                style={{ color: colors.text.primary }}
              >
                Start Your
                <span 
                  className="block bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent"
                >
                  Health Journey Today
                </span>
              </h1>
              <p 
                className="text-xl leading-relaxed max-w-lg mx-auto lg:mx-0"
                style={{ color: colors.text.secondary }}
              >
                Join thousands of users who trust ByteMedics for their health insights. Create your account and get personalized AI-powered medical guidance.
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { icon: Shield, text: "HIPAA-Compliant & Secure" },
                { icon: Sparkles, text: "Advanced AI Health Analysis" },
                { icon: Users, text: "Trusted by Healthcare Professionals" }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-xl"
                  style={{ backgroundColor: `${colors.secondary[50]}80` }}
                >
                  <feature.icon 
                    className="w-5 h-5 flex-shrink-0" 
                    style={{ color: colors.primary[600] }}
                  />
                  <span 
                    className="text-sm font-medium"
                    style={{ color: colors.text.secondary }}
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="pt-4">
              <p 
                className="text-sm"
                style={{ color: colors.text.muted }}
              >
                ✨ Free to start • No credit card required • Cancel anytime
              </p>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="flex justify-center">
            <Card 
              className="p-8 backdrop-blur-xl border shadow-2xl rounded-3xl w-full max-w-md"
              style={{ 
                backgroundColor: `${colors.background.card}95`,
                borderColor: `${colors.secondary[100]}60`
              }}
            >
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 
                    className="text-2xl font-bold"
                    style={{ color: colors.text.primary }}
                  >
                    Create Account
                  </h2>
                  <p 
                    className="text-sm"
                    style={{ color: colors.text.muted }}
                  >
                    Get started with your health assistant
                  </p>
                </div>

                {/* Clerk Sign Up Component */}
                <div className="flex justify-center">
                  <SignUp 
                    routing="path"
                    path="/sign-up"
                    redirectUrl="/chat"
                    signInUrl="/sign-in"
                    appearance={{
                      elements: {
                        rootBox: "mx-auto",
                        card: "shadow-none border-0 bg-transparent",
                      },
                      variables: {
                        colorPrimary: colors.primary[600],
                        colorBackground: colors.background.card,
                        colorText: colors.text.primary,
                        colorInputBackground: colors.background.secondary,
                        colorInputText: colors.text.primary,
                      }
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center">
        <p 
          className="text-sm"
          style={{ color: colors.text.muted }}
        >
          Already have an account?{' '}
          <Link 
            href="/sign-in" 
            className="font-medium hover:underline transition-colors"
            style={{ color: colors.primary[600] }}
          >
            Sign in here
          </Link>
        </p>
      </footer>
    </div>
  );
}