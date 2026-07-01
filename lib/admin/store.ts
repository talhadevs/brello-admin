import fs from "fs/promises";
import path from "path";
import type { AdminResource } from "@/lib/admin/registry";
import { getSeed } from "@/lib/admin/registry";

const DATA_DIR = path.join(process.cwd(), "data", "admin");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function filePath(resource: AdminResource) {
  return path.join(DATA_DIR, `${resource}.json`);
}

export async function listRecords<T extends { id: string }>(
  resource: AdminResource
): Promise<T[]> {
  await ensureDir();
  const seed = getSeed(resource) as T[];

  try {
    const raw = await fs.readFile(filePath(resource), "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    await fs.writeFile(filePath(resource), JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
}

export async function writeRecords<T>(resource: AdminResource, records: T[]) {
  await ensureDir();
  await fs.writeFile(filePath(resource), JSON.stringify(records, null, 2), "utf8");
}

export async function findRecord<T extends { id: string }>(
  resource: AdminResource,
  id: string
): Promise<T | null> {
  const records = await listRecords<T>(resource);
  return records.find((r) => r.id === id) ?? null;
}

export async function createRecord<T extends { id: string }>(
  resource: AdminResource,
  record: T
): Promise<T> {
  const records = await listRecords<T>(resource);
  if (records.some((r) => r.id === record.id)) {
    throw new Error(`Record with id "${record.id}" already exists.`);
  }
  const next = [record, ...records];
  await writeRecords(resource, next);
  return record;
}

export async function updateRecord<T extends { id: string }>(
  resource: AdminResource,
  id: string,
  patch: Partial<T>
): Promise<T> {
  const records = await listRecords<T>(resource);
  const index = records.findIndex((r) => r.id === id);
  if (index === -1) {
    throw new Error(`Record "${id}" not found.`);
  }
  const updated = { ...records[index], ...patch, id } as T;
  records[index] = updated;
  await writeRecords(resource, records);
  return updated;
}

export async function deleteRecord(resource: AdminResource, id: string) {
  const records = await listRecords<{ id: string }>(resource);
  const next = records.filter((r) => r.id !== id);
  if (next.length === records.length) {
    throw new Error(`Record "${id}" not found.`);
  }
  await writeRecords(resource, next);
  return { id };
}
