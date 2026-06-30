import { notFound } from "next/navigation";
import ContentManager from "@/components/admin/ContentManager";
import { listContent } from "@/lib/wordpress/client";
import { getContentType } from "@/lib/wordpress/content-types";

type PageProps = {
  params: Promise<{ type: string }>;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, "").trim();
}

export default async function ContentTypePage({ params }: PageProps) {
  const { type } = await params;
  const contentType = getContentType(type);

  if (!contentType) {
    notFound();
  }

  let initialItems: {
    id: number;
    title: string;
    status: string;
    date: string;
    slug: string;
  }[] = [];
  let initialTotal = 0;
  let loadError: string | null = null;

  try {
    const data = await listContent(contentType.restBase);
    initialItems = data.items.map((item) => ({
      id: item.id,
      title: stripHtml(item.title.rendered),
      status: item.status,
      date: item.date,
      slug: item.slug,
    }));
    initialTotal = data.total;
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to connect to WordPress";
  }

  return (
    <>
      {loadError && (
        <div className="mx-8 mt-8 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {loadError}
        </div>
      )}
      <ContentManager
        type={type}
        typeLabel={contentType.label}
        initialItems={initialItems}
        initialTotal={initialTotal}
      />
    </>
  );
}
