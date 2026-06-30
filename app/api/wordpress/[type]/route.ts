import { NextRequest, NextResponse } from "next/server";
import {
  createContent,
  listContent,
} from "@/lib/wordpress/client";
import { getContentType } from "@/lib/wordpress/content-types";
import type { WpContentPayload } from "@/lib/wordpress/types";

type RouteParams = { params: Promise<{ type: string }> };

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { type } = await params;
    const contentType = getContentType(type);

    if (!contentType) {
      return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
    }

    const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
    const data = await listContent(contentType.restBase, page);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch content" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { type } = await params;
    const contentType = getContentType(type);

    if (!contentType) {
      return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
    }

    const body = (await request.json()) as WpContentPayload;
    const item = await createContent(contentType.restBase, body);

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create content" },
      { status: 500 },
    );
  }
}
