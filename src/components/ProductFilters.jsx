"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function ProductFilters({ categories, brands }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [minRating, setMinRating] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);
    const [discountOnly, setDiscountOnly] = useState(false);

    // حالت نمایش کرکره‌ای در موبایل
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const priceRanges = [
    { label: "$0 - $200", value: "0-200" },
    { label: "$200 - $400", value: "200-400" },
    { label: "$400 - $600", value: "400-600" },
    { label: "$600 - $800", value: "600-800" },
    { label: "$800 - $1000", value: "800-1000" },
    { label: "$1000 - $3000", value: "1000-3000" },
    { label: "$3000 - $5000", value: "3000-5000" },
    { label: "$5000 - $15000", value: "5000-15000" },
    { label: "$15000 - $30000", value: "15000-30000" },
    { label: "$30000 - $40000", value: "30000-40000" },
];

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
    }, [searchParams]);

    const updateUrlWithFilter = useCallback((paramName, value) => {
        const params = new URLSearchParams(searchParams.toString());

        if (
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
        ) {
            params.delete(paramName);
        } else if (Array.isArray(value)) {
            params.set(paramName, value.join(","));
        } else {
            params.set(paramName, value.toString());
        }

        router.push(`${pathname}?${params.toString()}`);
    }, [pathname, router, searchParams]);

    const toggleInArrayAndUpdateUrl = (value, array, setArray, paramName) => {
        const newArray = array.includes(value)
            ? array.filter((v) => v !== value)
            : [...array, value];
        setArray(newArray);
        updateUrlWithFilter(paramName, newArray);
    };

    const handleRatingChange = (e) => {
        const newValue = e.target.value;
        setMinRating(newValue);
        updateUrlWithFilter("rating", newValue);
    };

    const handleInStockChange = (e) => {
        const newValue = e.target.checked;
        setInStockOnly(newValue);
        updateUrlWithFilter("inStock", newValue ? "1" : null);
    };

    const handleDiscountChange = (e) => {
        const newValue = e.target.checked;
        setDiscountOnly(newValue);
        updateUrlWithFilter("discounted", newValue ? "1" : null);
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSelectedPriceRanges([]);
        setMinRating("");
        setInStockOnly(false);
        setDiscountOnly(false);

        const params = new URLSearchParams(searchParams.toString());
        params.delete("category");
        params.delete("brand");
        params.delete("price");
        params.delete("rating");
        params.delete("inStock");
        params.delete("discounted");

        router.push(`${pathname}?${params.toString()}`);
    };

    const sectionClass =
        "border rounded p-3 space-y-2 h-40 overflow-y-auto bg-white mb-4";
    const titleClass = "font-semibold mb-2 text-[#002AB3]";

    // محتوای فیلترها (دسکتاپ و موبایل)
    const FiltersContent = () => (
        <>
            {(selectedCategories.length > 0 ||
                selectedBrands.length > 0 ||
                selectedPriceRanges.length > 0 ||
                minRating !== "" ||
                inStockOnly ||
                discountOnly) && (
                <div className="flex justify-end mb-2">
                    <button
                        onClick={handleClearFilters}
                        className="px-3 py-1 text-xs bg-[#002AB3] text-white rounded hover:bg-[#0036d1] transition"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* دسته‌بندی */}
            <div className={sectionClass}>
                <h3 className={titleClass}>Category</h3>
                {categories.map((category) => (
                    <label key={category} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() =>
                                toggleInArrayAndUpdateUrl(
                                    category,
                                    selectedCategories,
                                    setSelectedCategories,
                                    "category"
                                )
                            }
                            className="mr-2"
                        />
                        {category}
                    </label>
                ))}
            </div>

            {/* برند */}
            <div className={sectionClass}>
                <h3 className={titleClass}>Brand</h3>
                {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() =>
                                toggleInArrayAndUpdateUrl(
                                    brand,
                                    selectedBrands,
                                    setSelectedBrands,
                                    "brand"
                                )
                            }
                            className="mr-2"
                        />
                        {brand}
                    </label>
                ))}
            </div>

            {/* محدوده قیمت */}
            <div className={sectionClass}>
                <h3 className={titleClass}>Price Range</h3>
                {priceRanges.map((range) => (
                    <label key={range.value} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedPriceRanges.includes(range.value)}
                            onChange={() =>
                                toggleInArrayAndUpdateUrl(
                                    range.value,
                                    selectedPriceRanges,
                                    setSelectedPriceRanges,
                                    "price"
                                )
                            }
                            className="mr-2"
                        />
                        {range.label}
                    </label>
                ))}
            </div>

            {/* امتیاز */}
            <div className="border rounded p-3 bg-white">
                <h3 className={titleClass}>Minimum Rating</h3>
                <select
                    value={minRating}
                    onChange={handleRatingChange}
                    className="border rounded px-2 py-1 w-full text-[#002AB3]"
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
            <div className="border rounded p-3 bg-white space-y-2 mt-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={handleInStockChange}
                        className="mr-2"
                    />
                    In Stock Only
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={discountOnly}
                        onChange={handleDiscountChange}
                        className="mr-2"
                    />
                    Discounted Only
                </label>
            </div>
        </>
    );

    return (
        <aside className="w-full md:w-64 border rounded p-4 space-y-5 text-sm text-[#002AB3] bg-gray-50">
            {/* دکمه نمایش کرکره‌ای فقط در موبایل */}
            <div className="md:hidden mb-3">
                <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="w-full bg-[#002AB3] text-white py-2 rounded"
                    aria-expanded={showMobileFilters}
                    aria-controls="mobile-filters-content"
                >
                    {showMobileFilters ? "Hide Filters" : "Show Filters"}
                </button>
            </div>

            {/* نمایش فیلترها در موبایل به صورت کرکره‌ای */}
            <div
                id="mobile-filters-content"
                className={`md:hidden transition-all duration-300 overflow-hidden ${
                    showMobileFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <FiltersContent />
            </div>

            {/* نمایش فیلترها در دسکتاپ */}
            <div className="hidden md:block">
                <FiltersContent />
            </div>
        </aside>
    );
}
