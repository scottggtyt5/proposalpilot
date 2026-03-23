'use client';

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
    ctaLink: '#checkout-pro',
    highlight: true,
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
    cta: 'Talk to Sales',
    ctaLink: '#checkout-agency',
    highlight: false,
  },
];

export function PricingSection() {
  return (
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

          <div className="space-y-4">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <span className="text-accent mt-1">✓</span>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
