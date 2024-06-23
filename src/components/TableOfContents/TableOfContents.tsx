import { useHeadings } from "@/lib/toc";
import type { MarkdownHeading } from "astro";
import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { css, cx } from "root/styled-system/css";

type Props = {
  headings: MarkdownHeading[];
};

const MAX_DEPTH = 4;

function isHeadingsNotEmpty<T>(arr: T[]): arr is [T, ...T[]] {
  return arr.length > 0;
}

export function TableOfContents({ headings }: Props) {
  const canonicalHeadings = useHeadings(headings, MAX_DEPTH);
  const currentPageHeadingId = "current-page-heading";

  // TODO: canonicalHeadingsが空配列でないことを保証する
  if (!isHeadingsNotEmpty(canonicalHeadings)) return;
  const [currentHeading, setCurrentHeading] = useState({
    slug: canonicalHeadings[0].slug,
    text: canonicalHeadings[0].text,
  });

  useEffect(() => {
    const setCurrent: IntersectionObserverCallback = (chapters) => {
      for (const chapter of chapters) {
        if (chapter.isIntersecting) {
          const { id } = chapter.target;
          if (id === currentPageHeadingId) continue;
          setCurrentHeading({
            slug: chapter.target.id,
            text: chapter.target.textContent ?? "",
          });
          break;
        }
      }
    };

    const options: IntersectionObserverInit = {
      rootMargin: "-80px 0% -80%",
      threshold: 1,
    };
    const headingOvserver = new IntersectionObserver(setCurrent, options);

    document
      .querySelectorAll("article :is(h1, h2, h3, h4)")
      .forEach((e) => headingOvserver.observe(e));

    return () => headingOvserver.disconnect();
  }, []);

  const onLinkClick = (e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
    setCurrentHeading({
      slug: e.currentTarget.getAttribute("href")!.replace("#", ""),
      text: e.currentTarget.textContent || "",
    });
  };

  return (
    <div
      class={css({ display: "flex", flexDirection: "column", gap: "0.3rem" })}
    >
      <div
        class={css({ fontSize: "larger", fontWeight: "bold", color: "text" })}
      >
        目次
      </div>
      <ul class={css({ all: "unset", listStyle: "none", ps: "0.1rem" })}>
        {canonicalHeadings.map(({ depth, slug, text }) => {
          return (
            <li
              class={cx(
                {
                  2: css({ ps: "0rem" }),
                  3: css({ ps: "1.0rem" }),
                  4: css({ ps: "2.0rem" }),
                  5: css({ ps: "3.0rem" }),
                }[depth],
                {
                  "footnote-label": css({ ps: "0.0rem" }),
                }[slug],
                css({
                  my: 5,
                  ml: 1,
                  bg: currentHeading.slug === slug && "accent-blured",
                  rounded: "0.3em",
                }),
              )}
            >
              <a
                class={css({
                  color: "text",
                  fontWeight: "bold",
                  pl: "1rem",
                  _hover: {
                    textDecoration: "underline",
                  },
                })}
                href={`#${slug}`}
                onClick={onLinkClick}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
