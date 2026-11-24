import type { Metadata } from "next";
import ResetPasswordForm from "@/components/Templates/Login/ResetPasswordForm";
import Link from "next/link";

/**
 * Metadata de la page
 */
export const metadata: Metadata = {
  title: "Nouveau mot de passe | Kasa",
};

/**
 * Page de réinitialisation du mot de passe
 */
export default async function ResetPassword({ searchParams }: PageProps<"/reset-password">) {
  const { token } = await searchParams;
  const tokenValue = typeof token === "string" ? token : undefined;
  if (!tokenValue) {
    return (
      <div className="error">
        <h1 className="error__subtitle">Ce lien n&apos;est pas valide.</h1>
        <Link href="/forgot-password" className="error__link">
          Faire une nouvelle demande
        </Link>
      </div>
    );
  }

  return <ResetPasswordForm token={tokenValue} />;
}
