// src/components/ProductFilters.jsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react"; // Import useCallback

export default function ProductFilters({ categories, brands }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // State variables
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [minRating, setMinRating] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);
    const [discountOnly, setDiscountOnly] = useState(false);

    const priceRanges = [
        { label: "$0 - $5000", value: "0-5000" },
        { label: "$5000 - $15000", value: "5000-15000" },
        { label: "$15000 - $30000", value: "15000-30000" },
        { label: "$30000 - $40000", value: "30000-40000" },
    ];

    // Effect to read filters from URL on load/URL change
    // This useEffect only initializes the state from the URL
    useEffect(() => {
        const categoriesFromURL = searchParams.get("category")?.split(",") || [];
        const brandsFromURL = searchParams.get("brand")?.split(",") || [];
        const pricesFromURL = searchParams.get("price")?.split(",") || [];
        const ratingFromURL = searchParams.get("rating") || "";
        const inStock = searchParams.get("inStock") === "1";
        const discounted = searchParams.get("discounted") === "1";

        setSelectedCategories(categoriesFromURL);
        setSelectedBrands(brandsFromURL);
        setSelectedPriceRanges(pricesFromURL);
        setMinRating(ratingFromURL);
        setInStockOnly(inStock);
        setDiscountOnly(discounted);
    }, [searchParams]); // Depend on searchParams so it re-syncs if URL changes externally

    // Function to update URL based on a specific filter change
    const updateUrlWithFilter = useCallback((paramName, value) => {
        // Start with existing search params
        const params = new URLSearchParams(searchParams.toString());

        if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
             // If value is null, empty string, or empty array, delete the param
            params.delete(paramName);
        } else if (Array.isArray(value)) {
             // If value is an array, join it with commas
             params.set(paramName, value.join(","));
        }
        else {
            // Otherwise, set the value
            params.set(paramName, value.toString());
        }

        // Push the new URL, preserving the pathname (page number)
        router.push(`${pathname}?${params.toString()}`);
    }, [pathname, router, searchParams]); // Depend on pathname, router, searchParams


    // Modified toggleInArray to update state AND call updateUrlWithFilter
    const toggleInArrayAndUpdateUrl = (value, array, setArray, paramName) => {
        const newArray = array.includes(value)
            ? array.filter((v) => v !== value)
            : [...array, value];
        setArray(newArray); // Update state

        // Update URL based on the *new* array value
        updateUrlWithFilter(paramName, newArray);
    };

    // Modified handlers to update state AND call updateUrlWithFilter
    const handleRatingChange = (e) => {
        const newValue = e.target.value;
        setMinRating(newValue); // Update state
        updateUrlWithFilter('rating', newValue); // Update URL
    };

    const handleInStockChange = (e) => {
        const newValue = e.target.checked;
        setInStockOnly(newValue); // Update state
        updateUrlWithFilter('inStock', newValue ? "1" : null); // Update URL (use "1" for true, null for false)
    };

    const handleDiscountChange = (e) => {
        const newValue = e.target.checked;
        setDiscountOnly(newValue); // Update state
        updateUrlWithFilter('discounted', newValue ? "1" : null); // Update URL (use "1" for true, null for false)
    };


    // Remove the second useEffect that watched state changes

    return (
        <aside className="w-full md:w-64 border rounded p-4 space-y-6 text-sm text-[#002AB3]">
            {/* دسته‌بندی */}
            <div>
                <h3 className="font-semibold mb-2">Category</h3>
                {categories.map((category) => (
                    <label key={category} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() =>
                                toggleInArrayAndUpdateUrl(category, selectedCategories, setSelectedCategories, 'category') // Use new handler
                            }
                            className="mr-2"
                        />
                        {category}
                    </label>
                ))}
            </div>

            {/* برند */}
            <div>
                <h3 className="font-semibold mb-2">Brand</h3>
                {brands.map((brand) => (
                    <label key={brand} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() =>
                                toggleInArrayAndUpdateUrl(brand, selectedBrands, setSelectedBrands, 'brand') // Use new handler
                            }
                            className="mr-2"
                        />
                        {brand}
                    </label>
                ))}
            </div>

            {/* محدوده قیمت */}
            <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                {priceRanges.map((range) => (
                    <label key={range.value} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            checked={selectedPriceRanges.includes(range.value)}
                            onChange={() =>
                                toggleInArrayAndUpdateUrl(range.value, selectedPriceRanges, setSelectedPriceRanges, 'price') // Use new handler
                            }
                            className="mr-2"
                        />
                        {range.label}
                    </label>
                ))}
            </div>

            {/* امتیاز */}
            <div>
                <h3 className="font-semibold mb-2">Minimum Rating</h3>
                <select
                    value={minRating}
                    onChange={handleRatingChange} // Use new handler
                    className="border rounded px-2 py-1 text-[#002AB3] w-full"
                >
                    <option value="">Any</option>
                    {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>
                            {r} stars & up
                        </option>
                    ))}
                </select>
            </div>

            {/* موجودی و تخفیف */}
            <div className="space-y-2">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={handleInStockChange} // Use new handler
                        className="mr-2"
                    />
                    In Stock Only
                </label>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={discountOnly}
                        onChange={handleDiscountChange} // Use new handler
                        className="mr-2"
                    />
                    Discounted Only
                </label>
            </div>
        </aside>
    );
}