import React from 'react';
import { Check, X, Zap, Shield, Code, Rocket, ArrowRight, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#00FF94] selection:text-black">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 overflow-hidden bg-[#050505]">
        {/* Subtle Grid Pattern Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto text-center space-y-8">
          
          {/* Lighthouse Score Visual */}
          <div className="relative group mb-4">
            <div className="absolute inset-0 bg-[#00FF94] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-[#00FF94] flex flex-col items-center justify-center bg-slate-950 shadow-[0_0_30px_rgba(0,255,148,0.3)] animate-in fade-in zoom-in duration-700">
              <span className="text-4xl md:text-5xl font-black text-[#00FF94] tracking-tighter">100</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 mt-1">Performance</span>
            </div>
            {/* Pulse Ring */}
            <div className="absolute inset-0 rounded-full border border-[#00FF94] animate-ping opacity-20"></div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Stop Losing Customers to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Loading Screens.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
            The Fastest Websites in Lucknow. Custom Next.js Architecture. <br className="hidden md:block"/>
            No WordPress. <span className="text-[#00FF94] font-medium">100/100 Performance.</span>
          </p>

          <div className="pt-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-black transition-all transform bg-[#00FF94] rounded-full hover:bg-[#00cc76] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,255,148,0.4)]"
            >
              Get Your Speed Audit
              <Zap className="w-5 h-5 fill-black" />
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-gray-50 text-slate-900">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Seconds Matter.</h2>
          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
            <span className="text-red-600 font-bold">53% of users</span> leave if your site takes &gt;3 seconds to load.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Most local agencies build slow WordPress sites bloated with plugins. 
            We don't build "sites" — we build <span className="font-bold text-slate-900">instant digital assets</span> engineered for conversion.
          </p>
        </div>
      </section>

      {/* Comparison Grid (Bento Style) */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Kinstel Difference</h2>
            <p className="text-gray-400">Why we are miles ahead of the competition.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Typical Agency Card */}
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
              <h3 className="text-2xl font-bold text-gray-300 mb-8 flex items-center gap-3">
                <LayoutTemplate className="w-6 h-6 text-red-500" />
                Typical Agency
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                  <div className="p-2 bg-red-500/10 rounded-lg shrink-0">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400">3s+ Load Time</h4>
                    <p className="text-sm text-gray-500 mt-1">Loses half your traffic instantly.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                  <div className="p-2 bg-red-500/10 rounded-lg shrink-0">
                    <LayoutTemplate className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400">WordPress Templates</h4>
                    <p className="text-sm text-gray-500 mt-1">Generic, bloated, and hard to customize.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                  <div className="p-2 bg-red-500/10 rounded-lg shrink-0">
                    <Shield className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400">Vulnerable Plugins</h4>
                    <p className="text-sm text-gray-500 mt-1">Constant security updates required.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kinstel Card */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-[#00FF94]/30 relative overflow-hidden shadow-[0_0_40px_rgba(0,255,148,0.05)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#00FF94]"></div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-[#00FF94] fill-[#00FF94]" />
                Kinstel
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#00FF94]/5 border border-[#00FF94]/20">
                  <div className="p-2 bg-[#00FF94]/10 rounded-lg shrink-0">
                    <Rocket className="w-6 h-6 text-[#00FF94]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#00FF94]">Instant ({'<'}0.5s)</h4>
                    <p className="text-sm text-gray-400 mt-1">Near-zero latency for maximum retention.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#00FF94]/5 border border-[#00FF94]/20">
                  <div className="p-2 bg-[#00FF94]/10 rounded-lg shrink-0">
                    <Code className="w-6 h-6 text-[#00FF94]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#00FF94]">Next.js / React Architecture</h4>
                    <p className="text-sm text-gray-400 mt-1">Enterprise-grade tech stack.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#00FF94]/5 border border-[#00FF94]/20">
                  <div className="p-2 bg-[#00FF94]/10 rounded-lg shrink-0">
                    <Shield className="w-6 h-6 text-[#00FF94]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#00FF94]">Unbreakable Static Build</h4>
                    <p className="text-sm text-gray-400 mt-1">Zero database vulnerabilities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Tech Stack */}
      <section className="py-20 border-t border-slate-900 bg-[#050505]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-10 text-sm tracking-widest uppercase">Hand-coded for Architects, Lawyers, and High-End Businesses</p>
          
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple Text/Icon representations for tech stack */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-white transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <span className="font-mono text-sm text-gray-500">Next.js</span>
            </div>
            
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-[#38bdf8] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#38bdf8]"><path d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.667-1.988 5-1.988 2.333 0 4 .663 5 1.988-.667-2.651-2.333-3.976-5-3.976zM5 12c0 2.65 1.333 4.313 4 5-1.333-1-2-2.65-2-5zm14 0c0 2.35-1.667 4-5 5 1.333-1.65 2-3.313 2-5zM8.5 12c0-2.35 1.667-4 5-4 3.333 0 5 1.65 5 4 0 2.35-1.667 4-5 4-3.333 0-5-1.65-5-4z"/></svg>
              </div>
              <span className="font-mono text-sm text-gray-500">Tailwind</span>
            </div>

            <div className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-[#61dafb] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-[#61dafb]"><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" /></svg>
              </div>
              <span className="font-mono text-sm text-gray-500">React</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-4 bg-[#00FF94] text-black text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Ready to Upgrade?</h2>
          <div className="flex flex-col items-center gap-6">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-10 py-5 text-xl font-bold bg-black text-white rounded-full hover:bg-gray-900 hover:scale-105 transition-all shadow-xl"
            >
              Book a Strategy Call
              <ArrowRight className="w-6 h-6" />
            </Link>
            <div className="flex flex-col items-center space-y-1 mt-4">
              <span className="font-bold uppercase tracking-widest text-sm opacity-80">Kinstel Web Agency</span>
              <span className="text-sm font-medium opacity-70">Lucknow Based. Family Owned.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
