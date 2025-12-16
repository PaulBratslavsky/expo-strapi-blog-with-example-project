import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StrapiImage } from "@/components/strapi-image";
import type { ICardGrid } from "@/types";

const cardVariants = [
  "bg-[#C4A1FF]",
  "bg-[#E7F193]",
  "bg-[#C4FF83]",
  "bg-[#FFB3BA]",
  "bg-[#A1D4FF]",
  "bg-[#FFDAA1]",
] as const;

const fallbackIcons = [
  "star",
  "heart",
  "flash",
  "rocket",
  "bulb",
  "diamond",
] as const;

function getCardVariant(index: number) {
  return cardVariants[index % cardVariants.length];
}

function getFallbackIcon(index: number) {
  return fallbackIcons[index % fallbackIcons.length];
}

export function CardGrid({
  subHeading,
  heading,
  cards,
}: Readonly<ICardGrid>) {
  return (
    <View className="bg-[#F9F5F2] py-12">
      {(subHeading || heading) && (
        <View className="px-4 mb-6">
          <View className="w-full max-w-6xl mx-auto">
            {subHeading && (
              <Text className="text-lg text-gray-600 mb-2">{subHeading}</Text>
            )}
            {heading && (
              <Text className="text-2xl font-bold text-gray-900">{heading}</Text>
            )}
          </View>
        </View>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 gap-4"
      >
        {cards.map((card, index) => (
          <View
            key={`card-${card.id}-${index}`}
            className="w-64 p-5 bg-white border-2 border-black rounded-lg"
          >
            <View
              className={`w-14 h-14 rounded-full border-2 border-black items-center justify-center mb-4 ${getCardVariant(index)}`}
            >
              {card.icon ? (
                <StrapiImage
                  src={card.icon.url}
                  alt={card.icon.alternativeText || card.heading}
                  style={{ width: 32, height: 32 }}
                  contentFit="contain"
                />
              ) : (
                <Ionicons
                  name={getFallbackIcon(index)}
                  size={24}
                  color="black"
                />
              )}
            </View>

            <Text className="text-lg font-bold text-gray-900 mb-2">
              {card.heading}
            </Text>
            <Text className="text-sm text-gray-600 leading-relaxed">
              {card.text}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}