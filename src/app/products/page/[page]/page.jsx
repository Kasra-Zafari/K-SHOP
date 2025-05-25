import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import SearchClientWrapper from "@/components/SearchClientWrapper";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Products | K-SHOP",
  description: "Browse the latest products available on K-SHOP.",
};

export default async function ProductsPage({ params, searchParams }) {
  const page = +params.page || 1;
  const search = searchParams?.search?.trim().toLowerCase() || "";

  const limit = 12;
  const skip = (page - 1) * limit;

  let products = [];
  let total = 0;

  // If there's a search query (at least 2 characters)
  if (search.length >= 2) {
    const res = await fetch("https://dummyjson.com/products?limit=194");
    const data = await res.json();

    // Filter products by title based on the search query
    const filtered = data.products.filter((product) =>
      product.title.toLowerCase().includes(search)
    );

    total = filtered.length;
    products = filtered.slice(skip, skip + limit);
  } else {
    // Regular fetch when there's no search query
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await res.json();

    products = data.products;
    total = data.total;
  }

  const totalPages = Math.ceil(total / limit);

  // Redirect if page number is invalid
  if (page < 1 || (totalPages > 0 && page > totalPages)) {
  const validPage = Math.min(Math.max(page, 1), totalPages || 1);
  const redirectUrl = search
    ? `/products/page/${validPage}?search=${encodeURIComponent(search)}`
    : `/products/page/${validPage}`;
  redirect(redirectUrl);
}


  // Show message if no products found
  if (total === 0) {
  return (
    <main className="p-4 md:p-6">
      <SearchClientWrapper />
      <p className="mt-6 text-center text-[#002AB3] text-base md:text-lg font-medium">
        No products found matching your search.
      </p>
    </main>
  );
}

  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-[#002AB3] mb-6 text-start">
        Our Products
      </h1>

      <SearchClientWrapper />
      <ProductGrid products={products} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}