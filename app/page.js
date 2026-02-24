"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Import Google Fonts
import { Fredoka, Inter, Nunito } from 'next/font/google';

const fredoka = Fredoka({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-fredoka'
});

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter'
});

const nunito = Nunito({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-nunito'
});

const navLinks = ["Home", "Badges", "Community", "Docs", "GitHub"];

const howItWorks = [
  {
    number: "01",
    title: "Collect Badges",
    description: "Earn badges from various platforms and activities. Import from GitHub, dev.to, and more!",
    bgColor: "bg-pink-50",
    accentColor: "from-pink-400 to-purple-400",
    image: "/assets/cbhibifoxwithtrophy.png"
  },
  {
    number: "02",
    title: "Customize Your Profile",
    description: "Arrange your badges, choose themes, and make your collection uniquely yours",
    bgColor: "bg-purple-50",
    accentColor: "from-purple-400 to-blue-400",
    image: "/assets/chibigirlselectingpins.png"
  },
  {
    number: "03",
    title: "Share & Show Off",
    description: "Share your badge collection with the world. Export as image or embed on your site",
    bgColor: "bg-blue-50",
    accentColor: "from-blue-400 to-cyan-400",
    image: "/assets/chibigirltyping.png"
  }
];

const featuredBadges = [
  { 
    id: 1, 
    name: "Code Master", 
    emoji: "💻", 
    color: "from-purple-400 to-pink-400",
    description: "Awarded for mastering multiple programming languages"
  },
  { 
    id: 2, 
    name: "100 Commits", 
    emoji: "⚡", 
    color: "from-yellow-400 to-orange-400",
    description: "Celebrating 100+ commits to open source projects"
  },
  { 
    id: 3, 
    name: "Bug Hunter", 
    emoji: "🐛", 
    color: "from-green-400 to-emerald-400",
    description: "Expert at finding and fixing critical bugs"
  },
  { 
    id: 4, 
    name: "Open Source Hero", 
    emoji: "🌟", 
    color: "from-blue-400 to-cyan-400",
    description: "Significant contributions to open source community"
  },
  { 
    id: 5, 
    name: "Design Guru", 
    emoji: "🎨", 
    color: "from-pink-400 to-rose-400",
    description: "Creating beautiful and functional designs"
  },
  { 
    id: 6, 
    name: "AI Explorer", 
    emoji: "🤖", 
    color: "from-indigo-400 to-purple-400",
    description: "Pioneering work in artificial intelligence"
  }
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeBadge, setActiveBadge] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={`min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 ${inter.variable} ${fredoka.variable} ${nunito.variable} relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating clouds */}
        <div className="absolute top-20 left-10 w-64 h-24 bg-gradient-to-r from-white/60 to-white/40 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-40 right-20 w-48 h-20 bg-gradient-to-r from-pink-100/60 to-white/40 rounded-full blur-xl animate-float-medium" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-1/4 w-56 h-20 bg-gradient-to-r from-blue-100/60 to-white/40 rounded-full blur-xl animate-float-fast" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 right-1/4 w-40 h-16 bg-gradient-to-r from-purple-100/60 to-white/40 rounded-full blur-xl animate-float-slow" style={{ animationDelay: '1.5s' }} />
        
        {/* Sparkles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
        <div className="absolute top-16 right-16 w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="absolute bottom-16 left-16 w-2 h-2 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '0.8s' }} />
        
        {/* Badge silhouettes */}
        <div className="absolute top-16 right-16 w-32 h-32 border-4 border-purple-200/50 rounded-full" />
        <div className="absolute bottom-20 left-20 w-24 h-24 border-4 border-pink-200/50 rounded-2xl rotate-12" />
        <div className="absolute top-40 left-10 w-20 h-20 border-4 border-blue-200/50 rounded-full" />
        <div className="absolute bottom-40 right-10 w-16 h-16 border-4 border-yellow-200/50 rounded-2xl -rotate-12" />
      </div>

      {/* Header/Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-lg shadow-purple-100/50' : 'py-5 bg-transparent'
      }`}>
        <nav className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400 shadow-lg shadow-purple-300 animate-gradient-xy" />
              <div className="absolute inset-1 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">◎</span>
              </div>
            </div>
            <h1 className={`text-2xl font-bold ${fredoka.className} text-transparent bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text`}>
              OS Pins
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className={`font-medium ${inter.className} text-purple-700 hover:text-pink-500 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-pink-400 after:to-purple-400 after:transition-all after:duration-300`}
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className={`${nunito.className} font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg shadow-purple-300/50 hover:shadow-purple-300/80 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base sm:px-6 sm:py-3`}>
              Get Started
            </button>
            <button className="md:hidden p-2 hover:bg-white/20 rounded-full transition-colors">
              <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight ${fredoka.className}`}>
              <span className="text-transparent bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text">
                Collect & Show Off
              </span>
              <br />
              <span className="text-purple-900">Your Digital Badges!</span>
            </h1>
            <p className={`text-lg sm:text-xl ${inter.className} text-gray-700 max-w-xl`}>
              Join thousands of developers showcasing their achievements with beautiful, customizable badge collections
            </p>
            <div className="flex flex-wrap gap-4">
              <button className={`${nunito.className} font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white text-base sm:text-lg shadow-xl shadow-purple-300/50 hover:shadow-purple-300/80 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden`}>
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button className={`${nunito.className} font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-purple-400 text-purple-700 text-base sm:text-lg hover:bg-purple-50 hover:border-purple-500 transition-all duration-300`}>
                View Badges
              </button>
            </div>
            
            <div className="pt-8">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gradient-to-br from-pink-300 to-purple-400" />
                  ))}
                </div>
                <p className={`text-sm sm:text-base ${inter.className} text-gray-600`}>
                  <span className="font-semibold text-purple-700">5,000+</span> developers already collecting
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main illustration container */}
              <div className="relative bg-gradient-to-br from-white via-white/95 to-white/90 rounded-[40px] p-6 sm:p-8 shadow-2xl shadow-purple-200/50 backdrop-blur-sm border border-white/50">
                {/* Character with laptop */}
                <div className="relative h-64 sm:h-72 md:h-80 mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-2xl" />
                      <div className="relative w-full h-full">
                        <Image
                          src="/assets/chibigirltyping.png"
                          alt="Chibi girl typing on laptop"
                          fill
                          className="object-contain drop-shadow-lg"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badges around character */}
                <div className="grid grid-cols-3 gap-4">
                  {featuredBadges.slice(0, 3).map((badge) => (
                    <div key={badge.id} className="group relative">
                      <div className={`aspect-square rounded-2xl bg-gradient-to-br ${badge.color} p-1.5 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300`}>
                        <div className="w-full h-full rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-2xl">{badge.emoji}</span>
                        </div>
                      </div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-800 whitespace-nowrap shadow-lg">
                        {badge.name}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-400 animate-bounce shadow-lg" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-300 to-cyan-400 animate-bounce shadow-lg" style={{ animationDelay: '0.2s' }} />
                <div className="absolute top-1/3 -right-6 w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-green-300 to-emerald-400 animate-bounce shadow-lg" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      {/* How It Works Section */}
<section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
  <div className="text-center mb-12">
    <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${fredoka.className} text-purple-900`}>
      How It Works
    </h2>
    <p className={`text-lg ${inter.className} text-gray-600 max-w-2xl mx-auto`}>
      Start showcasing your achievements in just three simple steps
    </p>
  </div>
  
  <div className="grid md:grid-cols-3 gap-8 sm:gap-12 max-w-6xl mx-auto">
    {howItWorks.map((step, index) => (
      <div 
        key={step.number}
        className="group relative"
      >
        <div className="relative bg-white/90 backdrop-blur-sm rounded-[30px] p-6 sm:p-8 shadow-xl shadow-purple-100 hover:shadow-2xl hover:shadow-purple-200 transition-all duration-500 hover:-translate-y-2 h-full border border-white/50">
          <div className={`absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${step.accentColor} flex items-center justify-center text-white font-bold ${fredoka.className} shadow-lg`}>
            {step.number}
          </div>
          
          {/* Larger image container */}
          <div className="relative mb-8">
            <div className="relative w-full h-48 sm:h-56 md:h-64">
              <div className={`absolute inset-0 rounded-2xl ${step.bgColor} overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="relative w-full h-full">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain drop-shadow-lg scale-110 group-hover:scale-125 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-pink-300/50 to-purple-300/50 blur-sm" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-300/50 to-cyan-300/50 blur-sm" />
            </div>
            
            {/* Animated border around image */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/40 group-hover:scale-105 transition-all duration-500 pointer-events-none" />
          </div>
          
          <h3 className={`text-xl sm:text-2xl font-bold mb-4 text-center ${fredoka.className} text-purple-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${step.accentColor} transition-all duration-300`}>
            {step.title}
          </h3>
          <p className={`${inter.className} text-gray-600 text-center group-hover:text-gray-700 transition-colors duration-300`}>
            {step.description}
          </p>
          
          <div className={`absolute inset-0 rounded-[30px] border-2 border-transparent group-hover:border-gradient-to-r ${step.accentColor} group-hover:opacity-100 opacity-0 transition-all duration-500 pointer-events-none`} />
        </div>
        
        {/* Connecting lines between steps with animation */}
        {index < howItWorks.length - 1 && (
          <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-1 bg-gradient-to-r from-purple-300/50 to-pink-300/50 transform -translate-y-1/2 z-10 group-hover:from-purple-400 group-hover:to-pink-400 group-hover:w-16 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.2}s` }} />
          </div>
        )}
      </div>
    ))}
  </div>
</section>
      {/* Featured Badges Section */}
      <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h2 className={`text-3xl sm:text-4xl font-bold ${fredoka.className} text-purple-900`}>
              Featured Badges
            </h2>
            <p className={`${inter.className} text-gray-600 mt-2`}>
              Collect these exclusive badges and show off your skills
            </p>
          </div>
          <button className={`${nunito.className} font-semibold px-6 py-3 rounded-full border-2 border-purple-400 text-purple-700 hover:bg-purple-50 hover:border-purple-500 transition-all duration-300`}>
            View All Badges
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {featuredBadges.map((badge) => (
            <div 
              key={badge.id}
              className="group cursor-pointer"
              onMouseEnter={() => setActiveBadge(badge.id)}
              onMouseLeave={() => setActiveBadge(null)}
            >
              <div className="relative">
                <div className={`aspect-square rounded-full bg-gradient-to-br ${badge.color} p-1.5 shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300`}>
                  <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl">{badge.emoji}</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-white/50 transition-all duration-300" />
                
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${badge.color} blur-xl -z-10`} />
              </div>
              <div className="text-center mt-4">
                <p className={`font-semibold ${inter.className} text-purple-800 group-hover:text-pink-600 transition-colors`}>
                  {badge.name}
                </p>
                {activeBadge === badge.id && (
                  <p className="text-xs text-gray-600 mt-1 animate-fadeIn">
                    {badge.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="bg-gradient-to-r from-white/90 via-white/80 to-white/90 rounded-[40px] p-6 sm:p-8 md:p-12 shadow-xl shadow-purple-100/50 backdrop-blur-sm border border-white/50">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-pink-300/30 to-purple-300/30 blur-2xl" />
                  <div className="absolute -bottom-6 -right-6 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-blue-300/30 to-cyan-300/30 blur-2xl" />
                  
                  <div className="relative h-64 sm:h-72 md:h-80">
                    <Image
                      src="/assets/cbhibifoxtyping.png"
                      alt="Chibi fox typing on laptop"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                  
                  {/* Floating chat bubbles */}
                  <div className="absolute -top-2 left-4 sm:left-8 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
                    <p className="text-sm font-medium text-purple-800">Join us! 🎉</p>
                  </div>
                  <div className="absolute -bottom-4 right-4 sm:right-8 bg-gradient-to-r from-pink-400 to-purple-500 px-4 py-2 rounded-2xl shadow-lg">
                    <p className="text-sm font-medium text-white">Let&apos;s code! 💻</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <h2 className={`text-3xl sm:text-4xl font-bold ${fredoka.className}`}>
                <span className="text-transparent bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text">
                  Join the Community!
                </span>
              </h2>
              <p className={`text-lg ${inter.className} text-gray-700 max-w-xl`}>
                Connect with other badge collectors, share tips, get help, and stay updated on new features and exclusive badges.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className={`${inter.className} text-gray-700`}>Daily badge challenges and events</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className={`${inter.className} text-gray-700`}>Get help from experienced collectors</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className={`${inter.className} text-gray-700`}>Early access to new features</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button className={`${nunito.className} font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515a.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0a12.64 12.64 0 00-.617-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057a19.9 19.9 0 005.993 3.03a.078.078 0 00.084-.028a14.09 14.09 0 001.226-1.994a.076.076 0 00-.041-.106a13.107 13.107 0 01-1.872-.892a.077.077 0 01-.008-.128a10.2 10.2 0 00.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127a12.3 12.3 0 01-1.873.892a.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028a19.839 19.839 0 006.002-3.03a.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Join Discord
                </button>
                <button className={`${nunito.className} font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-gray-800 text-gray-800 flex items-center gap-3 hover:bg-gray-50 hover:border-gray-900 transition-all duration-300`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Star on GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 p-8 sm:p-12 text-center">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-pink-300/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-300/20 blur-3xl" />
          </div>
          
          <div className="relative mx-auto max-w-3xl">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center shadow-2xl">
                <span className="text-3xl text-white">🎉</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${fredoka.className} text-purple-900`}>
                Ready to Start Collecting?
              </h2>
              <p className={`text-lg ${inter.className} text-gray-700 max-w-2xl mx-auto`}>
                Join thousands of developers who are already showcasing their achievements with beautiful digital badges.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className={`${nunito.className} font-semibold px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white text-lg shadow-xl shadow-purple-300/50 hover:shadow-purple-300/80 hover:-translate-y-1 transition-all duration-300`}>
                Get Started Free
              </button>
              <button className={`${nunito.className} font-semibold px-8 py-4 rounded-full border-2 border-purple-400 text-purple-700 text-lg hover:bg-purple-50 transition-all duration-300`}>
                See Live Examples
              </button>
            </div>
            
            <p className={`text-sm ${inter.className} text-gray-500 mt-6`}>
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white pt-12 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">◎</span>
                </div>
                <h3 className={`text-2xl font-bold ${fredoka.className}`}>OS Pins</h3>
              </div>
              <p className={`${inter.className} text-purple-200`}>
                Showcase your achievements with beautiful, customizable badge collections
              </p>
              <div className="flex gap-3">
                {['github', 'discord', 'twitter', 'instagram'].map((social) => (
                  <div key={social} className="w-10 h-10 rounded-full border border-purple-300/30 flex items-center justify-center hover:bg-purple-700/50 hover:border-purple-300/50 transition-all duration-300 cursor-pointer hover:-translate-y-0.5">
                    <span className="text-lg">◎</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className={`text-lg font-bold mb-4 ${nunito.className}`}>Product</h4>
              <ul className={`space-y-2 ${inter.className} text-purple-200`}>
                {['Features', 'Badges', 'Pricing', 'API', 'Documentation'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-pink-300 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className={`text-lg font-bold mb-4 ${nunito.className}`}>Community</h4>
              <ul className={`space-y-2 ${inter.className} text-purple-200`}>
                {['Discord', 'GitHub', 'Twitter', 'Blog', 'Events'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-pink-300 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className={`text-lg font-bold mb-4 ${nunito.className}`}>Legal</h4>
              <ul className={`space-y-2 ${inter.className} text-purple-200`}>
                {[
                  { name: 'Privacy Policy', href: '/privacy-policy' },
                  { name: 'Terms of Service', href: '#' },
                  { name: 'Cookie Policy', href: '#' },
                  { name: 'Code of Conduct', href: 'code-of-conduct' },
                  { name: 'Contact', href: '/contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="hover:text-pink-300 transition-colors duration-300">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-purple-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className={`${inter.className} text-purple-300 text-center md:text-left`}>
                © 2024 OS Pins. Made with <span className="text-pink-300 animate-pulse">💜</span> by the community
              </p>
              <div className="flex gap-6">
                {[
                  { name: 'Terms', href: '#' },
                  { name: 'Privacy', href: '/privacy-policy' },
                  { name: 'Cookies', href: '#' }
                ].map((item) => (
                  <a key={item.name} href={item.href} className="text-purple-300 hover:text-pink-300 transition-colors duration-300">
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}