"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "1. Purpose",
    content: (
      <p>This Code of Conduct outlines the values, ethical standards, and expected behaviors for all participants in the OS Pins community, including users, contributors, and maintainers.</p>
    ),
  },
  {
    title: "2. Our Values",
    content: (
      <ul className="list-disc ml-6">
        <li>Respect and inclusion for all individuals.</li>
        <li>Openness, collaboration, and transparency.</li>
        <li>Commitment to learning and improvement.</li>
      </ul>
    ),
  },
  {
    title: "3. Expected Behaviors",
    content: (
      <ul className="list-disc ml-6">
        <li>Be respectful, considerate, and constructive in all interactions.</li>
        <li>Use inclusive language and be welcoming to diverse perspectives.</li>
        <li>Give and gracefully accept constructive feedback.</li>
        <li>Respect privacy and confidentiality.</li>
      </ul>
    ),
  },
  {
    title: "4. Unacceptable Behaviors",
    content: (
      <ul className="list-disc ml-6">
        <li>Harassment, discrimination, or exclusion of any kind.</li>
        <li>Offensive, abusive, or inappropriate language or imagery.</li>
        <li>Personal attacks or threats.</li>
        <li>Disruption of discussions or collaboration.</li>
      </ul>
    ),
  },
  {
    title: "5. Reporting and Enforcement",
    content: (
      <ul className="list-disc ml-6">
        <li>If you experience or witness unacceptable behavior, please report it via the Contact page or to the project maintainers.</li>
        <li>All reports will be reviewed and investigated promptly and fairly.</li>
        <li>Consequences for violations may include warnings, removal from the community, or other actions as appropriate.</li>
      </ul>
    ),
  },
  {
    title: "6. Scope",
    content: (
      <p>This Code of Conduct applies to all OS Pins spaces, including the website, repositories, communication channels, and events.</p>
    ),
  },
  {
    title: "7. Acknowledgement",
    content: (
      <p>By participating in OS Pins, you agree to uphold this Code of Conduct and contribute to a positive, inclusive community.</p>
    ),
  },
  {
    title: "8. Limitation of Liability",
    content: (
      <p>OS Pins and its contributors are not liable for any damages or losses arising from violations of this Code of Conduct or participation in the community. Participation is at your own risk.</p>
    ),
  },
];

export default function CodeOfConductPage() {
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
            Code of Conduct
          </h1>

          <p className="mt-4 text-gray-500 text-sm">
            Last updated: February 22, 2026
          </p>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 leading-relaxed">
            OS Pins is committed to fostering a welcoming, inclusive, and respectful environment for everyone.
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

        <footer className="mt-20 text-sm text-gray-500 text-center">© 2024 OS Pins. All rights reserved.</footer>
      </div>
    </main>
  );
}
