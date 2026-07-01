import { getStripe, isStripeConfigured, stripeNotConfiguredResponse } from "@/lib/stripe/client";
import { mapStripeProduct } from "@/lib/stripe/mappers";

export async function GET() {
  if (!isStripeConfigured()) {
    return stripeNotConfiguredResponse();
  }

  try {
    const stripe = getStripe();
    const [products, prices] = await Promise.all([
      stripe.products.list({ limit: 50, active: true }),
      stripe.prices.list({ limit: 100, active: true, expand: ["data.product"] }),
    ]);

    return Response.json({
      configured: true,
      source: "stripe",
      products: products.data.map((product) =>
        mapStripeProduct(product, prices.data)
      ),
    });
  } catch (error) {
    return Response.json(
      {
        configured: true,
        error: error instanceof Error ? error.message : "Failed to fetch Stripe products",
      },
      { status: 500 }
    );
  }
}
