import { Text, View, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import Markdown from "react-native-markdown-display";
import { useArticleBySlug } from "@/hooks/useArticles";
import { StrapiImage } from "@/components/strapi-image";

const markdownStyles = StyleSheet.create({
  body: { fontSize: 16, lineHeight: 26, color: "#374151" },
  heading1: { fontSize: 28, fontWeight: "bold", color: "#111827", marginBottom: 16, marginTop: 24 },
  heading2: { fontSize: 22, fontWeight: "bold", color: "#111827", marginBottom: 12, marginTop: 20 },
  paragraph: { fontSize: 16, lineHeight: 26, color: "#4B5563", marginBottom: 16 },
  link: { color: "#7C3AED", textDecorationLine: "underline" },
  blockquote: {
    backgroundColor: "#F3F4F6",
    borderLeftWidth: 4,
    borderLeftColor: "#c4a1ff",
    paddingLeft: 16,
    paddingVertical: 8,
    marginVertical: 16,
    fontStyle: "italic",
  },
  fence: {
    backgroundColor: "#1F2937",
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    color: "#F9FAFB",
    fontFamily: "monospace",
    fontSize: 14,
  },
});

export default function ArticleDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, isLoading, error } = useArticleBySlug(slug || "");

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F9F5F2]">
        <ActivityIndicator size="large" color="#c4a1ff" />
        <Text className="mt-4 text-gray-600">Loading article...</Text>
      </View>
    );
  }

  if (error || !data?.data?.[0]) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F9F5F2] p-8">
        <Text className="text-xl font-bold text-red-500">Error</Text>
        <Text className="mt-2 text-center text-gray-700">
          {error?.message || "Article not found"}
        </Text>
      </View>
    );
  }

  const article = data.data[0];

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: { backgroundColor: "#F9F5F2" },
          headerTintColor: "#111827",
        }}
      />
      <ScrollView className="flex-1 bg-[#F9F5F2]">
        {article.featuredImage && (
          <StrapiImage
            src={article.featuredImage.url}
            alt={article.featuredImage.alternativeText || article.title}
            style={{ width: "100%", height: 220 }}
            contentFit="cover"
          />
        )}

        <View className="p-4">
          {article.contentTags && article.contentTags.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mb-3">
              {article.contentTags.map((tag) => (
                <View
                  key={tag.id}
                  className="bg-[#e7f192] px-3 py-1 rounded border border-black"
                >
                  <Text className="text-xs font-medium">{tag.title}</Text>
                </View>
              ))}
            </View>
          )}

          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {article.title}
          </Text>

          <View className="flex-row items-center mb-4">
            {article.author && (
              <Text className="text-sm text-gray-600">
                By {article.author.fullName}
              </Text>
            )}
            <Text className="text-sm text-gray-400 mx-2">•</Text>
            <Text className="text-sm text-gray-400">{formattedDate}</Text>
          </View>

          <Text className="text-base text-gray-600 mb-6 leading-relaxed">
            {article.description}
          </Text>

          <View className="border-t border-gray-200 pt-6">
            <Markdown style={markdownStyles}>{article.content}</Markdown>
          </View>
        </View>
      </ScrollView>
    </>
  );
}