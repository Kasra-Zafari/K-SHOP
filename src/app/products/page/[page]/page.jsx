// src/app/products/[page]/page.jsx

import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import SearchClientWrapper from "@/components/SearchClientWrapper";
import ProductSort from "@/components/ProductSort";
// import ProductFilters from "@/components/ProductFilters";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const metadata = {
  title: "Products | K-SHOP",
  description: "Browse the latest products available on K-SHOP.",
};

export default async function ProductsPage({ params, searchParams }) {
  const page = +params.page || 1;
  const search = searchParams?.search?.trim().toLowerCase() || "";
  const sort = searchParams?.sort || "default";

  const limit = 12;
  const skip = (page - 1) * limit;

  let allProducts = [];
  let data = null;

  try {
    const host = headers().get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch");

    data = await res.json();
    allProducts = data.products;
  } catch (error) {
    console.error("Error fetching products:", error.message);

    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <p className="text-red-600 font-medium text-center">
          ❌ Failed to load product data. Please check your internet connection and try again.
        </p>
      </main>
    );
  }

  // const selectedCategories = searchParams?.category?.split(",") || [];
  // const selectedBrands = searchParams?.brand?.split(",") || [];
  // const minPrice = parseFloat(searchParams?.minPrice || "0");
  // const maxPrice = parseFloat(searchParams?.maxPrice || "1000000");
  // const inStockOnly = searchParams?.inStock === "1";
  // const discountOnly = searchParams?.discounted === "1";
  // const minRating = parseFloat(searchParams?.rating || 0);

  if (search.length >= 2) {
    allProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(search)
    );
  }

  // if (selectedCategories.length) {
  //   allProducts = allProducts.filter((p) =>
  //     selectedCategories.includes(p.category)
  //   );
  // }

  // if (selectedBrands.length) {
  //   allProducts = allProducts.filter((p) =>
  //     selectedBrands.includes(p.brand)
  //   );
  // }

  // allProducts = allProducts.filter(
  //   (p) => p.price >= minPrice && p.price <= maxPrice
  // );

  // if (inStockOnly) {
  //   allProducts = allProducts.filter((p) => p.stock > 0);
  // }

  // if (discountOnly) {
  //   allProducts = allProducts.filter((p) => p.discountPercentage > 0);
  // }

  // if (minRating > 0) {
  //   allProducts = allProducts.filter((p) => p.rating >= minRating);
  // }

  if (sort === "new") {
    allProducts.sort((a, b) => b.id - a.id);
  } else if (sort === "price-low") {
    allProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    allProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "title-asc") {
    allProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "title-desc") {
    allProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  const total = allProducts.length;
  const totalPages = Math.ceil(total / limit);

  if (page < 1 || (totalPages > 0 && page > totalPages)) {
    const validPage = Math.min(Math.max(page, 1), totalPages || 1);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (sort !== "default") params.set("sort", sort);
    if (selectedCategories.length) params.set("category", selectedCategories.join(","));
    if (selectedBrands.length) params.set("brand", selectedBrands.join(","));
    if (inStockOnly) params.set("inStock", "1");
    if (discountOnly) params.set("discounted", "1");
    if (minRating > 0) params.set("rating", minRating.toString());

    redirect(`/products/page/${validPage}?${params.toString()}`);
  }

  const products = allProducts.slice(skip, skip + limit);

  if (total === 0) {
    return (
      <main className="min-h-screen flex flex-col p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#002AB3] mb-6 text-start">
          Our Products
        </h1>
        <SearchClientWrapper />
        <ProductSort />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-center text-[#002AB3] text-base md:text-lg font-medium">
            No products found matching your search and filters.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-[#002AB3] mb-6 text-start">
        Our Products
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* <ProductFilters
          categories={[...new Set(data.products.map((p) => p.category))]}
          brands={[...new Set(data.products.map((p) => p.brand))]}
        /> */}

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <SearchClientWrapper />
            <ProductSort />
          </div>

          <ProductGrid products={products} />
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
