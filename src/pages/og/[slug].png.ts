import type { APIContext } from "astro";
import { getEntryBySlug } from "astro:content";
import { getBlogEntries } from "@/utils/blog";
import { OgImage } from "@/components/OgImage";

export async function getStaticPaths() {
  const entries = await getBlogEntries();
  return entries.map((entry) => ({
    params: { slug: entry.slug },
  }))
}

export async function GET({ params }: APIContext) {
  const entry = await getEntryBySlug("blog", params.slug as string);
  const body = await OgImage(entry!.data.title);

  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
    },
  })
}
