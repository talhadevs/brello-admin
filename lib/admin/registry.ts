import { ADMINS } from "@/components/admin/admins/admins-data";
import { BLOG_POSTS } from "@/components/admin/blogs/blogs-data";
import { MEMBERS } from "@/components/admin/members/members-data";
import { ORDERS } from "@/components/admin/orders/orders-data";
import { PLANS } from "@/components/admin/plans/plans-data";
import { PRODUCTS } from "@/components/admin/products/products-data";
import { REVIEW_CASES } from "@/components/admin/reviews/reviews-data";
import { SUBSCRIPTIONS } from "@/components/admin/subscriptions/subscriptions-data";

export const ADMIN_RESOURCES = [
  "products",
  "orders",
  "plans",
  "subscriptions",
  "members",
  "blogs",
  "providers",
  "admins",
] as const;

export type AdminResource = (typeof ADMIN_RESOURCES)[number];

export function isAdminResource(value: string): value is AdminResource {
  return ADMIN_RESOURCES.includes(value as AdminResource);
}

export function getSeed(resource: AdminResource): unknown[] {
  switch (resource) {
    case "products":
      return PRODUCTS;
    case "orders":
      return ORDERS;
    case "plans":
      return PLANS;
    case "subscriptions":
      return SUBSCRIPTIONS;
    case "members":
      return MEMBERS;
    case "blogs":
      return BLOG_POSTS;
    case "providers":
      return REVIEW_CASES;
    case "admins":
      return ADMINS;
    default:
      return [];
  }
}

export function defaultId(resource: AdminResource): string {
  const prefix: Record<AdminResource, string> = {
    products: "p",
    orders: "BR",
    plans: "pl",
    subscriptions: "SUB",
    members: "MBR",
    blogs: "b",
    providers: "RV",
    admins: "a",
  };
  return `${prefix[resource]}-${Date.now()}`;
}
