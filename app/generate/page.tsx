'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProposalForm } from '@/components/ProposalForm';
import { ProposalOutput } from '@/components/ProposalOutput';

export interface GenerateRequest {
  clientName: string;
  businessName: string;
  industry: string;
  meetingNotes: string;
  budget: string;
  timeline: string;
  tone: string;
}

export interface GenerateResponse {
  proposal: string;
  generatedAt: string;
  generationTime: number;
}

export default function GeneratePage() {
  const [proposal, setProposal] = useState<GenerateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationTime, setGenerationTime] = useState(0);

  const handleGenerate = async (formData: GenerateRequest) => {
    setIsLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate proposal');
      }

      const data: GenerateResponse = await response.json();
      const endTime = Date.now();
      const timeInSeconds = (endTime - startTime) / 1000;

      setGenerationTime(timeInSeconds);
      setProposal(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg">
      {/* Navigation */}
      <nav className="border-b border-dark-border bg-dark-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold gradient-text hover:opacity-80">
            QuickProp
          </Link>
          <div className="flex gap-4">
            <Link href="/" className="text-sm hover:text-primary transition">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Generate Your <span className="gradient-text">Proposal</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fill in your meeting details below and watch us create a professional proposal in seconds.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Column */}
          <div className="space-y-6">
            <div className="card-dark p-8 rounded-lg">
              <ProposalForm
                onGenerate={handleGenerate}
                isLoading={isLoading}
                generationTime={generationTime}
              />
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Output Column */}
          <div className="space-y-6">
            {proposal ? (
              <>
                <ProposalOutput
                  proposal={proposal.proposal}
                  generationTime={generationTime}
                />
                <button
                  onClick={() => setProposal(null)}
                  className="w-full py-3 border border-primary/50 text-primary hover:bg-primary/10 rounded-lg font-semibold transition"
                >
                  Generate Another Proposal
                </button>
              </>
            ) : (
              <div className="card-dark p-8 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">ð</div>
                  <p className="text-gray-400">
                    Fill in the form and your proposal will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Usage Info */}
        <div className="mt-12 p-6 bg-primary/10 border border-primary/50 rounded-lg">
          <p className="text-center text-sm text-gray-300">
            ð¡ <span className="font-semibold">Free tier:</span> 5 proposals per month. Upgrade to Pro for unlimited generation.
          </p>
        </div>
      </div>
    </div>
  );
}
