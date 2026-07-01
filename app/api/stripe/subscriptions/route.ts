import { NextRequest } from "next/server";
import { getStripe, isStripeConfigured, stripeNotConfiguredResponse } from "@/lib/stripe/client";
import { mapStripeSubscription } from "@/lib/stripe/mappers";

export async function GET() {
  if (!isStripeConfigured()) {
    return stripeNotConfiguredResponse();
  }

  try {
    const stripe = getStripe();
    const subscriptions = await stripe.subscriptions.list({
      limit: 50,
      expand: ["data.customer", "data.items.data.price.product"],
    });

    return Response.json({
      configured: true,
      source: "stripe",
      subscriptions: subscriptions.data.map(mapStripeSubscription),
    });
  } catch (error) {
    return Response.json(
      {
        configured: true,
        error:
          error instanceof Error ? error.message : "Failed to fetch Stripe subscriptions",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return stripeNotConfiguredResponse();
  }

  const { id, action } = await request.json();
  if (!id || !action) {
    return Response.json({ error: "Missing subscription id or action." }, { status: 400 });
  }

  try {
    const stripe = getStripe();

    if (action === "cancel") {
      const sub = await stripe.subscriptions.cancel(id);
      return Response.json({ subscription: mapStripeSubscription(sub) });
    }

    if (action === "pause") {
      const sub = await stripe.subscriptions.update(id, {
        pause_collection: { behavior: "mark_uncollectible" },
      });
      return Response.json({ subscription: mapStripeSubscription(sub) });
    }

    if (action === "resume") {
      const sub = await stripe.subscriptions.update(id, {
        pause_collection: null,
      });
      return Response.json({ subscription: mapStripeSubscription(sub) });
    }

    return Response.json({ error: "Unsupported action." }, { status: 400 });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Stripe subscription action failed",
      },
      { status: 500 }
    );
  }
}
