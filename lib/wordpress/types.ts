export type WpRenderedField = {
  rendered: string;
  protected?: boolean;
};

export type WpContentItem = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WpRenderedField;
  content?: WpRenderedField;
  excerpt?: WpRenderedField;
  featured_media?: number;
  acf?: Record<string, unknown>;
};

export type WpListResponse = {
  items: WpContentItem[];
  total: number;
  totalPages: number;
};

export type WpContentPayload = {
  title: string;
  content?: string;
  excerpt?: string;
  status?: "publish" | "draft" | "pending" | "private";
  slug?: string;
};
