import type { Metadata } from "next";
import Profile from "@/components/Templates/Profile/Profile";
import { getCurrentUser } from "@/lib/users";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profil | Kasa",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <Profile user={user} />;
}
