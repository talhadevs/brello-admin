import { NextRequest, NextResponse } from "next/server";
import {
  deleteContent,
  getContent,
  updateContent,
} from "@/lib/wordpress/client";
import { getContentType } from "@/lib/wordpress/content-types";
import type { WpContentPayload } from "@/lib/wordpress/types";

type RouteParams = { params: Promise<{ type: string; id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { type, id } = await params;
    const contentType = getContentType(type);

    if (!contentType) {
      return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
    }

    const item = await getContent(contentType.restBase, Number(id));
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch item" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { type, id } = await params;
    const contentType = getContentType(type);

    if (!contentType) {
      return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
    }

    const body = (await request.json()) as WpContentPayload;
    const item = await updateContent(contentType.restBase, Number(id), body);

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update item" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { type, id } = await params;
    const contentType = getContentType(type);

    if (!contentType) {
      return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
    }

    const result = await deleteContent(contentType.restBase, Number(id));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete item" },
      { status: 500 },
    );
  }
}
