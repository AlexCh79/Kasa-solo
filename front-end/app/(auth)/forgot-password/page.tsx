import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/Templates/Login/ForgotPasswordForm";

/**
 * Metadata de la page
 */
export const metadata: Metadata = {
  title: "Mot de passe oublié | Kasa",
};

/**
 * Page "Mot de passe oublié"
 */
export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
