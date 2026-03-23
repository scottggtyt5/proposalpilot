import { NextRequest, NextResponse } from 'next/server';

interface CheckoutRequest {
  plan: 'pro' | 'agency';
  email: string;
}

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

    // Map plan to Stripe price ID
    const priceIds: Record<string, string | undefined> = {
      pro: process.env.STRIPE_PRICE_ID_PRO,
      agency: process.env.STRIPE_PRICE_ID_AGENCY,
    };

    const priceId = priceIds[data.plan];

    if (!priceId) {
      return NextResponse.json(
        { error: `No price configured for plan: ${data.plan}` },
        { status: 400 }
      );
    }

    // Get app URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Import Stripe - dynamic import to avoid issues if package isn't installed
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

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${appUrl}/?checkout=success`,
      cancel_url: `${appUrl}/?checkout=cancelled`,
      customer_email: data.email,
    });

    return NextResponse.json(
      {
        checkoutUrl: session.url,
        sessionId: session.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Checkout error:', error);

    // Check if it's a Stripe-specific error
    if (
      error instanceof Error &&
      error.message.includes('Invalid stripe secret key')
    ) {
      return NextResponse.json(
        { error: 'Stripe configuration error' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
