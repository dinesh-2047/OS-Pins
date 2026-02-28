"use client";

import Link from "next/link";
import Image from "next/image";
import { Fredoka, Inter, Nunito } from 'next/font/google';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-fredoka' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-inter' });
const nunito = Nunito({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-nunito' });

export default function AuthLayout({ type }) {
  const isSignIn = type === "signin";

  return (
    <main className={`min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center bg-[#f0e7ff] ${inter.variable} ${fredoka.variable} ${nunito.variable} relative overflow-hidden px-4 py-12`}>
      
      {/* Background Decorative Elements (Clouds & Sparkles) */}
        <div className="fixed inset-0 pointer-events-none">
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

            {/* Decorative elements */}
            <div className="absolute top-12 -right-3 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-400 animate-bounce shadow-lg -z-10" />
            <div className="absolute bottom-8 -left-1 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-300 to-cyan-400 animate-bounce shadow-lg -z-10" style={{ animationDelay: '0.2s' }} />
            <div className="absolute top-1/4 -right-1 w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-green-300 to-emerald-400 animate-bounce shadow-lg -z-10" style={{ animationDelay: '0.4s' }} />
        </div>

      {/* Main Container */}
      <div className="relative w-full max-w-[450px] z-10">
        
        {/* The "Paper" Style Glass Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[50px] p-8 sm:p-10 border-[6px] border-white shadow-[0_20px_50px_rgba(150,100,255,0.2)] text-center flex flex-col items-center">
          
          {/* Header Image/Logo */}
          <div className="mb-6">
             <h1 className={`${fredoka.className} text-5xl font-bold tracking-tight text-[#5b4a9b] drop-shadow-[0_4px_0_rgba(255,255,255,1)]`}>
                OS Pins
             </h1>
          </div>

          {/* Welcome Text */}
          <h2 className={`${fredoka.className} text-2xl text-[#6d5bae] mb-2`}>
            {isSignIn ? "Welcome Back!" : "Create Your Account!"}
          </h2>
          <p className={`${inter.className} text-[#8b7dbd] text-sm mb-10 px-4`}>
            {isSignIn 
              ? "Sign in to collect and showcase your digital badges!" 
              : "Sign up to start collecting & earning digital badges!"}
          </p>

          {/* Glossy GitHub Button */}
          <button className={`group relative w-full overflow-hidden rounded-full p-[3px] bg-gradient-to-b from-[#9d8df1] to-[#6d5bae] shadow-[0_6px_0_#4a3b8a] active:shadow-none active:translate-y-[4px] transition-all duration-100 mb-12`}>
            <div className="bg-gradient-to-b from-[#b3a4ff] to-[#806df2] rounded-full py-3 px-6 flex items-center justify-center gap-3 border-t-2 border-white/40">
              <div className="bg-white p-1 rounded-full">
                <svg className="w-5 h-5 text-[#6d5bae]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className={`${nunito.className} text-white font-bold text-lg drop-shadow-md`}>
                {isSignIn ? "Sign in with GitHub" : "Sign up with GitHub"}
              </span>
            </div>
            {/* Gloss Highlight */}
            <div className="absolute top-1 left-4 right-4 h-[10px] bg-white/20 rounded-full" />
          </button>

          {/* Secondary Action Area */}
          <div className="w-full space-y-4">
             <h3 className={`${fredoka.className} text-xl text-[#6d5bae]`}>
                {isSignIn ? "New here?" : "Already have an account?"}
             </h3>
             <Link 
                href={isSignIn ? "/signup" : "/signin"}
                className={`block w-full rounded-full py-3 px-6 border-4 border-[#d8c7ff] text-[#8b7dbd] ${nunito.className} font-bold hover:bg-[#f3efff] hover:border-[#bba2ff] transition-all text-center`}
             >
                {isSignIn ? "Create an account!" : "Log in!"}
             </Link>
          </div>
        </div>

      </div>
    </main>
  );
}