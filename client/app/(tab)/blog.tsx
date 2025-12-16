import { Text, View, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { useState, useCallback, useMemo } from "react";
import { useInfiniteArticles } from "@/hooks/useArticles";
import { ArticleCard } from "@/components/article-card";
import type { Article } from "@/types";

export default function BlogScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteArticles();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const articles = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const totalCount = data?.pages[0]?.meta?.pagination?.total || 0;

  if (isLoading && !refreshing) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F9F5F2]">
        <ActivityIndicator size="large" color="#c4a1ff" />
        <Text className="mt-4 text-gray-600">Loading articles...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F9F5F2] p-8">
        <Text className="text-xl font-bold text-red-500">Error</Text>
        <Text className="mt-2 text-center text-gray-700">
          {error.message || "Failed to load articles"}
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Article }) => (
    <ArticleCard article={item} />
  );

  const renderHeader = () => (
    <View className="mb-4">
      <Text className="text-2xl font-bold text-gray-900">Latest Articles</Text>
      <Text className="text-gray-600 mt-1">
        {totalCount} article{totalCount !== 1 ? "s" : ""}
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#c4a1ff" />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#F9F5F2]">
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.documentId}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#c4a1ff"
          />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}