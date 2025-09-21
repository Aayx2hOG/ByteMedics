"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Mic, Volume2, Globe, Smartphone, Zap, ArrowRight, Star, CheckCircle, Play } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400 to-cyan-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-300 to-orange-400 rounded-full opacity-10 blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-200">
                ByteMedics
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">AI Health Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <Link href="/chat">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium mb-8 border border-blue-200 dark:border-blue-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            AI-Powered • Available 24/7 • HIPAA Compliant
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent dark:from-white dark:via-blue-100 dark:to-purple-100">
              Your Personal
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Health Assistant
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience the future of healthcare communication with our AI-powered chatbot. 
            Get instant medical insights, symptom analysis, and health guidance through natural conversation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/chat">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 group"
              >
                <MessageCircle className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                Start Free Consultation
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-12 py-6 rounded-2xl border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 group"
            >
              <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50K+</div>
              <div className="text-slate-600 dark:text-slate-400">Consultations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">98%</div>
              <div className="text-slate-600 dark:text-slate-400">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">24/7</div>
              <div className="text-slate-600 dark:text-slate-400">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Everything you need for comprehensive health communication and AI-powered medical assistance
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Feature Card 1 */}
          <Card className="relative group border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">Voice Diagnosis</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Describe your symptoms naturally using voice commands with advanced speech recognition technology
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 2 */}
          <Card className="relative group border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">Audio Guidance</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Listen to detailed health recommendations with natural-sounding AI voice responses
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 3 */}
          <Card className="relative group border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">Global Access</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Multi-language support for healthcare access across different regions and cultures
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 4 */}
          <Card className="relative group border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">Mobile Health</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Access healthcare guidance anytime, anywhere with our mobile-optimized platform
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 5 */}
          <Card className="relative group border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">Instant Analysis</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Get immediate health insights and recommendations powered by advanced AI algorithms
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 6 */}
          <Card className="relative group border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">HIPAA Compliant</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Your health data is protected with enterprise-grade security and privacy standards
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
                Clear audio feedback with natural-sounding text-to-speech synthesis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow bg-white dark:bg-slate-800">
            <CardHeader>
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
              <CardTitle className="text-slate-800 dark:text-slate-200">Multi-Language</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Support for multiple languages to serve a global user base
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow bg-white dark:bg-slate-800">
            <CardHeader>
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
              <CardTitle className="text-slate-800 dark:text-slate-200">Mobile Ready</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Fully responsive design optimized for all devices and screen sizes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow bg-white dark:bg-slate-800">
            <CardHeader>
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
              <CardTitle className="text-slate-800 dark:text-slate-200">Real-time</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Instant messaging with WebSocket technology for seamless communication
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow bg-white dark:bg-slate-800">
            <CardHeader>
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
              <CardTitle className="text-slate-800 dark:text-slate-200">Smart Interface</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Intuitive design with intelligent features for enhanced user experience
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-slate-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join professionals who rely on our platform for efficient communication
          </p>
          <Link href="/chat">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-slate-700 hover:bg-slate-100">
              <MessageCircle className="w-5 h-5 mr-2" />
              Try the Platform
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                ByteMedics
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © 2025 ByteMedics. Professional communication solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}