"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";

export default function Pagination({ currentPage, totalPages }) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const price = searchParams.get("price");
  const rating = searchParams.get("rating");
  const inStock = searchParams.get("inStock");
  const discounted = searchParams.get("discounted");


  const getPageLink = (page) => {
    const base = `/products/page/${page}`;
    const query = new URLSearchParams();

    if (search) query.set("search", search);
    if (sort) query.set("sort", sort);
    if (category) query.set("category", category);
    if (brand) query.set("brand", brand);
    if (price) query.set("price", price);
    if (rating) query.set("rating", rating);
    if (inStock) query.set("inStock", inStock);
    if (discounted) query.set("discounted", discounted);


    const queryString = query.toString();
    return queryString ? `${base}?${queryString}` : base;
  };

  const getPagesToShow = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  const pagesToShow = getPagesToShow();

  return (
    <div className="flex justify-center mt-6 gap-1 flex-nowrap overflow-x-auto text-xs font-medium px-2">
      {/* Previous */}
      {currentPage > 1 && (
        <Link
          href={getPageLink(currentPage - 1)}
          className="px-2 py-1 rounded border text-[#002AB3] hover:bg-[#72B7F2] hover:text-white transition whitespace-nowrap sm:px-3 sm:py-2 sm:text-sm"
        >
          Previous
        </Link>
      )}

      {/* Pages */}
      {pagesToShow.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-1 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <Link
            key={`page-${page}`}
            href={getPageLink(page)}
            className={clsx(
              "rounded border text-center min-w-[28px]",
              "px-2 py-1 text-xs",
              "sm:px-3 sm:py-2 sm:text-sm",
              page === currentPage
                ? "bg-[#002AB3] text-white"
                : "text-[#002AB3] hover:bg-[#72B7F2] hover:text-white transition"
            )}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages && (
        <Link
          href={getPageLink(currentPage + 1)}
          className="px-2 py-1 rounded border text-[#002AB3] hover:bg-[#72B7F2] hover:text-white transition whitespace-nowrap sm:px-3 sm:py-2 sm:text-sm"
        >
          Next
        </Link>
      )}
    </div>
  );
}