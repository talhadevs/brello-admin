import { getStripe, isStripeConfigured, stripeNotConfiguredResponse } from "@/lib/stripe/client";
import { mapPaymentIntentToOrder } from "@/lib/stripe/mappers";

export async function GET() {
  if (!isStripeConfigured()) {
    return stripeNotConfiguredResponse();
  }

  try {
    const stripe = getStripe();
    const paymentIntents = await stripe.paymentIntents.list({ limit: 50 });

    return Response.json({
      configured: true,
      source: "stripe",
      orders: paymentIntents.data.map(mapPaymentIntentToOrder),
    });
  } catch (error) {
    return Response.json(
      {
        configured: true,
        error: error instanceof Error ? error.message : "Failed to fetch Stripe orders",
      },
      { status: 500 }
    );
  }
}
