"use client";
import React, { useState } from "react";

export default function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setShowSuccess(false), 3500);
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-fuchsia-100 py-16 px-6 relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating clouds */}
        <div className="absolute top-20 left-10 w-64 h-24 bg-gradient-to-r from-white/60 to-white/40 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-40 right-20 w-48 h-20 bg-gradient-to-r from-fuchsia-100/60 to-white/40 rounded-full blur-xl animate-float-medium" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-1/4 w-56 h-20 bg-gradient-to-r from-indigo-100/60 to-white/40 rounded-full blur-xl animate-float-fast" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 right-1/4 w-40 h-16 bg-gradient-to-r from-indigo-100/60 to-white/40 rounded-full blur-xl animate-float-slow" style={{ animationDelay: '1.5s' }} />
        {/* Sparkles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-fuchsia-300 rounded-full animate-ping" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
        <div className="absolute top-16 right-16 w-2 h-2 bg-fuchsia-300 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="absolute bottom-16 left-16 w-2 h-2 bg-indigo-300 rounded-full animate-ping" style={{ animationDelay: '0.8s' }} />
        {/* Badge silhouettes */}
        <div className="absolute top-16 right-16 w-32 h-32 border-4 border-fuchsia-200/50 rounded-full" />
        <div className="absolute bottom-20 left-20 w-24 h-24 border-4 border-indigo-200/50 rounded-2xl rotate-12" />
        <div className="absolute top-40 left-10 w-20 h-20 border-4 border-fuchsia-200/50 rounded-full" />
        <div className="absolute bottom-40 right-10 w-16 h-16 border-4 border-indigo-200/50 rounded-2xl -rotate-12" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Back Button */}
        <div className="mb-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full 
            bg-gradient-to-r from-indigo-600 to-fuchsia-600 
            text-white font-semibold shadow-lg
            hover:shadow-2xl hover:scale-105 
            hover:from-fuchsia-600 hover:to-indigo-600
            transition-all duration-300"
          >
                ← Back
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about OS Pins? Want to contribute or collaborate?
            We'd love to hear from you.
          </p>
        </div>

        {/* Glass Card Container */}
        <div className="grid md:grid-cols-2 gap-12 
          bg-white/70 backdrop-blur-xl 
          rounded-3xl shadow-2xl p-12 
          border border-white/40
          hover:shadow-[0_20px_60px_rgba(79,70,229,0.25)]
          transition-all duration-500">

          {/* LEFT SIDE */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-indigo-700">
              Project Information
            </h2>

            <div className="space-y-6 text-gray-700">

              <div className="p-5 rounded-2xl bg-white shadow-md 
                hover:shadow-xl hover:-translate-y-2 
                transition-all duration-300 cursor-pointer">
                <p className="font-semibold text-gray-900">
                  Project Repository
                </p>
                <a
                  href="https://github.com/your-org/os-pins"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-fuchsia-600 transition-colors"
                >
                  GitHub - OS Pins
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-white shadow-md 
                hover:shadow-xl hover:-translate-y-2 
                transition-all duration-300 cursor-pointer">
                <p className="font-semibold text-gray-900">Community</p>
                <a
                  href="https://discord.gg/your-invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-fuchsia-600 transition-colors"
                >
                  Join our Discord
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-white shadow-md 
                hover:shadow-xl hover:-translate-y-2 
                transition-all duration-300 cursor-pointer">
                <p className="font-semibold text-gray-900">Email</p>
                <a
                  href="mailto:contact@ospins.dev"
                  className="text-indigo-600 hover:text-fuchsia-600 transition-colors"
                >
                  contact@ospins.dev
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-white shadow-md 
                hover:shadow-xl hover:-translate-y-2 
                transition-all duration-300 cursor-pointer">
                <p className="font-semibold text-gray-900">Documentation</p>
                <a
                  href="/docs/authentication"
                  className="text-indigo-600 hover:text-fuchsia-600 transition-colors"
                >
                  Authentication Docs
                </a>
              </div>

            </div>

            <div className="text-sm text-gray-500 pt-6">
              Made with 💜 by the OS Pins community.
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-700 mb-8">
              Send us a Message
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Success Popup */}
            {showSuccess && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 max-w-xs w-full text-center border-2 border-fuchsia-200 animate-fadeIn">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="font-bold text-indigo-700 text-lg mb-1">Success!</div>
                  <div className="text-gray-700 mb-2">Our team will contact you as soon as possible.</div>
                  <button onClick={() => setShowSuccess(false)} className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-semibold shadow hover:from-indigo-500 hover:to-fuchsia-500 transition-all">Close</button>
                </div>
              </div>
            )}

              {/* Input Fields */}
              <div className="mb-6">
                <label className="block mb-2 text-base font-semibold text-indigo-700 tracking-wide">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-5 py-3 rounded-xl 
                  bg-gradient-to-br from-white via-indigo-50 to-fuchsia-50
                  border border-indigo-200 focus:border-fuchsia-400
                  text-gray-900 placeholder-gray-400
                  focus:ring-2 focus:ring-fuchsia-300 
                  hover:border-fuchsia-300
                  shadow-md focus:shadow-lg hover:shadow-lg
                  transition-all duration-300 outline-none font-medium"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-base font-semibold text-indigo-700 tracking-wide">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-5 py-3 rounded-xl 
                  bg-gradient-to-br from-white via-indigo-50 to-fuchsia-50
                  border border-indigo-200 focus:border-fuchsia-400
                  text-gray-900 placeholder-gray-400
                  focus:ring-2 focus:ring-fuchsia-300 
                  hover:border-fuchsia-300
                  shadow-md focus:shadow-lg hover:shadow-lg
                  transition-all duration-300 outline-none font-medium"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-base font-semibold text-indigo-700 tracking-wide">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Enter your subject"
                  className="w-full px-5 py-3 rounded-xl 
                  bg-gradient-to-br from-white via-indigo-50 to-fuchsia-50
                  border border-indigo-200 focus:border-fuchsia-400
                  text-gray-900 placeholder-gray-400
                  focus:ring-2 focus:ring-fuchsia-300 
                  hover:border-fuchsia-300
                  shadow-md focus:shadow-lg hover:shadow-lg
                  transition-all duration-300 outline-none font-medium"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 text-base font-semibold text-indigo-700 tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full px-5 py-3 rounded-xl 
                  bg-gradient-to-br from-white via-indigo-50 to-fuchsia-50
                  border border-indigo-200 focus:border-fuchsia-400
                  text-gray-900 placeholder-gray-400
                  focus:ring-2 focus:ring-fuchsia-300 
                  hover:border-fuchsia-300
                  shadow-md focus:shadow-lg hover:shadow-lg
                  transition-all duration-300 outline-none resize-none font-medium"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl 
                bg-gradient-to-r from-indigo-600 to-fuchsia-600 
                text-white font-bold text-lg tracking-wide
                shadow-xl hover:shadow-2xl 
                hover:scale-105 
                hover:from-fuchsia-600 hover:to-indigo-600
                transition-all duration-300 border-none focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
              >
                Send Message <span aria-hidden="true">🚀</span>
              </button>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
    