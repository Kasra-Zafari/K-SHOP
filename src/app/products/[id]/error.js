"use client";

export default function ProductDetailsError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Failed to load product details</h2>
      <p className="text-gray-600 mb-6">
        {"We couldn't fetch the product information. Please try again or check later."}
      </p>
      <button
        onClick={reset}
        className="bg-[#002AB3] text-white px-4 py-2 rounded hover:bg-[#72B7F2] transition"
      >
        Retry
      </button>
    </div>
  );
}