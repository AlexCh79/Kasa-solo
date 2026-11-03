import type { Metadata } from "next";
import { getProperties } from "@/lib/properties";
import FavoritesList from "@/components/Templates/FavoritesList/FavoritesList";

/**
 * Metadata de la page
 */
export const metadata: Metadata = {
  title: "Favoris | Kasa",
};

/**
 * Page des favoris
 */
export default async function FavoritesPage() {
  const list = await getProperties();
  return <FavoritesList properties={list} />;
}
