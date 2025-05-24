"use client";

import Link from "next/link";
import { Ban } from "lucide-react";

export default function InvalidProductMessage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center text-[#002AB3]">
      <Ban className="w-12 h-12 text-red-500" />
      <h2 className="text-xl font-semibold">Product Not Found</h2>
      <p className="text-sm text-gray-500 max-w-xs">
        The product you are looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/products/page/1"
        className="mt-4 px-4 py-2 bg-[#002AB3] text-white rounded hover:bg-[#72B7F2] transition"
      >
        Back to Products
      </Link>
    </div>
  );
}
