"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Mic, Volume2, Globe, Smartphone, Zap, ArrowRight, Star, CheckCircle, Play, InfoIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  const { colors } = useTheme();

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
          borderColor: `${colors.secondary[200]}50`
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
            <div className="hidden md:flex items-center space-x-2 text-sm" style={{ color: colors.text.muted }}>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <ThemeToggle />
            <Link href="/chat">
              <Button 
                className="text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ background: colors.gradients.primary }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat
                <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </Button>
            </Link>
          </div>
        </div>
      </header>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-stone-100 dark:bg-gray-700/50 text-gray-800 dark:text-stone-200 text-sm font-medium mb-8 border border-stone-200 dark:border-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            AI-Powered • Available 24/7 • HIPAA Compliant
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-800 via-green-800 to-gray-900 bg-clip-text text-transparent dark:from-stone-100 dark:via-green-100 dark:to-stone-200">
              Your Personal
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 via-sky-500 to-green-700 bg-clip-text text-transparent animate-pulse">
              Health Assistant
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 dark:text-stone-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience the future of healthcare communication with our AI-powered chatbot. 
            Get instant medical insights, symptom analysis, and health guidance through natural conversation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/chat">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 group"
              >
                <MessageCircle className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                Start Free Consultation
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">50K+</div>
              <div className="text-gray-700 dark:text-stone-400">Consultations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-2">98%</div>
              <div className="text-gray-700 dark:text-stone-400">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700 dark:text-green-300 mb-2">24/7</div>
              <div className="text-gray-700 dark:text-stone-400">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent dark:from-stone-100 dark:to-stone-300">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-700 dark:text-stone-400 max-w-3xl mx-auto">
            Everything you need for comprehensive health communication and AI-powered medical assistance
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Feature Card 1 */}
          <Card className="relative group border-0 bg-stone-50/80 dark:bg-gray-800/80 backdrop-blur-xl hover:bg-stone-100/90 dark:hover:bg-gray-700/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-stone-200 mb-3">Voice Diagnosis</CardTitle>
              <CardDescription className="text-gray-700 dark:text-stone-400 text-lg leading-relaxed">
                Describe your symptoms naturally using voice commands with advanced speech recognition technology
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 2 */}
          <Card className="relative group border-0 bg-stone-50/80 dark:bg-gray-800/80 backdrop-blur-xl hover:bg-stone-100/90 dark:hover:bg-gray-700/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-stone-200 mb-3">Audio Guidance</CardTitle>
              <CardDescription className="text-gray-700 dark:text-stone-400 text-lg leading-relaxed">
                Listen to detailed health recommendations with natural-sounding AI voice responses
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 3 */}
          <Card className="relative group border-0 bg-stone-50/80 dark:bg-gray-800/80 backdrop-blur-xl hover:bg-stone-100/90 dark:hover:bg-gray-700/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-stone-200 mb-3">Global Access</CardTitle>
              <CardDescription className="text-gray-700 dark:text-stone-400 text-lg leading-relaxed">
                Multi-language support for healthcare access across different regions and cultures
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 4 */}
          <Card className="relative group border-0 bg-stone-50/80 dark:bg-gray-800/80 backdrop-blur-xl hover:bg-stone-100/90 dark:hover:bg-gray-700/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-stone-200 mb-3">Mobile Health</CardTitle>
              <CardDescription className="text-gray-700 dark:text-stone-400 text-lg leading-relaxed">
                Access healthcare guidance anytime, anywhere with our mobile-optimized platform
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 5 */}
          <Card className="relative group border-0 bg-stone-50/80 dark:bg-gray-800/80 backdrop-blur-xl hover:bg-stone-100/90 dark:hover:bg-gray-700/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-stone-200 mb-3">Instant Analysis</CardTitle>
              <CardDescription className="text-gray-700 dark:text-stone-400 text-lg leading-relaxed">
                Get immediate health insights and recommendations powered by advanced AI algorithms
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 6 */}
          <Card className="relative group border-0 bg-stone-50/80 dark:bg-gray-800/80 backdrop-blur-xl hover:bg-stone-100/90 dark:hover:bg-gray-700/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-stone-200 mb-3">HIPAA Compliant</CardTitle>
              <CardDescription className="text-gray-700 dark:text-stone-400 text-lg leading-relaxed">
                Your health data is protected with enterprise-grade security and privacy standards
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 py-20">
        <div className="relative bg-gradient-to-r from-green-600 via-green-700 to-sky-600 rounded-3xl p-12 md:p-20 text-center text-white overflow-hidden">
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
                <Button size="lg" variant="secondary" className="text-lg px-12 py-6 bg-stone-100 text-gray-800 hover:bg-stone-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
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
      <footer className="relative border-t border-stone-200/50 bg-stone-50/90 dark:bg-gray-800/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent dark:from-stone-100 dark:to-stone-200">
                  ByteMedics
                </span>
                <p className="text-xs text-gray-600 dark:text-stone-400">AI Health Assistant</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-700 dark:text-stone-400 mb-2">
                © 2025 ByteMedics. Advanced healthcare communication.
              </p>
              <p className="text-sm text-gray-600 dark:text-stone-500">
                HIPAA Compliant • Secure • Trusted by Healthcare Professionals
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}