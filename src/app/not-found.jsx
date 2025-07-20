import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | K-SHOP",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3F4F6] px-4 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-40 h-40 mb-6 text-[#002AB3]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9 10h.01M15 10h.01" />
        <path d="M8 15c1.5-1 6-1 8 0" />
      </svg>

      <h1 className="text-4xl font-bold text-[#002AB3] mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#002AB3] text-white px-4 py-2 rounded hover:bg-[#72b7f2] transition"
      >
        Back to Homepage
      </Link>
    </div>
  );
}