"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ProductSort() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sort") || "default";

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        const params = new URLSearchParams(searchParams.toString());

        if (selectedSort === "default") {
            params.delete("sort");
        } else {
            params.set("sort", selectedSort);
        }

        router.push(`/products/page/1?${params.toString()}`);
    };

    return (
        <div className="relative w-full md:w-[15%] mx-auto my-3">
            <select
                value={currentSort}
                onChange={(e) => {
                    handleSortChange(e);
                    e.target.blur(); // Remove focus after selection
                }}
                className="w-full border border-[#002AB3] focus:border-[#72B7F2] focus:outline-none text-[#72B7F2] px-4 py-2 rounded text-base bg-white"
            >
                <option value="default">Default Sorting</option>
                <option value="new">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title-asc">Name: A to Z</option>
                <option value="title-desc">Name: Z to A</option>
            </select>
        </div>
    );
}