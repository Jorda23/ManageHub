import { notFound } from "next/navigation";
import { PointOfSaleWorkspace } from "@/components/PointOfSale";

type PointOfSalePageProps = {
  params: Promise<{ module: string }>;
};

export default async function PointOfSaleModulePage({ params }: PointOfSalePageProps) {
  const { module } = await params;
  if (module !== "hardware" && module !== "grains") notFound();
  return <PointOfSaleWorkspace module={module} />;
}
