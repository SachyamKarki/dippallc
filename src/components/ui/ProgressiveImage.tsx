import Image, { type ImageProps } from "next/image";
import { getImagePlaceholder } from "@/lib/imagePlaceholders";

type ProgressiveImageProps = ImageProps;

export default function ProgressiveImage({
  src,
  placeholder,
  blurDataURL,
  quality = 75,
  decoding = "async",
  sizes,
  ...props
}: ProgressiveImageProps) {
  const path = typeof src === "string" ? src : "";
  const generated = getImagePlaceholder(path);
  const resolvedBlur = placeholder === "empty" ? undefined : (blurDataURL ?? generated);

  return (
    <Image
      src={src}
      sizes={sizes ?? "100vw"}
      quality={quality}
      decoding={decoding}
      placeholder={resolvedBlur ? "blur" : placeholder ?? "empty"}
      blurDataURL={resolvedBlur}
      {...props}
    />
  );
}
