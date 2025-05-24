import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/Pagination";

export const metadata = {
  title: "Products | K-SHOP",
  description: "Browse the latest products available on K-SHOP.",
};

async function getProducts(page) {
  const limit = 12;
  const skip = (page - 1) * limit;
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const data = await res.json();
  return data;
}

export default async function ProductsPage({ params }) {
  const currentPage = parseInt(params.page, 10);
  const data = await getProducts(currentPage);
  const products = data.products;

  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-[#002AB3] mb-6 text-center">
        Our Products
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {products.map((product, index) => (
          <Link href={`/products/${product.id}`} className="block w-full h-full">
            <div
              key={product.id}
              className="border rounded-lg p-3 md:p-4 flex flex-col items-center bg-white hover:shadow-md transition"
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={200}
                height={200}
                priority={index === 0}
                className="object-contain rounded-md"
              />
              <h2 className="mt-3 text-center text-sm font-semibold text-[#002AB3]">
                {product.title}
              </h2>
              <p className="text-green-700 font-bold mt-1">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.total / 12)}
      />
    </main>
  );
}
