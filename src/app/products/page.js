"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsRoot() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    router.replace(`/products/page/1${query ? `?${query}` : ""}`);
  }, []);

  return null;
}
