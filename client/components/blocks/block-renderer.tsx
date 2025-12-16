import { View } from "react-native";
import { Hero } from "./hero";
import { SectionHeading } from "./section-heading";
import { CardGrid } from "./card-grid";
import { ContentWithImage } from "./content-with-image";
import { MarkdownText } from "./markdown-text";
import { Faqs } from "./faqs";
import type { Block } from "@/types";

interface BlockRendererProps {
  blocks: Block[];
}

export function BlockRenderer({ blocks }: Readonly<BlockRendererProps>) {
  const renderBlock = (block: Block) => {
    switch (block.__component) {
      case "blocks.hero":
        return <Hero {...block} />;
      case "blocks.section-heading":
        return <SectionHeading {...block} />;
      case "blocks.card-grid":
        return <CardGrid {...block} />;
      case "blocks.content-with-image":
        return <ContentWithImage {...block} />;
      case "blocks.markdown":
        return <MarkdownText {...block} />;
      case "blocks.faqs":
        return <Faqs {...block} />;
      default:
        return null;
    }
  };

  return (
    <View>
      {blocks.map((block, index) => (
        <View key={`${block.__component}-${block.id}-${index}`}>
          {renderBlock(block)}
        </View>
      ))}
    </View>
  );
}