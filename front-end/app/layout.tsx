import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "@/styles/globals.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kasa",
  description: "Réservez votre prochain séjour dès maintenant",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <FavoritesProvider>
          <a href="#main-content" className="skip-link">
            Aller au contenu principal
          </a>
          <main id="main-content">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
