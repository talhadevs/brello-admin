import { headers } from "next/headers";
import Stripe from "stripe";
import { getStripe, isStripeConfigured } from "@/lib/stripe/client";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return Response.json({ error: "Stripe is not configured." }, { status: 503 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!webhookSecret) {
    return Response.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured." },
      { status: 503 }
    );
  }

  const body = await request.text();
  const headerStore = await headers();
  const signature = headerStore.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Webhook signature verification failed",
      },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded":
    case "payment_intent.payment_failed":
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
    case "invoice.paid":
    case "invoice.payment_failed":
      break;
    default:
      break;
  }

  return Response.json({ received: true, type: event.type });
}
