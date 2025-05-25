"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { X, Search } from "lucide-react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultSearch = searchParams.get("search") || "";
  const [inputValue, setInputValue] = useState(defaultSearch);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setInputValue(defaultSearch);
    setHasSearched(defaultSearch.length > 0);
  }, [defaultSearch]);

  const doSearch = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim().length > 0) {
      params.set("search", value.trim());
      setHasSearched(true);
    } else {
      params.delete("search");
      setHasSearched(false);
    }

    router.push(`/products/page/1?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      doSearch(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setHasSearched(false);
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
        onKeyDown={handleKeyDown}
        placeholder="Search in products..."
        className="w-full border border-[#002AB3] focus:border-[#72B7F2] focus:outline-none text-[#002AB3] placeholder-[#72B7F2] px-4 py-2 rounded text-base pr-10"
      />


      {hasSearched && inputValue.length > 0 ? (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#002AB3] hover:text-red-500"
          aria-label="Clear search input"
        >
          <X size={18} />
        </button>
      ) : (
        <button
          onClick={() => doSearch(inputValue)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#002AB3] hover:text-[#72B7F2]"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      )}
    </div>
  );
}