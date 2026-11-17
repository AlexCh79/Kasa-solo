import { Metadata } from "next";
import { RatingsPageList } from "@/components/Templates/RatingsPage/RatingsPage";
import { getPropertyById } from "@/lib/properties";

/**
 * Génération des métadatas selon le logement
 */
export async function generateMetadata({
  params,
}: PageProps<"/properties/[id]/ratings">): Promise<Metadata> {
  const { id } = await params;
  try {
    const property = await getPropertyById(id);
    return { title: `Avis sur ${property.title} | Kasa` };
  } catch {
    return { title: "Avis sur le logement | Kasa" };
  }
}

/**
 * Page des avis d'un logement
 */
export default async function RatingsPage({
  params,
  searchParams,
}: PageProps<"/properties/[id]/ratings">) {
  const { id } = await params;
  const { added } = await searchParams;
  const info = added === "1" ? "Merci pour votre avis, il a été pris en compte." : undefined;
  return <RatingsPageList propertyId={id} info={info} />;
}
