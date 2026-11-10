import type { Metadata } from "next";
import LoginForm from "@/components/Templates/Login/LoginForm";

export const metadata: Metadata = {
  title: "Connexion | Kasa",
};

export default function Login() {
  return <LoginForm />;
}
