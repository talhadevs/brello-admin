import { NextRequest, NextResponse } from "next/server";
import {
  createRecord,
  listRecords,
} from "@/lib/admin/store";
import {
  defaultId,
  isAdminResource,
  type AdminResource,
} from "@/lib/admin/registry";

type RouteParams = { params: Promise<{ resource: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { resource } = await params;
  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  try {
    const items = await listRecords(resource as AdminResource);
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load records" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { resource } = await params;
  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const id = body.id || defaultId(resource as AdminResource);
    const record = { ...body, id };
    const created = await createRecord(resource as AdminResource, record);
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create record" },
      { status: 500 }
    );
  }
}
