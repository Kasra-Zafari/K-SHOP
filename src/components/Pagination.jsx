"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Pagination({ currentPage, totalPages }) {
  const pathname = usePathname();

  const getPageLink = (page) => {
    return `/products/page/${page}`;
  };

  const pagesToShow = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pagesToShow.push(i);
    } else if (
      pagesToShow[pagesToShow.length - 1] !== "..."
    ) {
      pagesToShow.push("...");
    }
  }

  return (
    <div className="flex justify-center mt-10 gap-2 flex-wrap">
      {/* Previous */}
      {currentPage > 1 && (
        <Link
          href={getPageLink(currentPage - 1)}
          className="px-3 py-1 rounded border text-sm hover:bg-gray-100"
        >
          Previous
        </Link>
      )}

      {/* Page Numbers */}
      {pagesToShow.map((page, index) =>
  page === "..." ? (
    <span key={`dots-${index}`} className="px-2 py-1 text-sm">...</span>
  ) : (
    <Link
      key={`page-${page}`}
      href={`/products/page/${page}`}
      className={clsx(
        "px-3 py-1 rounded",
        page === currentPage
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
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
          className="px-3 py-1 rounded border text-sm hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </div>
  );
}
