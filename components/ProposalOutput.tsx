'use client';

import { useState } from 'react';

interface ProposalOutputProps {
  proposal: string;
  generationTime: number;
}

export function ProposalOutput({
  proposal,
  generationTime,
}: ProposalOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(proposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([proposal], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `proposal-${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Proposal</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 900px;
                margin: 0 auto;
                padding: 40px;
              }
              pre {
                white-space: pre-wrap;
                word-wrap: break-word;
              }
            </style>
          </head>
          <body>
            <pre>${proposal}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="card-dark p-8 rounded-lg space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-2xl font-bold mb-2">Generated Proposal</h3>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">
            ✨ Generated in {generationTime.toFixed(2)}s
          </div>
        </div>
      </div>

      {/* Proposal Content */}
      <div className="bg-dark-bg rounded-lg p-6 max-h-96 overflow-y-auto text-sm text-gray-300 font-mono border border-dark-border">
        <div className="whitespace-pre-wrap">{proposal}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={handleCopy}
          className={`flex-1 py-2 rounded-lg font-semibold transition ${
            copied
              ? 'bg-accent text-dark-bg'
              : 'border border-primary text-primary hover:bg-primary/10'
          }`}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 py-2 border border-primary text-primary hover:bg-primary/10 rounded-lg font-semibold transition"
        >
          📥 Download
        </button>
        <button
          onClick={handlePrint}
          className="flex-1 py-2 border border-primary text-primary hover:bg-primary/10 rounded-lg font-semibold transition"
        >
          🖨️ Print
        </button>
      </div>

      {/* Tips */}
      <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-sm text-gray-300">
        <p className="font-semibold mb-2">💡 Next Steps:</p>
        <ul className="space-y-1 text-xs">
          <li>• Copy the proposal and customize in your favorite editor</li>
          <li>• Add your company logo and branding</li>
          <li>• Send directly to your client or embed in your CRM</li>
        </ul>
      </div>
    </div>
  );
}
