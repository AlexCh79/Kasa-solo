import type { Metadata } from "next";
import Profile from "@/components/Templates/Profile/Profile";
import { getCurrentUser } from "@/lib/users";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profil | Kasa",
};

export default async function ProfilePage({ searchParams }: PageProps<"/profile">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const { invite } = await searchParams;
  const info =
    invite === "owner" && user.role === "client"
      ? "Pour ajouter un logement, choisissez le rôle Propriétaire ci-dessous, validez, puis reconnectez-vous."
      : undefined;

  return <Profile user={user} info={info} />;
}
