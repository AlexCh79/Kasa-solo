import type { Metadata } from "next";
import PropertyAdd from "@/components/Templates/PropertyAdd/PropertyAdd";
import { getCurrentUser } from "@/lib/users";
import { redirect } from "next/navigation";

/**
 * Metadata de la page
 */
export const metadata: Metadata = {
  title: "Nouveau logement | Kasa",
};

/**
 * Page d'ajout d'une propriété
 */
export default async function AddProperty() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role === "client") redirect("/profile?invite=owner");

  return <PropertyAdd user={user} />;
}
