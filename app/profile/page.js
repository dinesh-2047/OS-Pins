"use client";

import Image from "next/image";
import { Fredoka, Inter, Nunito } from 'next/font/google';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-fredoka' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-inter' });
const nunito = Nunito({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-nunito' });

const userBadges = [
  { id: 1, name: "Open Source Contributor", emoji: "🦊", color: "from-orange-300 to-pink-400", size: "normal" },
  { id: 2, name: "Bug Hunter", emoji: "🔍", color: "from-blue-300 to-purple-400", size: "normal" },
  { id: 3, name: "Hackathon Winner", emoji: "🏆", color: "from-yellow-300 to-orange-400", size: "large" },
  { id: 4, name: "Code Explorer", emoji: "✨", color: "from-purple-300 to-indigo-400", size: "normal" },
];

export default function ProfilePage() {
    
  return (
    <main className={`min-h-screen bg-[#fff0f3] p-4 md:p-8 ${inter.variable} ${fredoka.variable} ${nunito.variable} relative overflow-hidden`}>
      
      {/* --- FLOATING ORBS BACKGROUND --- */}
      {/* Changed z-index and ensure visibility */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="ball"></span>
        ))}
      </div>

      <style jsx>{`
        @keyframes move {
          100% {
            transform: translate3d(0, 0, 1px) rotate(360deg);
          }
        }

        .ball {
          position: absolute;
          width: 25vmin;
          height: 25vmin;
          border-radius: 50%;
          backface-visibility: hidden;
          animation: move linear infinite;
          opacity: 0.6; /* Increased opacity to make them visible */
        }

        /* Using slightly more saturated pastels to ensure they show up on pink */
        .ball:nth-child(odd) { color: #bca7ff; }
        .ball:nth-child(even) { color: #ff9fb2; }

        .ball:nth-child(1) { top: 77%; left: 88%; animation-duration: 40s; animation-delay: -3s; transform-origin: 16vw -2vh; box-shadow: 40vmin 0 10vmin currentColor; }
        .ball:nth-child(2) { top: 42%; left: 2%; animation-duration: 53s; animation-delay: -29s; transform-origin: -19vw 21vh; box-shadow: -40vmin 0 10vmin currentColor; }
        .ball:nth-child(3) { top: 28%; left: 18%; animation-duration: 49s; animation-delay: -8s; transform-origin: -22vw 3vh; box-shadow: 40vmin 0 10vmin currentColor; }
        .ball:nth-child(4) { top: 50%; left: 79%; animation-duration: 26s; animation-delay: -21s; transform-origin: -17vw -6vh; box-shadow: 40vmin 0 10vmin currentColor; }
        .ball:nth-child(5) { top: 46%; left: 15%; animation-duration: 36s; animation-delay: -40s; transform-origin: 4vw 0vh; box-shadow: -40vmin 0 10vmin currentColor; }
        .ball:nth-child(6) { top: 77%; left: 16%; animation-duration: 31s; animation-delay: -10s; transform-origin: 18vw 4vh; box-shadow: 40vmin 0 10vmin currentColor; }
        .ball:nth-child(7) { top: 22%; left: 17%; animation-duration: 55s; animation-delay: -6s; transform-origin: 1vw -23vh; box-shadow: -40vmin 0 10vmin currentColor; }
        .ball:nth-child(8) { top: 41%; left: 47%; animation-duration: 43s; animation-delay: -28s; transform-origin: 25vw -3vh; box-shadow: 40vmin 0 10vmin currentColor; }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* --- PROFILE HEADER SECTION --- */}
        {/* Changed bg-[#e7e7e7] to bg-white/60 with glass effect */}
        <section className="bg-white/60 backdrop-blur-xl rounded-[40px] p-6 md:p-10 border-[6px] border-white shadow-xl flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[8px] border-white overflow-hidden shadow-lg bg-gradient-to-br from-blue-200 to-purple-300">
              <Image src="/assets/avatar-placeholder.png" alt="Avatar" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-xl shadow-md">⭐</div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className={`${fredoka.className} text-4xl text-[#5b4a9b]`}>Rahul Arora</h1>
              <p className={`${inter.className} text-[#8b7dbd] text-lg font-medium`}>@rahularora8601</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="bg-white/80 px-4 py-2 rounded-full border-2 border-white shadow-sm">
                <span className={`${nunito.className} text-[#6d5bae] font-bold`}>24 Badges</span>
              </div>
              <div className="bg-indigo-500 px-4 py-2 rounded-full border-2 border-white shadow-sm text-white">
                <span className={`${nunito.className} font-bold`}>0 OT Discord</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <button className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-2 rounded-full font-bold shadow-[0_4px_0_#9d468b] active:translate-y-1 active:shadow-none transition-all">
                ✨ Edit Profile
              </button>
              <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-6 py-2 rounded-full font-bold shadow-[0_4px_0_#3b4ea0] active:translate-y-1 active:shadow-none transition-all">
                🖇️ Embed Link
              </button>
            </div>
          </div>
        </section>

        {/* --- BADGE DASHBOARD SECTION --- */}
        {/* Changed bg-[#e7e7e7] to bg-white/40 with glass effect */}
        <section className="bg-white/40 backdrop-blur-md rounded-[50px] p-1 border-[4px] border-white/80 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-200/80 to-indigo-200/80 px-8 py-4 flex justify-between items-center border-b-4 border-white">
            <h2 className={`${fredoka.className} text-2xl text-[#5b4a9b] flex items-center gap-2`}>
              ⭐ Badge Dashboard
            </h2>
            <button className="w-10 h-10 bg-white rounded-full text-indigo-500 text-2xl font-bold shadow-sm hover:scale-110 transition-transform">+</button>
          </div>

          <div className="p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {userBadges.map((badge) => (
              <div 
                key={badge.id}
                className={`relative group cursor-grab active:cursor-grabbing transform transition-all hover:scale-105 ${badge.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <div className={`aspect-square bg-gradient-to-br ${badge.color} rounded-3xl border-4 border-white shadow-lg p-1 overflow-hidden relative`}>
                  <div className="w-full h-full bg-white/20 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/30">
                    <span className="text-5xl md:text-7xl drop-shadow-md">{badge.emoji}</span>
                    <p className={`${nunito.className} text-white font-black text-center text-xs md:text-sm px-2 drop-shadow-lg leading-tight`}>
                      {badge.name.toUpperCase()}
                    </p>
                  </div>

                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 bg-red-400 border-2 border-white rounded-full text-white text-xs flex items-center justify-center">🗑️</button>
                    <button className="w-8 h-8 bg-blue-400 border-2 border-white rounded-full text-white text-xs flex items-center justify-center">✏️</button>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-dashed border-purple-300/50 rounded-3xl -z-10 translate-x-1 translate-y-1" />
              </div>
            ))}
          </div>

          <div className="bg-white/60 p-6 border-t-4 border-white flex flex-wrap justify-center gap-4">
            <button className="bg-blue-100 text-blue-600 px-6 py-2 rounded-full border-2 border-blue-200 font-bold hover:bg-blue-200">+ Add Badge</button>
            <button className="bg-purple-100 text-purple-600 px-6 py-2 rounded-full border-2 border-purple-200 font-bold hover:bg-purple-200">📐 Resize</button>
            <button className="bg-pink-100 text-pink-600 px-6 py-2 rounded-full border-2 border-pink-200 font-bold hover:bg-pink-200">❌ Remove</button>
          </div>
        </section>
      </div>
    </main>
  );
}