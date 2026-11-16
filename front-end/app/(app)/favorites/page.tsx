import type { Metadata } from "next";
import FavoritesSkeleton from "@/components/UI/Skeleton/FavoritesSkeleton/FavoritesSkeleton";
import PropertyListSkeleton from "@/components/UI/Skeleton/PropertyListSkeleton/PropertyListSkeleton";
import { Suspense } from "react";

/**
 * Metadata de la page
 */
export const metadata: Metadata = {
  title: "Favoris | Kasa",
};

/**
 * Page des favoris
 */
export default function FavoritesPage() {
  return (
    <Suspense fallback={<PropertyListSkeleton />}>
      <FavoritesSkeleton />
    </Suspense>
  );
}
