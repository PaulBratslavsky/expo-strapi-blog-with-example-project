import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { IFaqs } from "@/types";

export function Faqs({ heading, subHeading, faq }: Readonly<IFaqs>) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View className="w-full py-12 bg-[#f5f3e8] px-4">
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
          {heading || "Frequently Asked Questions"}
        </Text>
        {subHeading && (
          <Text className="text-base text-gray-600 text-center max-w-lg">
            {subHeading}
          </Text>
        )}
      </View>

      <View className="w-full max-w-3xl mx-auto">
        {faq.map((item, index) => (
          <View
            key={`faq-${item.id}-${index}`}
            className={`mb-4 border-2 border-black bg-white rounded-lg overflow-hidden ${
              openIndex === index ? "shadow-lg" : "shadow-md"
            }`}
          >
            <Pressable
              onPress={() => toggleFAQ(index)}
              className="flex-row justify-between items-center p-4"
            >
              <Text className="flex-1 font-bold text-base text-gray-900 pr-4">
                {item.heading}
              </Text>
              <Ionicons
                name={openIndex === index ? "chevron-up" : "chevron-down"}
                size={24}
                color="black"
              />
            </Pressable>

            {openIndex === index && (
              <View className="px-4 pb-4 border-t border-dashed border-gray-300">
                <Text className="text-base text-gray-600 pt-4 leading-relaxed">
                  {item.text}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}