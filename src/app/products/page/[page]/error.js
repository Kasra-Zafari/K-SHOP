"use client";

export default function Error({ error, reset }) {
  return (
    <div className="p-4 text-red-500">
      <p>Failed to load products. Please try again.</p>
      <button onClick={reset} className="mt-2 underline text-blue-500">
        Retry
      </button>
    </div>
  );
}
