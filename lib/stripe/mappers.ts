import type Stripe from "stripe";
import type { Order, PaymentStatus } from "@/components/admin/orders/orders-data";
import type { Product } from "@/components/admin/products/products-data";

function formatMoney(cents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function formatDate(unix: number): string {
  return new Date(unix * 1000).toISOString().slice(0, 10);
}

function mapPaymentStatus(status: string): PaymentStatus {
  if (status === "succeeded") return "Paid";
  if (status === "canceled") return "Refunded";
  return "Pending";
}

export function mapPaymentIntentToOrder(pi: Stripe.PaymentIntent): Order {
  const customerName =
    pi.metadata.customer_name ||
    (typeof pi.customer === "object" && pi.customer && "name" in pi.customer
      ? (pi.customer.name as string | null)
      : null) ||
    "Stripe Customer";

  const email =
    pi.receipt_email ||
    pi.metadata.email ||
    (typeof pi.customer === "object" && pi.customer && "email" in pi.customer
      ? (pi.customer.email as string | null)
      : null) ||
    "";

  return {
    id: pi.id.slice(-8).toUpperCase(),
    customer: customerName,
    email,
    plan: pi.description || pi.metadata.plan || pi.metadata.product || "Payment",
    state: pi.metadata.state || "—",
    amount: Math.round(pi.amount / 100),
    payment: mapPaymentStatus(pi.status),
    fulfillment: pi.status === "succeeded" ? "Processing" : "On Hold",
    date: formatDate(pi.created),
  };
}

export function mapStripeProduct(
  product: Stripe.Product,
  prices: Stripe.Price[]
): Product {
  const productPrices = prices.filter((p) => p.product === product.id && p.active);
  const monthly = productPrices.find((p) => p.recurring?.interval === "month");
  const quarterly = productPrices.find(
    (p) => p.recurring?.interval === "month" && (p.recurring.interval_count ?? 1) >= 3
  ) ?? productPrices.find((p) => p.recurring?.interval === "month" && p.id !== monthly?.id);

  const category = (product.metadata.category as Product["category"]) || "Medication";
  const status = product.active ? "Active" : "Draft";

  return {
    id: product.id,
    name: product.name,
    category,
    status,
    tag: (product.metadata.tag as Product["tag"]) || null,
    monthly: monthly ? Math.round((monthly.unit_amount ?? 0) / 100) : 0,
    quarterly: quarterly
      ? Math.round((quarterly.unit_amount ?? 0) / 100)
      : monthly
        ? Math.round(((monthly.unit_amount ?? 0) / 100) * 3)
        : 0,
    subscribers: Number(product.metadata.subscribers ?? 0),
    included: product.description || product.metadata.included || "",
  };
}

export type AdminSubscription = {
  id: string;
  member: string;
  email: string;
  plan: string;
  dosage: string;
  status: "Active" | "Paused" | "Cancelled" | "Past Due" | "Pending Approval";
  amount: string;
  cycle: string;
  nextBilling: string;
  state: string;
};

function mapSubscriptionStatus(
  sub: Stripe.Subscription
): AdminSubscription["status"] {
  if (sub.status === "active" && sub.pause_collection) return "Paused";
  if (sub.status === "active") return "Active";
  if (sub.status === "canceled") return "Cancelled";
  if (sub.status === "past_due" || sub.status === "unpaid") return "Past Due";
  if (sub.status === "trialing" || sub.status === "incomplete") return "Pending Approval";
  if (sub.status === "paused") return "Paused";
  return "Pending Approval";
}

export function mapStripeSubscription(sub: Stripe.Subscription): AdminSubscription {
  const customer =
    typeof sub.customer === "object" && sub.customer && !sub.customer.deleted
      ? sub.customer
      : null;

  const price = sub.items.data[0]?.price;
  const product =
    price && typeof price.product === "object" && price.product
      ? price.product
      : null;

  const member =
    customer?.name ||
    sub.metadata.member_name ||
    customer?.email?.split("@")[0] ||
    "Member";

  const interval = price?.recurring?.interval ?? "month";
  const intervalCount = price?.recurring?.interval_count ?? 1;
  const cycle =
    intervalCount > 1
      ? `Every ${intervalCount} ${interval}s`
      : `Every ${interval}`;

  const periodEnd = sub.items.data[0]?.current_period_end;

  return {
    id: sub.id,
    member,
    email: customer?.email || sub.metadata.email || "",
    plan:
      (product && "name" in product ? product.name : null) ||
      price?.nickname ||
      "Subscription",
    dosage: sub.metadata.dosage || "—",
    status: mapSubscriptionStatus(sub),
    amount: formatMoney(sub.items.data[0]?.price?.unit_amount ?? 0, sub.currency),
    cycle,
    nextBilling: periodEnd
      ? new Date(periodEnd * 1000).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "—",
    state: sub.metadata.state || customer?.address?.state || "—",
  };
}
