import { fetchApi } from "./api";
import type { PurposeProps } from "@/types/Upload";

/**
 * Typage des images renvoyées par l'API
 */
interface UploadResponse {
  url: string;
  filename?: string;
  size?: number;
  mimetype?: string;
  purpose: PurposeProps | null;
  property_id: string | null;
  instructions?: string;
}

/**
 * Ajout d'une image (en FormData, le back le traite avec multer ensuite)
 * @param file - Fichier de l'image à uploader
 * @param purpose - Usage prévu de l'image (couverture, profil, galerie du logement)
 * @returns URL de l'image enregistrée
 */
export async function addImage(file: File, purpose?: PurposeProps): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  if (purpose) formData.append("purpose", purpose);

  const response: UploadResponse = await fetchApi("/api/uploads/image", {
    method: "POST",
    body: formData,
  });
  return response.url;
}

/**
 * Suppression d'une ou plusieurs images
 * @param urls - URL du ou des fichiers à supprimer listé dans un tableau
 */
export async function deleteImage(urls: string[]) {
  await fetchApi("/api/uploads/images", {
    method: "DELETE",
    body: JSON.stringify({ urls }),
  });
}
