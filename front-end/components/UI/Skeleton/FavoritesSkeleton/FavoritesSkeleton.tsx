import { getProperties } from "@/lib/properties";
import FavoritesList from "@/components/Templates/FavoritesList/FavoritesList";

export default async function FavoritesSkeleton() {
  const properties = await getProperties();
  return <FavoritesList properties={properties} />;
}
