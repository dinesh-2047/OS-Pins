"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const sections = [
  {
    title: "1. What Are Cookies?",
    content: (
      <p>Cookies are small text files stored on your device by your browser when you visit websites. They help websites remember information about your visit, such as your preferences and settings.</p>
    ),
  },
  {
    title: "2. How We Use Cookies",
    content: (
      <ul className="list-disc ml-6">
        <li>To maintain your login session and authentication state.</li>
        <li>To remember your preferences and settings.</li>
        <li>To analyze usage and improve our services.</li>
        <li>To protect against abuse and ensure security.</li>
      </ul>
    ),
  },
  {
    title: "3. Types of Cookies We Use",
    content: (
      <ul className="list-disc ml-6">
        <li><b>Essential Cookies:</b> Required for the operation of OS Pins (e.g., authentication, session management).</li>
        <li><b>Analytics Cookies:</b> Help us understand how users interact with our platform.</li>
      </ul>
    ),
  },
  {
    title: "4. Managing Cookies",
    content: (
      <ul className="list-disc ml-6">
        <li>You can control or delete cookies through your browser settings.</li>
        <li>Disabling cookies may affect your experience and some features may not work properly.</li>
      </ul>
    ),
  },
  {
    title: "5. Third-Party Cookies",
    content: (
      <p>We do not use third-party advertising cookies. However, authentication providers (e.g., GitHub) may set their own cookies when you log in.</p>
    ),
  },
  {
    title: "6. Changes to This Policy",
    content: (
      <p>We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated revision date.</p>
    ),
  },
  {
    title: "7. Contact",
    content: (
      <p>If you have questions about our Cookie Policy, please contact us via the Contact page.</p>
    ),
  },
  {
    title: "8. Limitation of Liability",
    content: (
      <p>OS Pins and its contributors are not liable for any damages or losses arising from your use of cookies on the platform. Use cookies at your own risk.</p>
    ),
  },
];

export default function CookiePolicyPage() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    if (saved) setConsent(saved);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setConsent("rejected");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-slate-800 relative overflow-hidden">

      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-24 bg-gradient-to-r from-white/60 to-white/40 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-40 right-20 w-48 h-20 bg-gradient-to-r from-pink-100/60 to-white/40 rounded-full blur-xl animate-float-medium" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-1/4 w-56 h-20 bg-gradient-to-r from-blue-100/60 to-white/40 rounded-full blur-xl animate-float-fast" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 right-1/4 w-40 h-16 bg-gradient-to-r from-purple-100/60 to-white/40 rounded-full blur-xl animate-float-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
        <div className="absolute top-16 right-16 w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="absolute bottom-16 left-16 w-2 h-2 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-16 right-16 w-32 h-32 border-4 border-purple-200/50 rounded-full" />
        <div className="absolute bottom-20 left-20 w-24 h-24 border-4 border-pink-200/50 rounded-2xl rotate-12" />
        <div className="absolute top-40 left-10 w-20 h-20 border-4 border-blue-200/50 rounded-full" />
        <div className="absolute bottom-40 right-10 w-16 h-16 border-4 border-yellow-200/50 rounded-2xl -rotate-12" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20">

        <div className="mb-8">
          <Link href="/">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-purple-700 font-semibold shadow transition-all border border-purple-100 hover:border-purple-300 cursor-pointer">
              ← Back to Home
            </span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h1 className="text-5xl font-bold text-purple-700">
            Cookie Policy
          </h1>

          <p className="mt-4 text-gray-500 text-sm">
            Last updated: February 22, 2026
          </p>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 leading-relaxed">
            This Cookie Policy explains how OS Pins uses cookies and similar technologies to provide, improve, and secure our services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 rounded-3xl 
                         bg-white/70 backdrop-blur-xl 
                         border border-purple-100 
                         shadow-md 
                         transition-all duration-300 
                         hover:shadow-2xl hover:shadow-purple-300/40
                         hover:border-purple-300
                         cursor-pointer overflow-hidden"
            >
              {/* Gradient Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/0 via-purple-200/20 to-pink-200/30 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[4px] rounded-t-3xl 
                              bg-gradient-to-r from-purple-400 to-pink-400 
                              opacity-80 group-hover:opacity-100 
                              transition-all duration-300"></div>

              <div className="relative z-10">
                <h2 className="text-xl font-semibold text-purple-700 
                               group-hover:text-purple-800 
                               transition-colors duration-300 mb-4">
                  {section.title}
                </h2>

                <div className="text-gray-600 leading-relaxed text-[15px] 
                                group-hover:text-gray-700 transition-colors duration-300">
                  {section.content}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-20 text-sm text-gray-500 text-center">
          © 2024 OS Pins. All rights reserved.
        </footer>
      </div>

      {/* ✅ Professional Consent Bar */}
      <AnimatePresence>
        {!consent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-6 z-50"
          >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              
              <p className="text-sm text-gray-600 max-w-2xl">
                We use cookies to enhance your experience, analyze traffic,
                and improve our services. You can accept or reject optional cookies.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={handleReject}
                  className="px-6 py-2 rounded-xl border border-gray-400 text-gray-700 hover:bg-gray-100 transition font-medium"
                >
                  Reject
                </button>

                <button
                  onClick={handleAccept}
                  className="px-6 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition font-medium shadow-md"
                >
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}