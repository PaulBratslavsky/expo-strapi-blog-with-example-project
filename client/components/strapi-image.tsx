import { Image, ImageProps } from "expo-image";
import { getStrapiMedia } from "@/lib/utils";

interface StrapiImageProps extends Omit<ImageProps, "source"> {
  src: string;
  alt?: string;
}

export function StrapiImage({ src, alt, ...props }: StrapiImageProps) {
  const imageUrl = getStrapiMedia(src);

  if (!imageUrl) return null;

  return (
    <Image
      source={{ uri: imageUrl }}
      accessibilityLabel={alt}
      placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
      transition={200}
      {...props}
    />
  );
}