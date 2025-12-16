import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getArticles, getArticleBySlug } from "@/data/loaders";

export function useArticles(params?: { page?: number; tag?: string }) {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => getArticles(params),
  });
}

export function useInfiniteArticles(tag?: string) {
  return useInfiniteQuery({
    queryKey: ["articles", "infinite", tag],
    queryFn: ({ pageParam = 1 }) => getArticles({ page: pageParam, tag }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination || { page: 1, pageCount: 1 };
      return page < pageCount ? page + 1 : undefined;
    },
  });
}

export function useArticleBySlug(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlug(slug),
    enabled: !!slug,
  });
}