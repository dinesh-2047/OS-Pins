"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <ul className="space-y-2 list-disc pl-6 marker:text-purple-500">
        <li>Authentication data from third-party providers (e.g., GitHub).</li>
        <li>Basic user profile information (username, email, avatar).</li>
        <li>Session data to maintain login state.</li>
        <li>Usage data (API requests) for analytics and rate limiting.</li>
      </ul>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <ul className="space-y-2 list-disc pl-6 marker:text-purple-500">
        <li>Authenticate and authorize users.</li>
        <li>Provide and improve our services.</li>
        <li>Ensure security and prevent abuse.</li>
        <li>Communicate important updates.</li>
      </ul>
    ),
  },
  {
    title: "3. Data Sharing and Disclosure",
    content: (
      <ul className="space-y-2 list-disc pl-6 marker:text-purple-500">
        <li>We do not sell your personal data.</li>
        <li>Data may be shared when legally required.</li>
        <li>Anonymized aggregated data may be used for analytics.</li>
      </ul>
    ),
  },
  {
    title: "4. Data Security",
    content: (
      <p>
        We implement industry-standard security measures to protect your data.
        However, no system is completely secure.
      </p>
    ),
  },
  {
    title: "5. Your Rights",
    content: (
      <ul className="space-y-2 list-disc pl-6 marker:text-purple-500">
        <li>You may request access or deletion of your data.</li>
        <li>You may revoke third-party authentication anytime.</li>
      </ul>
    ),
  },
  {
    title: "6. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy periodically. Changes will be posted
        here with an updated revision date.
      </p>
    ),
  },
  {
    title: "7. Cookies and Tracking Technologies",
    content: (
      <ul className="space-y-2 list-disc pl-6 marker:text-purple-500">
        <li>We may use cookies to enhance your experience.</li>
        <li>You can control cookies through browser settings.</li>
        <li>Disabling cookies may affect some features.</li>
      </ul>
    ),
  },
  {
    title: "8. Contact Us",
    content: (
      <p>
        If you have any questions, please contact us via the Contact page.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-slate-800 relative overflow-hidden">

      {/* Home page background decorative elements */}
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

      <div className="relative max-w-6xl mx-auto px-6 py-20">

        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-purple-700 font-semibold shadow transition-all border border-purple-100 hover:border-purple-300 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Back to Home
            </span>
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h1 className="text-5xl font-bold text-purple-700">
            Privacy Policy
          </h1>

          <p className="mt-4 text-gray-500 text-sm">
            Last updated: February 21, 2026
          </p>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 leading-relaxed">
            OS-Pins is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, and safeguard your information.
          </p>
        </motion.div>

        {/* Cards Grid */}
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

              {/* Content */}
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

      </div>
    </main>
  );
}