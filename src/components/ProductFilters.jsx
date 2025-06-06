// src/components/ProductFilters.jsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

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

    const priceRanges = [
        { label: "$0 - $5000", value: "0-5000" },
        { label: "$5000 - $15000", value: "5000-15000" },
        { label: "$15000 - $30000", value: "15000-30000" },
        { label: "$30000 - $40000", value: "30000-40000" },
    ];

    const toggleInArray = (value, array, setArray) => {
        setArray(
            array.includes(value)
                ? array.filter((v) => v !== value)
                : [...array, value]
        );
    };

    // خواندن فیلترها از URL هنگام لود
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
    }, [searchParams]); // <-- searchParams را به وابستگی‌ها اضافه کنید


    // بروزرسانی URL هنگام تغییر فیلترها
    useEffect(() => {
        // شروع با پارامترهای جستجوی موجود در URL
        const params = new URLSearchParams(searchParams.toString()); // <-- تغییر اصلی اینجا است

        // بروزرسانی یا حذف پارامترهای فیلتر
        if (selectedCategories.length) {
            params.set("category", selectedCategories.join(","));
        } else {
            params.delete("category"); // اگر فیلتر حذف شد، پارامتر را هم حذف کن
        }

        if (selectedBrands.length) {
            params.set("brand", selectedBrands.join(","));
        } else {
             params.delete("brand"); // اگر فیلتر حذف شد، پارامتر را هم حذف کن
        }

        if (selectedPriceRanges.length) {
            params.set("price", selectedPriceRanges.join(","));
        } else {
             params.delete("price"); // اگر فیلتر حذف شد، پارامتر را هم حذف کن
        }

        if (inStockOnly) {
            params.set("inStock", "1");
        } else {
             params.delete("inStock"); // اگر فیلتر حذف شد، پارامتر را هم حذف کن
        }

        if (discountOnly) {
            params.set("discounted", "1");
        } else {
             params.delete("discounted"); // اگر فیلتر حذف شد، پارامتر را هم حذف کن
        }

        if (minRating) {
            params.set("rating", minRating);
        } else {
             params.delete("rating"); // اگر فیلتر حذف شد، پارامتر را هم حذف کن
        }

        // به روزرسانی URL با حفظ pathname (شماره صفحه) و پارامترهای موجود + فیلترهای جدید
        router.push(`${pathname}?${params.toString()}`);
    }, [
        selectedCategories,
        selectedBrands,
        selectedPriceRanges,
        minRating,
        inStockOnly,
        discountOnly,
        pathname, // <-- pathname را به وابستگی‌ها اضافه کنید
        router, // <-- router را به وابستگی‌ها اضافه کنید (توصیه می‌شود)
        searchParams // <-- searchParams را به وابستگی‌ها اضافه کنید
    ]);

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
                                toggleInArray(category, selectedCategories, setSelectedCategories)
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
                                toggleInArray(brand, selectedBrands, setSelectedBrands)
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
                                toggleInArray(range.value, selectedPriceRanges, setSelectedPriceRanges)
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
                    onChange={(e) => setMinRating(e.target.value)}
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
                        onChange={() => setInStockOnly(!inStockOnly)}
                        className="mr-2"
                    />
                    In Stock Only
                </label>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={discountOnly}
                        onChange={() => setDiscountOnly(!discountOnly)}
                        className="mr-2"
                    />
                    Discounted Only
                </label>
            </div>
        </aside>
    );
}