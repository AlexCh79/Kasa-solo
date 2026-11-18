"use server";
import { createProperty } from "@/lib/properties";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/users";
import { updateUser } from "@/lib/users";
import { addImage } from "@/lib/uploads";
import { getText, getFile } from "@/utils/format";

export interface PropertyState {
  error: string | null;
}

/**
 * Server Action gérant l'ajout d'un logement
 */
export default async function propertyAction(
  _prevState: PropertyState,
  formData: FormData,
): Promise<PropertyState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role === "client") redirect("/profile?invite=owner");

  // Récupération des données
  const title = getText(formData, "title");
  const description = getText(formData, "description");
  const location = getText(formData, "location");
  const price = Number(formData.get("price"));
  const hostName = getText(formData, "hostName");
  const hostFile = getFile(formData, "hostCover");
  const coverFile = getFile(formData, "cover");
  const picturesFiles = formData
    .getAll("pictures")
    .filter((file): file is File => file instanceof File && file.size > 0);
  const equipments = formData.getAll("equipments").map(String);
  const tags = formData.getAll("tags").map(String);

  // Vérification des données récupérées
  if (!title) return { error: "Le titre du logement est obligatoire." };
  if (!Number.isInteger(price) || price <= 0) {
    return { error: "Le tarif de la nuitée doit être un nombre entier supérieur à 0." };
  }
  if (!hostName) return { error: "Vous devez renseigner votre nom d'hôte pour continuer." };

  let propertyId: string;
  try {
    // On met à jour le profil utilisateur si le nom et/ou la photo de profil change
    const hostPicture = hostFile ? await addImage(hostFile, "user-picture") : undefined;
    if (hostName !== user.name || hostPicture) {
      await updateUser({ id: user.id, name: hostName, picture: hostPicture, role: user.role });
    }

    // Envoi des images du logement
    const coverUrl = coverFile ? await addImage(coverFile, "property-cover") : undefined;
    const pictureUrls = await Promise.all(
      picturesFiles.map((file) => addImage(file, "property-picture")),
    );

    // Création du logement
    const created = await createProperty({
      title,
      description,
      location,
      pricePerNight: price,
      hostId: user.id,
      cover: coverUrl,
      pictures: coverUrl ? [coverUrl, ...pictureUrls] : pictureUrls,
      equipments,
      tags,
    });
    propertyId = created.id;
  } catch {
    return { error: "Erreur dans l'enregistrement du logement, veuillez réessayer plus tard." };
  }
  redirect(`/properties/${propertyId}`);
}
