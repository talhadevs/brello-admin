import type { WpContentItem, WpContentPayload, WpListResponse } from "./types";

function getConfig() {
  const baseUrl = process.env.WP_API_URL;
  const username = process.env.WP_API_USERNAME;
  const password = process.env.WP_API_PASSWORD;

  if (!baseUrl || !username || !password) {
    throw new Error(
      "WordPress API credentials missing. Set WP_API_URL, WP_API_USERNAME, and WP_API_PASSWORD in .env.local",
    );
  }

  return { baseUrl: baseUrl.replace(/\/$/, ""), username, password };
}

function authHeaders() {
  const { username, password } = getConfig();
  const token = Buffer.from(`${username}:${password}`).toString("base64");

  return {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();

  if (!response.ok) {
    let message = text.slice(0, 200);
    try {
      const json = JSON.parse(text) as { message?: string; code?: string };
      message = json.message ?? json.code ?? message;
    } catch {
      // keep raw text
    }
    throw new Error(`WordPress API error (${response.status}): ${message}`);
  }

  return text ? (JSON.parse(text) as T) : ({} as T);
}

export async function listContent(
  restBase: string,
  page = 1,
  perPage = 20,
): Promise<WpListResponse> {
  const { baseUrl } = getConfig();
  const url = `${baseUrl}/wp-json/wp/v2/${restBase}?page=${page}&per_page=${perPage}`;

  const response = await fetch(url, {
    headers: authHeaders(),
    cache: "no-store",
  });

  const items = await parseResponse<WpContentItem[]>(response);

  return {
    items,
    total: Number(response.headers.get("X-WP-Total") ?? items.length),
    totalPages: Number(response.headers.get("X-WP-TotalPages") ?? 1),
  };
}

export async function getContent(
  restBase: string,
  id: number,
): Promise<WpContentItem> {
  const { baseUrl } = getConfig();
  const url = `${baseUrl}/wp-json/wp/v2/${restBase}/${id}`;

  const response = await fetch(url, {
    headers: authHeaders(),
    cache: "no-store",
  });

  return parseResponse<WpContentItem>(response);
}

export async function createContent(
  restBase: string,
  payload: WpContentPayload,
): Promise<WpContentItem> {
  const { baseUrl } = getConfig();
  const url = `${baseUrl}/wp-json/wp/v2/${restBase}`;

  const response = await fetch(url, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      title: payload.title,
      content: payload.content ?? "",
      excerpt: payload.excerpt ?? "",
      status: payload.status ?? "draft",
      slug: payload.slug,
    }),
  });

  return parseResponse<WpContentItem>(response);
}

export async function updateContent(
  restBase: string,
  id: number,
  payload: WpContentPayload,
): Promise<WpContentItem> {
  const { baseUrl } = getConfig();
  const url = `${baseUrl}/wp-json/wp/v2/${restBase}/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({
      title: payload.title,
      content: payload.content,
      excerpt: payload.excerpt,
      status: payload.status,
      slug: payload.slug,
    }),
  });

  return parseResponse<WpContentItem>(response);
}

export async function deleteContent(
  restBase: string,
  id: number,
  force = true,
): Promise<{ deleted: boolean; id: number }> {
  const { baseUrl } = getConfig();
  const url = `${baseUrl}/wp-json/wp/v2/${restBase}/${id}?force=${force}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const result = await parseResponse<{ deleted?: boolean; id?: number }>(
    response,
  );

  return { deleted: result.deleted ?? true, id: result.id ?? id };
}
