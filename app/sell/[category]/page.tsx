import { notFound } from 'next/navigation';
import { SaleWorkspace } from '@/components/SaleWorkspace/SaleWorkspace';
import { saleCategories, type SaleCategory } from '@/components/SaleWorkspace/saleWorkspaceData';

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

  if (!saleCategories.includes(category as SaleCategory)) {
    notFound();
  }

  return <SaleWorkspace category={category as SaleCategory} />;
}
