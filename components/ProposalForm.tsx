'use client';

import { useState } from 'react';
import { GenerateRequest } from '@/app/generate/page';

interface ProposalFormProps {
  onGenerate: (data: GenerateRequest) => Promise<void>;
  isLoading: boolean;
  generationTime: number;
}

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Real Estate',
  'Retail',
  'Manufacturing',
  'Education',
  'Consulting',
  'Marketing',
  'Legal',
  'Other',
];

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly & Approachable' },
  { value: 'technical', label: 'Technical & Detailed' },
  { value: 'executive', label: 'Executive Summary' },
];

export function ProposalForm({
  onGenerate,
  isLoading,
  generationTime,
}: ProposalFormProps) {
  const [formData, setFormData] = useState<GenerateRequest>({
    clientName: '',
    businessName: '',
    industry: 'Technology',
    meetingNotes: '',
    budget: '',
    timeline: '',
    tone: 'professional',
  });

  const [elapsedTime, setElapsedTime] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.clientName ||
      !formData.businessName ||
      !formData.meetingNotes
    ) {
      alert('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    setElapsedTime(0);

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 0.1);
    }, 100);

    try {
      await onGenerate(formData);
    } finally {
      clearInterval(timer);
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Proposal Details</h2>

      {/* Client Name */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Client Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          placeholder="e.g., Acme Corp"
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
        />
      </div>

      {/* Business Name */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Your Business Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          placeholder="e.g., Creative Solutions Inc"
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
        />
      </div>

      {/* Industry */}
      <div>
        <label className="block text-sm font-semibold mb-2">Industry</label>
        <select
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-primary transition"
        >
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* Meeting Notes */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Meeting Notes <span className="text-red-400">*</span>
        </label>
        <textarea
          name="meetingNotes"
          value={formData.meetingNotes}
          onChange={handleChange}
          placeholder="Paste your meeting notes here. What was discussed? What are the key deliverables? What problems are we solving?"
          rows={6}
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">
          The more details you provide, the better the proposal
        </p>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-semibold mb-2">Budget</label>
        <input
          type="text"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="e.g., $25,000 - $50,000"
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
        />
      </div>

      {/* Timeline */}
      <div>
        <label className="block text-sm font-semibold mb-2">Timeline</label>
        <input
          type="text"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          placeholder="e.g., 8 weeks, 3 months, Q2 2024"
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
        />
      </div>

      {/* Tone */}
      <div>
        <label className="block text-sm font-semibold mb-2">Proposal Tone</label>
        <select
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-primary transition"
        >
          {tones.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || isGenerating}
        className={`w-full py-3 rounded-lg font-bold transition transform ${
          isLoading || isGenerating
            ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark text-dark-bg hover:scale-105 glow-primary'
        }`}
      >
        {isGenerating ? (
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin">⏱️</div>
            <span>
              Generating<span className="animate-pulse">...</span>
            </span>
            <span className="font-mono">{elapsedTime.toFixed(1)}s</span>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin">⏳</div>
            Processing...
          </div>
        ) : (
          <>Generate Proposal in ~47 Seconds</>
        )}
      </button>

      {generationTime > 0 && !isGenerating && (
        <div className="p-3 bg-accent/10 border border-accent/50 rounded-lg text-center text-sm text-accent font-semibold">
          ✨ Generated in {generationTime.toFixed(2)}s
        </div>
      )}
    </form>
  );
}
