import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Products | K-SHOP",
  description: "Browse the latest products available on K-SHOP.",
};

const LIMIT = 16;

async function getProducts(page) {
  const skip = (page - 1) * LIMIT;
  const res = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`);
  const data = await res.json();
  return {
    products: data.products,
    total: data.total,
  };
}

export default async function ProductsPage({ params }) {
  const page = parseInt(params.page) || 1;
  const { products, total } = await getProducts(page);
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Our Products (Page {page})</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 flex flex-col items-center hover:shadow transition"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={200}
              height={200}
              className="object-contain rounded-md"
            />
            <h2 className="mt-2 text-center text-sm font-semibold">{product.title}</h2>
            <p className="text-green-700 font-bold">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4">
        {page > 1 && (
          <Link
            href={`/products/page/${page - 1}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={`/products/page/${page + 1}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </Link>
        )}
      </div>
    </main>
  );
}
