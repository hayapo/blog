import rss from "@astrojs/rss";
import { SITE_TITLE } from "@/consts";
import { getBlogEntries } from "@/utils/blog";

const site = import.meta.env.SITE;
const posts = await getBlogEntries();

export function GET() {
  return rss({
    title: SITE_TITLE,
    description: `RSS feed for ${SITE_TITLE}`,
    site: site,
    customData: `<language>ja-jp</language>`,
    items: posts.map((post) => ({
      title: `<![CDATA[${post.data.title}]]`,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/${post.slug}`,
      customData: `
      <enclosure url="
        ${import.meta.env.SITE}${post.data.coverImage.src}"
        length="${post.data.coverImage.width * post.data.coverImage.height}"
        type="image/${post.data.coverImage.format}"
        >
      </enclosure>
      `,
    })),
  });
}
