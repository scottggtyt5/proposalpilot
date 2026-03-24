'use client';

const features = [
  {
    icon: '⚡',
    title: '30 Seconds',
    description: 'Generate complete proposals in under a minute. No waiting, no delays.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered',
    description: 'Uses advanced AI to understand context and generate personalized proposals automatically.',
  },
  {
    icon: '📝',
    title: 'Smart Templates',
    description: 'Customizable professional templates that adapt to your industry and style.',
  },
  {
    icon: '🎯',
    title: 'Meeting Notes to Proposal',
    description: 'Just paste your meeting notes and we handle the rest. That simple.',
  },
  {
    icon: '💼',
    title: 'Professional Quality',
    description: 'Beautifully formatted proposals that impress clients every single time.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your data is encrypted and never shared. Built with enterprise security in mind.',
  },
];

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div
          key={feature.title}
          className="card-dark p-8 rounded-lg animate-slide-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="text-5xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
