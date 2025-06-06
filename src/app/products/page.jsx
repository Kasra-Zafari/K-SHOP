"use client";
import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ProductsRoot() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // فقط اگر مسیر فعلی دقیقا /products هست
    if (pathname === "/products") {
      const query = searchParams.toString();
      router.replace(`/products/page/1${query ? `?${query}` : ""}`);
    }
  }, [pathname, searchParams]);

  return null;
}
