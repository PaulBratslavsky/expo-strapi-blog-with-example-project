import { View, Text, Pressable, Linking } from "react-native";
import { StrapiImage } from "@/components/strapi-image";
import type { IContentWithImage } from "@/types";

export function ContentWithImage({
  reversed,
  heading,
  subHeading,
  content,
  link,
  image,
}: Readonly<IContentWithImage>) {
  const handlePress = () => {
    if (link?.href) {
      if (link.isExternal) {
        Linking.openURL(link.href);
      }
    }
  };

  return (
    <View className="bg-white py-12 px-4">
      <View className="w-full max-w-6xl mx-auto">
        <View className="mb-8">
          <View className="relative">
            <View className="absolute inset-0 bg-[#c4a1ff] translate-x-2 translate-y-2 rounded-lg" />
            <View className="relative border-2 border-black rounded-lg overflow-hidden bg-white">
              <StrapiImage
                src={image.url}
                alt={image.alternativeText || heading}
                style={{ width: "100%", height: 192 }}
                contentFit="cover"
              />
            </View>
          </View>
        </View>

        <View>
          {subHeading && (
            <View className="bg-[#e7f192] self-start px-3 py-1 mb-4 border border-black rounded">
              <Text className="text-sm font-medium">{subHeading}</Text>
            </View>
          )}

          <Text className="text-2xl font-bold text-gray-900 mb-4">
            {heading}
          </Text>

          <Text className="text-base text-gray-600 leading-relaxed mb-6">
            {content}
          </Text>

          {link?.href && link.label && (
            <Pressable
              onPress={handlePress}
              className="self-start bg-black px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold">
                {link.label} →
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}