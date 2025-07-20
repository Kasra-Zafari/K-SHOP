"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {products.map((product, index) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="block w-full h-full"
        >
          <div className="border border-[#002AB3] rounded-lg p-3 md:p-4 flex flex-col items-center bg-white hover:shadow-md hover:border-[#72b7f2] transition">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={200}
              height={200}
              priority={index === 0}
              className="object-contain rounded-md"
              placeholder="blur"
              blurDataURL="/images/blur-placeholder.png"
            />
            <h2 className="mt-3 text-center text-sm font-semibold text-[#002AB3] min-h-[4rem]">
              {product.title}
            </h2>
            <p className="text-green-700 font-bold mt-1">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
