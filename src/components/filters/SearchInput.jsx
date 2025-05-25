"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react"; // اضافه کن برای آیکون ضربدر

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const defaultSearch = searchParams.get("search") || "";
  const [inputValue, setInputValue] = useState(defaultSearch);

  const firstRender = useRef(true);

  useEffect(() => {
    setInputValue(defaultSearch);
  }, [defaultSearch]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

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

  const handleClear = () => {
    setInputValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`/products/page/1?${params.toString()}`);
  };

  return (
  <div className="relative w-full md:w-[40%] mx-auto my-4">
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search in products..."
      className="w-full border border-[#002AB3] text-[#002AB3] placeholder-[#6c7ae0] px-4 py-2 rounded text-sm pr-10"
    />
    {inputValue.length > 0 && (
      <button
        onClick={handleClear}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#002AB3] hover:text-red-500"
        aria-label="Clear search input"
      >
        <X size={18} />
      </button>
    )}
  </div>
);
}