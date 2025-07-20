import { Suspense } from "react";
import ProductsRoot from "./ProductsRoot";

export default function ProductsRedirectPage() {
  return (
    <Suspense fallback={null}>
      <ProductsRoot />
    </Suspense>
  );
}
