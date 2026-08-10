import { saleCategories, isSaleCategory, SaleWorkspace } from "@/components/SaleWorkspace";
import { notFound } from "next/navigation";

type SellPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return saleCategories.map((category) => ({ category }));
}

export default async function SellCategoryPage({ params }: SellPageProps) {
  const { category } = await params;

  if (!isSaleCategory(category)) {
    notFound();
  }

  return <SaleWorkspace category={category} />;
}
