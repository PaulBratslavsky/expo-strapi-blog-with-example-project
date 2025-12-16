import { strapiApi } from "@/lib/strapi-api";
import type {
  LandingPage,
  Article,
  StrapiResponse,
  StrapiCollectionResponse,
} from "@/types";

const PAGE_SIZE = 10;

// Landing Page (Single Type)
export async function getLandingPageData(): Promise<StrapiResponse<LandingPage>> {
  const response = await strapiApi.single("landing-page").find({
    populate: {
      blocks: {
        populate: {
          image: { fields: ["url", "alternativeText", "width", "height"] },
          link: { fields: ["url", "text", "isExternal"] },
          feature: { fields: ["heading", "subHeading", "icon"] },
        },
      },
    },
  });
  return response as StrapiResponse<LandingPage>;
}

// Articles (Collection Type)
const articles = strapiApi.collection("articles");

export interface GetArticlesParams {
  page?: number;
  pageSize?: number;
  tag?: string;
}

export async function getArticles(
  params?: GetArticlesParams
): Promise<StrapiCollectionResponse<Article>> {
  const { page = 1, pageSize = PAGE_SIZE, tag } = params || {};

  const filters = tag
    ? {
        contentTags: {
          title: { $containsi: tag },
        },
      }
    : undefined;

  const response = await articles.find({
    sort: ["createdAt:desc"],
    pagination: {
      page,
      pageSize,
    },
    filters,
  });

  return response as StrapiCollectionResponse<Article>;
}

export async function getArticleBySlug(
  slug: string
): Promise<StrapiCollectionResponse<Article>> {
  const response = await articles.find({
    filters: {
      slug: { $eq: slug },
    },
  });

  return response as StrapiCollectionResponse<Article>;
}