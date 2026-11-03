import HomePage from "@/components/Templates/HomePage";
import type { Metadata } from "next";

/**
 * Metadata de la page
 */
export const metadata: Metadata = {
  title: "Accueil | Kasa",
};

/**
 * Import de la page d'accueil
 */
export default function Home() {
  return <HomePage />;
}
