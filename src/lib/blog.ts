import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type Collections = CollectionEntry<"blog">[];

export async function getBlogEntries() {
  const posts = await getCollection("blog");

  return sortBlogEntriesByDate(posts);
}

export function sortBlogEntriesByDate(collections: Collections) {
  return collections.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
}
