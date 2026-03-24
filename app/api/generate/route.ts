import { NextRequest, NextResponse } from 'next/server';

interface GenerateRequest {
  clientName: string;
  businessName: string;
  industry: string;
  meetingNotes: string;
  budget: string;
  timeline: string;
  tone: string;
}

// Template-based proposal generator (fallback when no API key is available)
function generateProposalFromTemplate(data: GenerateRequest): string {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sections = {
    professional: {
      intro: `This proposal outlines our strategic approach to addressing your business objectives and delivering measurable results.`,
      approach: `Our methodology is founded on industry best practices and tailored to your specific requirements.`,
    },
    friendly: {
      intro: `We're excited to partner with you and help achieve your goals! Here's our plan to get started.`,
      approach: `We've designed a straightforward approach that focuses on what matters most to your business.`,
    },
    technical: {
      intro: `This proposal provides a detailed technical specification and implementation roadmap for the proposed solution.`,
      approach: `Our architecture and technical approach have been optimized for scalability, reliability, and maintainability.`,
    },
    executive: {
      intro: `This executive summary outlines the key value drivers and expected outcomes of this engagement.`,
      approach: `We've prioritized impact, focusing on the initiatives with the highest ROI.`,
    },
  };

  const tone = data.tone as keyof typeof sections;
  const toneText = sections[tone] || sections.professional;

  // Extract key points from meeting notes (simple parsing)
  const notes = data.meetingNotes
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .slice(0, 5);

  const keyPoints = notes
    .map((note) => `  â¢ ${note.trim().substring(0, 100)}`)
    .join('\n');

  return `PROPOSAL

${data.businessName}
âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

PROPOSAL FOR: ${data.clientName}
DATE: ${date}
INDUSTRY: ${data.industry}

âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
EXECUTIVE SUMMARY
âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

${toneText.intro}

As a leading ${data.industry} solutions provider, we understand the unique
challenges and opportunities in your space. This proposal details our
comprehensive approach to driving success.

âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
SCOPE OF WORK
âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

Based on our discussion, we've identified the following key initiatives:

${keyPoints}

âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
OUR APPROACH
âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

${toneText.approach}

Phase 1: Discovery & Planning
  â¢ Comprehensive assessment of current state
  â¢ Goal alignment and success metrics definition
  â¢ Resource planning and timeline development

Phase 2: Implementation
  â¢ Solution design and architecture
  â¢ Iterative development and testing
  â¢ Stakeholder communication and feedback integration

Phase 3: Optimization & Support
  â¢ Performance monitoring and optimization
  â¢ Training and documentation
  â¢ Ongoing support and continuous improvement

âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
PROJECT TIMELINE
âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

Project Duration: ${data.timeline || 'To be determined based on scope'}

  Week 1-2: Discovery Phase
  Week 3-6: Implementation Phase
  Week 7+: Launch & Optimization

âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
INVESTMENT
âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

Project Investment: ${data.budget || 'Custom quote based on final scope'}

This investment includes:
  â Complete solution delivery
  â Implementation and deployment
  â Team training and documentation
  â 30 days of post-launch support

âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
WHY CHOOSE US
âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

  â Industry expertise and proven track record
  â Client-focused approach with dedicated support
  â Transparent communication and reporting
  â Commitment to delivering measurable results

âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
NEXT STEPS
âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

1. Review this proposal and provide feedback
2. Schedule a kickoff meeting to finalize details
3. Sign agreement and initiate project planning
4. Begin Phase 1: Discovery & Planning

âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

This proposal is valid for 30 days from the date above.

Thank you for the opportunity to work with ${data.clientName}.

We look forward to partnering with you!

${data.businessName}
âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ`;
}

// AI-powered proposal generator (when API key is available)
async function generateProposalWithAI(data: GenerateRequest): Promise<string> {
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!openaiKey && !anthropicKey) {
    // Fall back to template
    return generateProposalFromTemplate(data);
  }

  // Try OpenAI first
  if (openaiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a professional proposal writer. Generate a comprehensive, well-formatted proposal based on the provided information.
              The proposal should be professional, detailed, and ready to send to a client.
              Format it with clear sections, bullet points, and a professional structure.
              Keep it concise but thorough (800-1200 words).`,
            },
            {
              role: 'user',
              content: `Generate a proposal with these details:

Client Name: ${data.clientName}
Business Name: ${data.businessName}
Industry: ${data.industry}
Meeting Notes: ${data.meetingNotes}
Budget: ${data.budget || 'To be discussed'}
Timeline: ${data.timeline || 'To be determined'}
Tone: ${data.tone}

Create a professional proposal that covers scope, approach, timeline, investment, and next steps.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });

      if (!response.ok) {
        console.error('OpenAI API error:', response.statusText);
        return generateProposalFromTemplate(data);
      }

      const json = await response.json();
      return (
        json.choices?.[0]?.message?.content || generateProposalFromTemplate(data)
      );
    } catch (error) {
      console.error('OpenAI generation failed:', error);
      return generateProposalFromTemplate(data);
    }
  }

  // Fall back to template
  return generateProposalFromTemplate(data);
}

export async function POST(request: NextRequest) {
  try {
    const data: GenerateRequest = await request.json();

    // Validate required fields
    if (!data.clientName || !data.businessName || !data.meetingNotes) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate proposal (AI if available, template as fallback)
    const proposal = await generateProposalWithAI(data);

    return NextResponse.json(
      {
        proposal,
        generatedAt: new Date().toISOString(),
        generationTime: 0.30, // ~30 seconds target (we'll measure client-side)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Proposal generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    );
  }
}
