import { NextRequest, NextResponse } from "next/server";
import {
  deleteRecord,
  findRecord,
  updateRecord,
} from "@/lib/admin/store";
import { isAdminResource, type AdminResource } from "@/lib/admin/registry";

type RouteParams = { params: Promise<{ resource: string; id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { resource, id } = await params;
  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  try {
    const item = await findRecord(resource as AdminResource, id);
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load record" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { resource, id } = await params;
  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const item = await updateRecord(resource as AdminResource, id, body);
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update record" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { resource, id } = await params;
  if (!isAdminResource(resource)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  try {
    const result = await deleteRecord(resource as AdminResource, id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete record" },
      { status: 500 }
    );
  }
}
