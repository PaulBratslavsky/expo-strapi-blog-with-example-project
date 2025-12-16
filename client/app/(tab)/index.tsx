import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import { useLandingPage } from "@/hooks/useLandingPage";
import { BlockRenderer } from "@/components/blocks";
import type { Block } from "@/types";

export default function HomeScreen() {
  const { data, isLoading, error } = useLandingPage();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F9F5F2]">
        <ActivityIndicator size="large" color="#c4a1ff" />
        <Text className="mt-4 text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F9F5F2] p-8">
        <Text className="text-xl font-bold text-red-500">Error</Text>
        <Text className="mt-2 text-center text-gray-700">
          {error.message || "Failed to load landing page"}
        </Text>
      </View>
    );
  }

  const landingPage = data?.data;
  const blocks = (landingPage?.blocks || []) as Block[];

  return (
    <ScrollView className="flex-1 bg-[#F9F5F2]">
      <BlockRenderer blocks={blocks} />
    </ScrollView>
  );
}