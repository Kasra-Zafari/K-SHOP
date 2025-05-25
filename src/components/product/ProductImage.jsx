"use client";

import Image from "next/image";

const ProductImage = ({ images, title }) => {
  return (
    <div className="w-full max-h-[400px] relative aspect-square rounded-md overflow-hidden">
      <Image
        src={images?.[0] || "/images/placeholder.jpg"}
        alt={title}
        fill
        className="object-contain"
        placeholder="blur"
        blurDataURL="/images/blur-placeholder.png"
        sizes="(max-width: 768px) 100vw, 400px"
        priority={false}
      />
    </div>
  );
};

export default ProductImage;