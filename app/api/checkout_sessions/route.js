// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: '2022-11-15',
// })

// const formatAmountForStripe = (amount, currency) => {
//     return Math.round(amount * 100)
// }

// export async function POST(req) {
//     try {
//         const params = {
//             mode: 'subscription',
//             payment_method_types: ['card'],
//             line_items: [
//               {
//                 price_data: {
//                   currency: 'usd',
//                   product_data: {
//                     name: 'Pro subscription',
//                   },
//                   unit_amount: 1000, // $10.00 in cents
//                   recurring: {
//                     interval: 'month',
//                     interval_count: 1,
//                   },
//                 },
//                 quantity: 1,
//               },
//             ],
//             success_url: `${req.headers.get(
//               'Referer',
//             )}result?session_id={CHECKOUT_SESSION_ID}`,
//             cancel_url: `${req.headers.get(
//               'Referer',
//             )}result?session_id={CHECKOUT_SESSION_ID}`,
//           }
          
//           const checkoutSession = await stripe.checkout.sessions.create(params)
          
//           return NextResponse.json(checkoutSession, {
//             status: 200,
//         })
//     } catch (error) {
//         console.error('Error creating checkout session:', error)
//         return new NextResponse(JSON.stringify({ error: { message: error.message } }), {
//           status: 500,
//         })
//     }
// }

// export async function GET(req) {
//     const searchParams = req.nextUrl.searchParams
//     const session_id = searchParams.get('session_id')
  
//     try {
//       if (!session_id) {
//         throw new Error('Session ID is required')
//       }
  
//       const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
  
//       return NextResponse.json(checkoutSession)
//     } catch (error) {
//       console.error('Error retrieving checkout session:', error)
//       return NextResponse.json({ error: { message: error.message } }, { status: 500 })
//     }
// }

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15', // Ensure the correct API version
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { userId } = req.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'us_bank_account'],
        line_items: [
          {
            price: process.env.PRICE_ID, // Ensure this environment variable is set
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}&status=success&userId=${userId}`,
        cancel_url: `${req.headers.origin}/`,
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error('Error creating Stripe session:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}