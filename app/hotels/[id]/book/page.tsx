import { NO_INDEX } from "@/lib/seo";
import { notFound } from "next/navigation";
import { StayCheckout } from "@/components/stays/stay-checkout";
import { getStay } from "@/lib/liteapi";

export const metadata = {
  title: "Book your stay",
  ...NO_INDEX,
};

export default async function StayBookPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ offer?: string }>;
}) {
  const { id } = await params;
  const { offer } = await searchParams;
  if (!getStay(id)) notFound();
  return <StayCheckout hotelId={id} offerId={offer} />;
}
