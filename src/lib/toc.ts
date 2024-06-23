import type { MarkdownHeading } from "astro";

const FOOTNOTES_SLUG = "footnote-label";

export function modifyLastItem(headings: MarkdownHeading[]): MarkdownHeading[] {
  const lastItem = headings.slice(-1)[0];
  if (lastItem && lastItem.slug === FOOTNOTES_SLUG) {
    headings[headings.length - 1] = {
      ...headings[headings.length - 1],
      depth: 1,
      slug: FOOTNOTES_SLUG,
      text: "脚注",
    };
  }

  return headings;
}

export function filterHeadingsByDepth(
  headings: MarkdownHeading[],
  depth: number,
): MarkdownHeading[] {
  return headings.filter((heading) => heading.depth < depth);
}

export function useHeadings(
  headings: MarkdownHeading[],
  depth: number,
): MarkdownHeading[] {
  return filterHeadingsByDepth(modifyLastItem(headings), depth);
}
