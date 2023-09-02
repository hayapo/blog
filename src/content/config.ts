import { defineCollection, z } from "astro:content";
import { POST_TAGS } from "../consts";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.enum(POST_TAGS)),
      coverImage: image(),
      imageCredit: z
        .object({
          author: z.string(),
          authorUrl: z.string(),
        })
        .optional(),
      // Transform string to Date object
      publishDate: z.date(),
      updatedDate: z.date().optional(),
    }),
});

export const collections = {
  blog: blogCollection,
} as const;
