import { Metadata } from "next";
import { getPropertyById } from "@/lib/properties";
import { getSession } from "@/lib/users";
import { notFound, redirect } from "next/navigation";
import RatingAdd from "@/components/Templates/RatingAdd/RatingAdd";
import { ApiError } from "@/lib/api";

/**
 * Génère les metadata de la page en fonction du logement
 * @param params - id du logement
 */
export async function generateMetadata({
  params,
}: PageProps<"/properties/[id]/ratings/add">): Promise<Metadata> {
  const { id } = await params;
  try {
    const property = await getPropertyById(id);
    return {
      title: `Ajouter votre avis sur le logement ${property.title} | Kasa`,
    };
  } catch {
    return { title: "Ajouter votre avis | Kasa" };
  }
}

/**
 * Formulaire d'ajout d'un avis
 * L'utilisateur doit être connecté sinon il est redirigé vers la page de connexion
 */
export default async function AddRating({ params }: PageProps<"/properties/[id]/ratings/add">) {
  const session = await getSession();
  const { id } = await params;
  if (!session) {
    redirect("/login");
  }
  try {
    await getPropertyById(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
  return <RatingAdd propertyId={id} />;
}
