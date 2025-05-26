import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import SearchClientWrapper from "@/components/SearchClientWrapper";
import ProductSort from "@/components/ProductSort";
import { redirect } from "next/navigation";

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

  // Fetch all product data from API
  const res = await fetch("https://dummyjson.com/products?limit=194");
  const data = await res.json();
  allProducts = data.products;

  // Filter products based on search query
  let filtered = allProducts;
  if (search.length >= 2) {
    filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(search)
    );
  }

  // Sort products before pagination
  if (sort === "new") {
    filtered.sort((a, b) => b.id - a.id);
  } else if (sort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "title-asc") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "title-desc") {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);

  // Redirect if page number is out of range
  if (page < 1 || (totalPages > 0 && page > totalPages)) {
    const validPage = Math.min(Math.max(page, 1), totalPages || 1);
    const redirectUrl = `/products/page/${validPage}?${search ? `search=${encodeURIComponent(search)}&` : ""}${sort !== "default" ? `sort=${encodeURIComponent(sort)}` : ""}`;
    redirect(redirectUrl);
  }

  // Get the paginated products for current page
  const products = filtered.slice(skip, skip + limit);

  // Show message if no products were found
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
            No products found matching your search.
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

      {/* Search & Sort side by side on md+, stacked on mobile */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <SearchClientWrapper />
        <ProductSort />
      </div>

      <div className="flex-grow">
        <ProductGrid products={products} />
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}