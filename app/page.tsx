'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageTimer } from '@/components/PageTimer';
import { RaceTrackAnimation } from '@/components/RaceTrackAnimation';
import { FeatureGrid } from '@/components/FeatureGrid';
import { PricingSection } from '@/components/PricingSection';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-dark-border bg-dark-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">ProposalPilot</div>
          <div className="flex gap-6 items-center">
            <Link href="/generate" className="text-sm hover:text-primary transition">
              Try Now
            </Link>
            <a href="#pricing" className="text-sm hover:text-primary transition">
              Pricing
            </a>
            <a href="#features" className="text-sm hover:text-primary transition">
              Features
            </a>
          </div>
        </div>
      </nav>

      {/* Page Timer */}
      {isClient && <PageTimer />}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-primary/10 border border-primary/50 rounded-full text-primary text-sm font-semibold">
          ⚡ Generate in 47 Seconds
        </div>

        <h1 className="text-6xl font-bold mb-6 animate-slide-in">
          Professional Proposals in <span className="gradient-text">47 Seconds</span>
        </h1>

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate-slide-in">
          Stop wasting hours on proposal writing. Transform your meeting notes into stunning client proposals with AI. Speed is our superpower.
        </p>

        <div className="flex gap-4 justify-center mb-16 animate-slide-in">
          <Link
            href="/generate"
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-dark-bg font-bold rounded-lg glow-primary transition transform hover:scale-105"
          >
            Generate Your First Proposal
          </Link>
          <a
            href="#features"
            className="px-8 py-4 border border-primary text-primary hover:bg-primary/10 font-bold rounded-lg transition"
          >
            Learn More
          </a>
        </div>

        {/* Speed Metric */}
        <div className="inline-flex gap-12 text-center mb-12">
          <div>
            <div className="text-4xl font-bold text-primary">47s</div>
            <div className="text-sm text-gray-400">Average Generation Time</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent">99%</div>
            <div className="text-sm text-gray-400">Faster Than Manual</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">10x</div>
            <div className="text-sm text-gray-400">Productivity Boost</div>
          </div>
        </div>
      </section>

      {/* Race Track Animation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          How Fast Are We? <span className="gradient-text">Really Fast.</span>
        </h2>
        {isClient && <RaceTrackAnimation />}
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Teams Choose <span className="gradient-text">ProposalPilot</span>
        </h2>
        <FeatureGrid />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          Simple, Transparent <span className="gradient-text">Pricing</span>
        </h2>
        <PricingSection />
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/50 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-6">Ready to Save Hours?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your first 5 proposals are free. No credit card required. Start generating in 47 seconds.
          </p>
          <Link
            href="/generate"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-dark-bg font-bold rounded-lg glow-primary transition transform hover:scale-105"
          >
            Generate Your Free Proposal Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-border py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2024 ProposalPilot. Built for speed. Optimized for results.</p>
        </div>
      </footer>
    </div>
  );
}
