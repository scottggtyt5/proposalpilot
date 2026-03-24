import { NextRequest, NextResponse } from 'next/server';

interface CheckoutRequest {
  plan: 'pro' | 'agency';
  email: string;
}

const PLAN_CONFIG = {
  pro: {
    name: 'QuickProp Pro',
    description: 'Unlimited proposals, all templates, custom branding, analytics',
    amount: 4900, // $49.00 in cents
  },
  agency: {
    name: 'QuickProp Agency',
    description: 'Everything in Pro + white-label, custom integrations, dedicated support',
    amount: 19900, // $199.00 in cents
  },
};

export async function POST(request: NextRequest) {
  try {
    const data: CheckoutRequest = await request.json();
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    // Check if Stripe is configured
    if (!stripeSecretKey) {
      return NextResponse.json(
        {
          error: 'Stripe is not configured. Please contact support.',
          message: 'Payment processing is not available at this time.',
        },
        { status: 503 }
      );
    }

    // Validate input
    if (!data.plan || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const planConfig = PLAN_CONFIG[data.plan];
    if (!planConfig) {
      return NextResponse.json(
        { error: `Unknown plan: ${data.plan}` },
        { status: 400 }
      );
    }

    // Get app URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quickprop.app';

    // Import Stripe
    let Stripe;
    try {
      const stripeModule = await import('stripe');
      Stripe = stripeModule.default;
    } catch {
      return NextResponse.json(
        { error: 'Stripe SDK not available' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);

    // Check for existing price IDs first (if configured)
    const priceIds: Record<string, string | undefined> = {
      pro: process.env.STRIPE_PRICE_ID_PRO,
      agency: process.env.STRIPE_PRICE_ID_AGENCY,
    };

    const existingPriceId = priceIds[data.plan];

    // Create checkout session - use existing price ID if available, otherwise use price_data
    const sessionConfig: Parameters<typeof stripe.checkout.sessions.create>[0] = {
      mode: 'subscription',
      success_url: `${appUrl}/generate?checkout=success`,
      cancel_url: `${appUrl}/?checkout=cancelled`,
      customer_email: data.email,
      line_items: existingPriceId
        ? [{ price: existingPriceId, quantity: 1 }]
        : [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: planConfig.name,
                  description: planConfig.description,
                },
                unit_amount: planConfig.amount,
                recurring: {
                  interval: 'month',
                },
              },
              quantity: 1,
            },
          ],
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json(
      {
        checkoutUrl: session.url,
        sessionId: session.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Checkout error:', error);

    if (
      error instanceof Error &&
      error.message.includes('Invalid API Key')
    ) {
      return NextResponse.json(
        { error: 'Stripe configuration error. Please check your API key.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    );
  }
}
