export type ContentType = {
  slug: string;
  label: string;
  restBase: string;
  description: string;
};

export const CONTENT_TYPES: ContentType[] = [
  {
    slug: "pages",
    label: "Pages",
    restBase: "pages",
    description: "Static site pages (Homepage, Terms, etc.)",
  },
  {
    slug: "product",
    label: "Products",
    restBase: "product",
    description: "WooCommerce products and therapy plans",
  },
  {
    slug: "human_interaction",
    label: "Human Interactions",
    restBase: "human_interaction",
    description: "Family interaction and engagement content",
  },
  {
    slug: "how_do_visits_work",
    label: "Visit Steps",
    restBase: "how_do_visits_work",
    description: "How visits work — step-by-step flow",
  },
  {
    slug: "holistic_approach",
    label: "Holistic Approach",
    restBase: "holistic_approach",
    description: "Wellness categories (social, cognitive, daily living)",
  },
  {
    slug: "collabs-video",
    label: "Collab Videos",
    restBase: "collabs-video",
    description: "Collaboration video content",
  },
];

export function getContentType(slug: string): ContentType | undefined {
  return CONTENT_TYPES.find((type) => type.slug === slug);
}
