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
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 flex flex-col items-center hover:shadow transition"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={200}
              height={200}
              priority={index === 0}
              className="object-contain rounded-md"
            />
            <h2 className="mt-2 text-center text-sm font-semibold">{product.title}</h2>
            <p className="text-green-700 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.total / 12)}
      />
    </main>
  );
}
