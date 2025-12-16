import { View, Text } from "react-native";
import type { ISectionHeading } from "@/types";

export function SectionHeading({
  subHeading,
  heading,
}: Readonly<ISectionHeading>) {
  return (
    <View className="bg-[#F9F5F2] pt-12 pb-6 px-4">
      <View className="w-full max-w-6xl mx-auto">
        <Text className="text-lg text-gray-600 mb-2">{subHeading}</Text>
        <Text className="text-2xl font-bold text-gray-900">{heading}</Text>
      </View>
    </View>
  );
}