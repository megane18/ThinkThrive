import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get('session_id');

  try {
    console.log('Received GET request with session_id:', session_id);

    if (!session_id) {
      console.error('Session ID is missing in GET request');
      return NextResponse.json({ error: { message: 'Session ID is required' } }, { status: 400 });
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    console.log('Stripe checkout session retrieved:', checkoutSession);

    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const origin = req.headers.get('origin') || req.headers.get('referer') || 'http://localhost:3000';
    console.log('Origin:', origin);

    const params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pro subscription',
            },
            unit_amount: 1000, // $10.00 in cents
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    };
    console.log('Success URL:', params.success_url);
console.log('Cancel URL:', params.cancel_url);


    //console.log('Creating Stripe checkout session with params:', params);

    const checkoutSession = await stripe.checkout.sessions.create(params);
    console.log('Stripe checkout session created:', checkoutSession);

    console.log('Returning response:', {
      id: checkoutSession.id,
      url: checkoutSession.url
    });

    return NextResponse.json({
      id: checkoutSession.id,
      url: checkoutSession.url
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}