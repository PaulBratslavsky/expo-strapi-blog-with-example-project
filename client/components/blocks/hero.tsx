import { View, Text, Pressable, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StrapiImage } from "@/components/strapi-image";
import type { IHero } from "@/types";

export function Hero({
  subHeading,
  heading,
  highlightedText,
  text,
  links,
  image,
}: Readonly<IHero>) {
  const handlePress = (href: string, isExternal: boolean) => {
    if (isExternal) {
      Linking.openURL(href);
    }
  };

  return (
    <View className="bg-[#F9F5F2] py-12 px-4">
      <View className="w-full max-w-6xl mx-auto">
        {/* Image */}
        <View className="w-full mb-8">
          <StrapiImage
            src={image.url}
            alt={image.alternativeText || heading}
            style={{ width: "100%", height: 192, borderRadius: 8 }}
            contentFit="cover"
          />
        </View>

        {/* Content */}
        <View className="items-center">
          {subHeading && (
            <Text className="text-base text-gray-600 mb-2">{subHeading}</Text>
          )}

          <Text className="text-3xl font-bold text-center text-gray-900">
            {heading}
          </Text>

          {highlightedText && (
            <View className="bg-[#e7f192] px-3 py-1 mt-3 rotate-2 border-2 border-black">
              <Text className="text-2xl font-bold">{highlightedText}</Text>
            </View>
          )}

          <Text className="text-base text-gray-600 text-center mt-4 px-4">
            {text}
          </Text>

          {links.length > 0 && (
            <View className="flex-row flex-wrap justify-center gap-3 mt-6">
              {links.map((link, index) => (
                <Pressable
                  key={`link-${link.id}-${index}`}
                  onPress={() => handlePress(link.href, link.isExternal)}
                  className={`flex-row items-center px-6 py-3 rounded-lg border-2 border-black ${
                    index === 0 ? "bg-[#c4a1ff]" : "bg-white"
                  }`}
                >
                  <Text className="font-semibold text-base">{link.label}</Text>
                  {index === 0 && (
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color="black"
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}