import { redirect } from "next/navigation";

export default function RedirectToFirstPage() {
  redirect("/products/page/1");
}