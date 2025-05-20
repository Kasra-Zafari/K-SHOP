"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Pagination({ currentPage, totalPages }) {
  const pathname = usePathname();
  const getPageLink = (page) => `/products/page/${page}`;

  const pagesToShow = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pagesToShow.push(i);
    } else if (pagesToShow[pagesToShow.length - 1] !== "...") {
      pagesToShow.push("...");
    }
  }

  return (
    <div className="flex justify-center mt-6 gap-2 flex-wrap text-sm font-medium">
      {/* Previous */}
      {currentPage > 1 && (
        <Link
          href={getPageLink(currentPage - 1)}
          className="px-3 py-1 rounded border text-[#002AB3] hover:bg-[#72B7F2] hover:text-white transition"
        >
          Previous
        </Link>
      )}

      {/* Page Numbers */}
      {pagesToShow.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <Link
            key={`page-${page}`}
            href={getPageLink(page)}
            className={clsx(
              "px-3 py-1 rounded border",
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
          className="px-3 py-1 rounded border text-[#002AB3] hover:bg-[#72B7F2] hover:text-white transition"
        >
          Next
        </Link>
      )}
    </div>
  );
}
