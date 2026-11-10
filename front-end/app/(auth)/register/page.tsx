import type { Metadata } from "next";
import RegisterForm from "@/components/Templates/Register/RegisterForm";

export const metadata: Metadata = {
  title: "Inscription | Kasa",
};

/**
 * Page d'inscription d'un nouvel utilisateur
 */
export default function Register() {
  return <RegisterForm />;
}
