"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Mic, Volume2, Globe, Smartphone, Zap, ArrowRight, Star, CheckCircle, Play, InfoIcon, X, Heart, Shield, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useUser } from '@clerk/nextjs';
import { UserProfile } from '@/components/UserProfile';

export default function LandingPage() {
  const { user, isLoaded } = useUser();
  const [isHovered, setIsHovered] = useState(false);
  const [showHealthInfo, setShowHealthInfo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by showing a loading state until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-stone-50 to-gray-200">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen overflow-hidden"
      style={{ background: colors.gradients.background }}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: colors.gradients.primary }}
        ></div>
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse delay-1000"
          style={{ background: colors.gradients.accent }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse delay-500"
          style={{ background: colors.gradients.secondary }}
        ></div>
      </div>

      {/* Header */}
      <header 
        className="relative border-b backdrop-blur-xl shadow-lg"
        style={{ 
          backgroundColor: colors.background.card,
          borderColor: `${colors.secondary[100]}80`
        }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: colors.gradients.primary }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping"
                style={{ backgroundColor: colors.primary[500] }}
              ></div>
              <div 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
                style={{ backgroundColor: colors.primary[500] }}
              ></div>
            </div>
            <div>
              <h1 
                className="text-2xl font-bold"
                style={{ color: colors.text.primary }}
              >
                ByteMedics
              </h1>
              <p 
                className="text-xs"
                style={{ color: colors.text.muted }}
              >
                AI Health Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoaded && user ? (
              <>
                <UserProfile />
                <ThemeToggle />
              </>
            ) : (
              <>
                <Link href="/sign-up">
                  <Button
                    className="transition-all duration-200 hover:scale-105 shadow-lg"
                    style={{
                      background: colors.gradients.primary,
                      color: 'white'
                    }}
                  >
                    Get Started
                  </Button>
                </Link>
                <ThemeToggle />
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 border"
            style={{ 
              backgroundColor: colors.secondary[50],
              color: colors.text.primary,
              borderColor: colors.secondary[100]
            }}
          >
            <div 
              className="w-2 h-2 rounded-full mr-2 animate-pulse"
              style={{ backgroundColor: colors.primary[500] }}
            ></div>
            AI-Powered • Available 24/7 • HIPAA Compliant
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span style={{ color: colors.text.primary }}>
              Your Personal
            </span>
            <br />
            <span 
              className="animate-pulse font-black"
              style={{ 
                color: colors.primary[600]
              }}
            >
              Health Assistant
            </span>
          </h1>

          <p 
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{ color: colors.text.secondary }}
          >
            Experience the future of healthcare communication with our AI-powered chatbot. 
            Get instant medical insights, symptom analysis, and health guidance through natural conversation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href={user ? "/chat" : "/sign-up"}>
              <Button 
                size="lg" 
                className="text-white text-lg px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 group"
                style={{ background: colors.gradients.primary }}
              >
                <MessageCircle className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                {user ? "Continue Chat" : "Start Free Consultation"}
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-12 py-6 rounded-2xl border-2 hover:scale-105 transition-all duration-300 group"
              style={{ 
                borderColor: colors.secondary[500],
                color: colors.text.primary,
                backgroundColor: colors.background.card
              }}
              onClick={() => setShowHealthInfo(true)}
            >
              <InfoIcon className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: colors.primary[600] }}
              >
                50K+
              </div>
              <div style={{ color: colors.text.muted }}>Consultations</div>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: colors.accent[600] }}
              >
                98%
              </div>
              <div style={{ color: colors.text.muted }}>Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: colors.secondary[600] }}
              >
                24/7
              </div>
              <div style={{ color: colors.text.muted }}>Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <h2 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: colors.text.primary }}
          >
            Powerful Features
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: colors.text.secondary }}
          >
            Everything you need for comprehensive health communication and AI-powered medical assistance
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Feature Card 1 */}
          <Card 
            className="relative group border-0 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{ backgroundColor: colors.background.card }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `${colors.gradients.primary}10` }}
            ></div>
            <CardHeader className="relative z-10">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{ background: colors.gradients.primary }}
              >
                <Mic className="w-8 h-8 text-white" />
              </div>
              <CardTitle 
                className="text-2xl font-bold mb-3"
                style={{ color: colors.text.primary }}
              >
                Voice Diagnosis
              </CardTitle>
              <CardDescription 
                className="text-lg leading-relaxed"
                style={{ color: colors.text.secondary }}
              >
                Describe your symptoms naturally using voice commands with advanced speech recognition technology
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 2 */}
          <Card 
            className="relative group border-0 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{ backgroundColor: colors.background.card }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `${colors.gradients.accent}10` }}
            ></div>
            <CardHeader className="relative z-10">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{ background: colors.gradients.accent }}
              >
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle 
                className="text-2xl font-bold mb-3"
                style={{ color: colors.text.primary }}
              >
                Audio Guidance
              </CardTitle>
              <CardDescription 
                className="text-lg leading-relaxed"
                style={{ color: colors.text.secondary }}
              >
                Listen to detailed health recommendations with natural-sounding AI voice responses
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 3 */}
          <Card 
            className="relative group border-0 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{ backgroundColor: colors.background.card }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `${colors.gradients.secondary}10` }}
            ></div>
            <CardHeader className="relative z-10">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{ background: colors.gradients.secondary }}
              >
                <Globe className="w-8 h-8 text-white" />
              </div>
              <CardTitle 
                className="text-2xl font-bold mb-3"
                style={{ color: colors.text.primary }}
              >
                Global Access
              </CardTitle>
              <CardDescription 
                className="text-lg leading-relaxed"
                style={{ color: colors.text.secondary }}
              >
                Multi-language support for healthcare access across different regions and cultures
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 4 */}
          <Card 
            className="relative group border-0 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{ backgroundColor: colors.background.card }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `${colors.gradients.accent}10` }}
            ></div>
            <CardHeader className="relative z-10">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{ background: colors.gradients.accent }}
              >
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <CardTitle 
                className="text-2xl font-bold mb-3"
                style={{ color: colors.text.primary }}
              >
                Mobile Health
              </CardTitle>
              <CardDescription 
                className="text-lg leading-relaxed"
                style={{ color: colors.text.secondary }}
              >
                Access healthcare guidance anytime, anywhere with our mobile-optimized platform
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 5 */}
          <Card 
            className="relative group border-0 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{ backgroundColor: colors.background.card }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `${colors.gradients.primary}10` }}
            ></div>
            <CardHeader className="relative z-10">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{ background: colors.gradients.primary }}
              >
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle 
                className="text-2xl font-bold mb-3"
                style={{ color: colors.text.primary }}
              >
                Instant Analysis
              </CardTitle>
              <CardDescription 
                className="text-lg leading-relaxed"
                style={{ color: colors.text.secondary }}
              >
                Get immediate health insights and recommendations powered by advanced AI algorithms
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 6 */}
          <Card 
            className="relative group border-0 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{ backgroundColor: colors.background.card }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `${colors.gradients.secondary}10` }}
            ></div>
            <CardHeader className="relative z-10">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{ background: colors.gradients.secondary }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle 
                className="text-2xl font-bold mb-3"
                style={{ color: colors.text.primary }}
              >
                HIPAA Compliant
              </CardTitle>
              <CardDescription 
                className="text-lg leading-relaxed"
                style={{ color: colors.text.secondary }}
              >
                Your health data is protected with enterprise-grade security and privacy standards
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 py-20">
        <div 
          className="relative rounded-3xl p-12 md:p-20 text-center text-white overflow-hidden"
          style={{ background: colors.gradients.cta }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Health?
            </h3>
            <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto">
              Join thousands of users who trust ByteMedics for their healthcare needs. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/chat">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-lg px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  style={{ 
                    backgroundColor: colors.background.primary,
                    color: colors.text.primary
                  }}
                >
                  <MessageCircle className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                  Start Free Consultation
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="relative border-t backdrop-blur-xl"
        style={{ 
          backgroundColor: colors.background.card,
          borderColor: `${colors.secondary[100]}80`
        }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: colors.gradients.primary }}
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <span 
                  className="text-xl font-bold"
                  style={{ color: colors.text.primary }}
                >
                  ByteMedics
                </span>
                <p 
                  className="text-xs"
                  style={{ color: colors.text.muted }}
                >
                  AI Health Assistant
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p 
                className="mb-2"
                style={{ color: colors.text.secondary }}
              >
                © 2025 ByteMedics. Advanced healthcare communication.
              </p>
              <p 
                className="text-sm"
                style={{ color: colors.text.muted }}
              >
                HIPAA Compliant • Secure • Trusted by Healthcare Professionals
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Health Information Modal */}
      {showHealthInfo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
            style={{ backgroundColor: colors.background.primary }}
          >
            {/* Modal Header */}
            <div 
              className="sticky top-0 flex items-center justify-between p-6 border-b backdrop-blur-xl"
              style={{ 
                backgroundColor: colors.background.card,
                borderColor: `${colors.secondary[100]}80`
              }}
            >
              <h2 
                className="text-3xl font-bold flex items-center"
                style={{ color: colors.text.primary }}
              >
                <Heart className="w-8 h-8 mr-3" style={{ color: colors.primary[600] }} />
                Health & Wellness Information
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHealthInfo(false)}
                className="hover:scale-110 transition-transform duration-200"
              >
                <X className="w-6 h-6" style={{ color: colors.text.muted }} />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Key Health Tips */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card 
                  className="border-0 shadow-lg"
                  style={{ backgroundColor: colors.background.card }}
                >
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                        style={{ background: colors.gradients.primary }}
                      >
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle style={{ color: colors.text.primary }}>
                        Preventive Care
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription style={{ color: colors.text.secondary }}>
                      <ul className="space-y-3 text-lg">
                        <li>• Regular health checkups every 6-12 months</li>
                        <li>• Blood pressure and cholesterol monitoring</li>
                        <li>• Age-appropriate cancer screenings</li>
                        <li>• Vaccinations and immunizations</li>
                        <li>• Dental and vision examinations</li>
                      </ul>
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card 
                  className="border-0 shadow-lg"
                  style={{ backgroundColor: colors.background.card }}
                >
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                        style={{ background: colors.gradients.accent }}
                      >
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle style={{ color: colors.text.primary }}>
                        Daily Wellness
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription style={{ color: colors.text.secondary }}>
                      <ul className="space-y-3 text-lg">
                        <li>• 7-9 hours of quality sleep nightly</li>
                        <li>• 150 minutes of moderate exercise weekly</li>
                        <li>• Balanced nutrition with fruits & vegetables</li>
                        <li>• 8 glasses of water daily</li>
                        <li>• Stress management and meditation</li>
                      </ul>
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              {/* Warning Signs */}
              <div className="mb-12">
                <Card 
                  className="border-0 shadow-lg"
                  style={{ backgroundColor: colors.background.card }}
                >
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                        style={{ background: colors.gradients.secondary }}
                      >
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle style={{ color: colors.text.primary }}>
                        When to Seek Medical Attention
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg" style={{ color: colors.text.primary }}>
                          Emergency Symptoms:
                        </h4>
                        <CardDescription style={{ color: colors.text.secondary }}>
                          <ul className="space-y-2">
                            <li>• Chest pain or pressure</li>
                            <li>• Difficulty breathing</li>
                            <li>• Severe headache with vision changes</li>
                            <li>• Sudden weakness or numbness</li>
                            <li>• High fever with confusion</li>
                          </ul>
                        </CardDescription>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg" style={{ color: colors.text.primary }}>
                          Schedule an Appointment:
                        </h4>
                        <CardDescription style={{ color: colors.text.secondary }}>
                          <ul className="space-y-2">
                            <li>• Persistent cough or cold symptoms</li>
                            <li>• Unusual fatigue or weakness</li>
                            <li>• Changes in appetite or weight</li>
                            <li>• Skin changes or new growths</li>
                            <li>• Persistent pain or discomfort</li>
                          </ul>
                        </CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mental Health */}
              <div className="mb-12">
                <Card 
                  className="border-0 shadow-lg"
                  style={{ backgroundColor: colors.background.card }}
                >
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                        style={{ background: colors.gradients.primary }}
                      >
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle style={{ color: colors.text.primary }}>
                        Mental Health & Wellbeing
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription style={{ color: colors.text.secondary }}>
                      <div className="grid md:grid-cols-3 gap-6 text-lg">
                        <div>
                          <h4 className="font-semibold mb-3" style={{ color: colors.text.primary }}>
                            Stress Management:
                          </h4>
                          <ul className="space-y-2">
                            <li>• Practice mindfulness</li>
                            <li>• Deep breathing exercises</li>
                            <li>• Regular physical activity</li>
                            <li>• Maintain social connections</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3" style={{ color: colors.text.primary }}>
                            Warning Signs:
                          </h4>
                          <ul className="space-y-2">
                            <li>• Persistent sadness</li>
                            <li>• Loss of interest</li>
                            <li>• Sleep disturbances</li>
                            <li>• Anxiety or panic</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3" style={{ color: colors.text.primary }}>
                            Get Help:
                          </h4>
                          <ul className="space-y-2">
                            <li>• Talk to a counselor</li>
                            <li>• Join support groups</li>
                            <li>• Contact crisis hotlines</li>
                            <li>• Reach out to trusted friends</li>
                          </ul>
                        </div>
                      </div>
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              {/* Disclaimer */}
              <div 
                className="p-6 rounded-2xl border-l-4"
                style={{ 
                  backgroundColor: colors.secondary[50],
                  borderColor: colors.accent[500]
                }}
              >
                <p className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                  <strong>Medical Disclaimer:</strong> This information is for educational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns. In case of emergency, call 911 or your local emergency services immediately.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/chat">
                  <Button 
                    size="lg"
                    className="text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    style={{ background: colors.gradients.primary }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Talk to AI Health Assistant
                  </Button>
                </Link>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => setShowHealthInfo(false)}
                  className="transition-all duration-300 hover:scale-105"
                  style={{ 
                    borderColor: colors.secondary[500],
                    color: colors.text.primary,
                    backgroundColor: colors.background.card
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}