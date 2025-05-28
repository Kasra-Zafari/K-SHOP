"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ReactSlider from "react-slider";

export default function ProductFilters({ categories, brands }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [minRating, setMinRating] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [discountOnly, setDiscountOnly] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedCategories.length) {
            params.set("category", selectedCategories.join(","));
        } else {
            params.delete("category");
        }

        if (selectedBrands.length) {
            params.set("brand", selectedBrands.join(","));
        } else {
            params.delete("brand");
        }

        if (inStockOnly) {
            params.set("inStock", "1");
        } else {
            params.delete("inStock");
        }

        if (discountOnly) {
            params.set("discounted", "1");
        } else {
            params.delete("discounted");
        }

        if (minRating) {
            params.set("rating", minRating);
        } else {
            params.delete("rating");
        }

        params.set("minPrice", priceRange[0]);
        params.set("maxPrice", priceRange[1]);

        router.push(`/products/page/1?${params.toString()}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selectedCategories,
        selectedBrands,
        inStockOnly,
        discountOnly,
        minRating,
        priceRange,
    ]);

    const toggleInArray = (value, array, setArray) => {
        setArray(
            array.includes(value)
                ? array.filter((v) => v !== value)
                : [...array, value]
        );
    };

    const handlePriceChange = (values) => {
        setPriceRange(values);
    };



    return (
        <aside className="w-full md:w-64 p-4 border rounded-xl bg-white shadow-sm mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4 text-[#002AB3]">Filters</h2>

            {/* Category Filter */}
            <div className="mb-4">
                <p className="font-medium text-sm mb-2 text-[#002AB3]">Category</p>
                {categories.map((cat) => (
                    <label
                        key={cat}
                        className="flex items-center mb-1 cursor-pointer hover:text-[#72B7F2]"
                    >
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() =>
                                toggleInArray(cat, selectedCategories, setSelectedCategories)
                            }
                            className="mr-2 accent-[#002AB3]"
                        />
                        <span className="text-sm">{cat}</span>
                    </label>
                ))}
            </div>

            {/* Brand Filter */}
            <div className="mb-4">
                <p className="font-medium text-sm mb-2 text-[#002AB3]">Brand</p>
                {brands.map((brand) => (
                    <label
                        key={brand}
                        className="flex items-center mb-1 cursor-pointer hover:text-[#72B7F2]"
                    >
                        <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() =>
                                toggleInArray(brand, selectedBrands, setSelectedBrands)
                            }
                            className="mr-2 accent-[#002AB3]"
                        />
                        <span className="text-sm">{brand}</span>
                    </label>
                ))}
            </div>

            {/* Price Range */}
            {/* Price Range */}
<div className="mb-4">
  <p className="font-medium text-sm mb-2 text-[#002AB3]">Price Range</p>

  <ReactSlider
    className="w-full h-2 bg-gray-300 rounded-full"
    thumbClassName="w-5 h-5 bg-[#002AB3] rounded-full cursor-pointer"
    trackClassName="h-2 bg-[#002AB3]"
    min={0}
    max={1000}
    step={10}
    value={priceRange}
    onChange={handlePriceChange}
    pearling
    minDistance={20}
  />

  <div className="flex justify-between text-sm mt-2">
    <span>${priceRange[0]}</span>
    <span>${priceRange[1]}</span>
  </div>
</div>



            {/* Rating Filter */}
            <div className="mb-4">
                <p className="font-medium text-sm mb-2 text-[#002AB3]">Minimum Rating</p>
                {[5, 4, 3].map((r) => (
                    <label
                        key={r}
                        className="flex items-center mb-1 cursor-pointer hover:text-[#72B7F2]"
                    >
                        <input
                            type="radio"
                            name="rating"
                            value={r}
                            checked={minRating === r.toString()}
                            onChange={() => setMinRating(r.toString())}
                            className="mr-2 accent-[#002AB3]"
                        />
                        <span className="text-sm">{r} stars & up</span>
                    </label>
                ))}
            </div>
        </aside>
    );
}