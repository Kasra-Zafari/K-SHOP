"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

export default function Pagination({ currentPage, totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const getPageLink = (page) => {
    const base = `/products/page/${page}`;
    return search ? `${base}?search=${encodeURIComponent(search)}` : base;
  };

  const getPagesToShow = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
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
          className="px-2 py-1 rounded border text-[#002AB3] hover:bg-[#72B7F2] hover:text-white transition whitespace-nowrap"
        >
          Previous
        </Link>
      )}

      {/* Pages */}
      {pagesToShow.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="px-1 py-1 text-gray-500"
          >
            ...
          </span>
        ) : (
          <Link
            key={`page-${page}`}
            href={getPageLink(page)}
            className={clsx(
              "px-2 py-1 rounded border text-center min-w-[28px]",
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
          className="px-2 py-1 rounded border text-[#002AB3] hover:bg-[#72B7F2] hover:text-white transition whitespace-nowrap"
        >
          Next
        </Link>
      )}
    </div>
  );
}