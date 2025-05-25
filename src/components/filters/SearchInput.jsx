"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const defaultSearch = searchParams.get("search") || "";
  const [inputValue, setInputValue] = useState(defaultSearch);

  const firstRender = useRef(true);

  // Sync input with URL when default search param changes
  useEffect(() => {
    setInputValue(defaultSearch);
  }, [defaultSearch]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Only push if input value has actually changed
    if (inputValue === defaultSearch) return;

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (inputValue.length >= 2) {
        params.set("search", inputValue);
      } else {
        params.delete("search");
      }

      router.push(`/products/page/1?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search in products..."
      className="w-2/5 mx-auto my-4 border border-[#002AB3] px-4 py-2 rounded text-sm text-[#002AB3] placeholder:text-[#72B7F2] focus:outline-none focus:ring-2 focus:ring-[#72B7F2]"
    />
  );
}