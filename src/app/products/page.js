import Image from "next/image";

export const metadata = {
  title: "Products | K-SHOP",
  description: "Browse the latest products available on K-SHOP.",
};

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=12");
  const data = await res.json();
  return data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </main>
  );
}
