import type { Metadata } from "next";
import PropertiesPage from "@/components/Templates/PropertiesPage/PropertiesPage";

export const metadata: Metadata = {
  title: "Nos logements | Kasa",
};

/**
 * Page des logements du site
 */
export default function Properties() {
  return <PropertiesPage />;
}
