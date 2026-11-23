import { getProperties } from "@/lib/properties";
import FavoritesList from "@/components/Templates/FavoritesList/FavoritesList";

/**
 * Loader qui charge tous les logements côté serveur avant d'afficher la liste des favoris
 */
export default async function FavoritesSkeleton() {
  const properties = await getProperties();
  return <FavoritesList properties={properties} />;
}
