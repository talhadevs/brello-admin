import { getStripe, isStripeConfigured } from "@/lib/stripe/client";

export async function GET() {
  if (!isStripeConfigured()) {
    return Response.json({ configured: false });
  }

  try {
    const stripe = getStripe();
    await stripe.balance.retrieve();
    return Response.json({ configured: true, connected: true });
  } catch (error) {
    return Response.json({
      configured: true,
      connected: false,
      error: error instanceof Error ? error.message : "Stripe connection failed",
    });
  }
}
