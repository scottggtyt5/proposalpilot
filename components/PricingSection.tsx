'use client';

import { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: [
      '5 proposals per month',
      'Basic templates',
      'Email support',
      'Standard formatting',
    ],
    cta: 'Start Free',
    ctaLink: '/generate',
    highlight: false,
    planId: null,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For growing teams',
    features: [
      'Unlimited proposals',
      'All templates',
      'Priority email support',
      'Custom branding',
      'Analytics dashboard',
      'Team collaboration',
    ],
    cta: 'Try Pro',
    ctaLink: null,
    highlight: true,
    planId: 'pro' as const,
  },
  {
    name: 'Agency',
    price: '$199',
    period: '/month',
    description: 'For agencies and enterprises',
    features: [
      'Everything in Pro',
      '24/7 phone support',
      'Custom integrations',
      'White-label options',
      'Advanced analytics',
      'Dedicated account manager',
      'Custom SLAs',
    ],
    cta: 'Try Agency',
    ctaLink: null,
    highlight: false,
    planId: 'agency' as const,
  },
];

export function PricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const handleCheckout = async (planId: string) => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoadingPlan(planId);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Checkout failed');
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg p-8 transition transform hover:scale-105 ${
              plan.highlight
                ? 'card-dark ring-2 ring-primary glow-primary'
                : 'card-dark'
            }`}
          >
            {plan.highlight && (
              <div className="inline-block mb-4 px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

            <div className="mb-6">
              <span className="text-5xl font-bold text-primary">{plan.price}</span>
              {plan.period && <span className="text-gray-400 ml-2">{plan.period}</span>}
            </div>

            {plan.ctaLink ? (
              <Link
                href={plan.ctaLink}
                className={`block w-full py-3 rounded-lg font-bold text-center mb-8 transition ${
                  plan.highlight
                    ? 'bg-primary hover:bg-primary-dark text-dark-bg'
                    : 'border border-primary/50 text-primary hover:bg-primary/10'
                }`}
              >
                {plan.cta}
              </Link>
            ) : (
              <button
                onClick={() => {
                  setShowEmailModal(plan.planId);
                  setError(null);
                  setEmail('');
                }}
                disabled={loadingPlan === plan.planId}
                className={`block w-full py-3 rounded-lg font-bold text-center mb-8 transition ${
                  plan.highlight
                    ? 'bg-primary hover:bg-primary-dark text-dark-bg'
                    : 'border border-primary/50 text-primary hover:bg-primary/10'
                } ${loadingPlan === plan.planId ? 'opacity-50 cursor-wait' : ''}`}
              >
                {loadingPlan === plan.planId ? 'Loading...' : plan.cta}
              </button>
            )}

            <div className="space-y-4">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <span className="text-accent mt-1">â</span>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Email Modal for Checkout */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-dark-card border border-dark-border rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-2">
              Upgrade to {showEmailModal === 'pro' ? 'Pro' : 'Agency'}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Enter your email to proceed to secure checkout via Stripe.
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none mb-4"
            />

            {error && (
              <p className="text-red-400 text-sm mb-4">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => handleCheckout(showEmailModal)}
                disabled={loadingPlan !== null}
                className="flex-1 py-3 bg-primary hover:bg-primary-dark text-dark-bg font-bold rounded-lg transition disabled:opacity-50"
              >
                {loadingPlan ? 'Redirecting...' : 'Continue to Checkout'}
              </button>
              <button
                onClick={() => {
                  setShowEmailModal(null);
                  setError(null);
                }}
                className="px-6 py-3 border border-dark-border text-gray-400 hover:text-white rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
