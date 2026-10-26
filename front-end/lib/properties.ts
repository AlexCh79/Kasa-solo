import { fetchApi } from "./api";
import type {
  PropertyBase,
  PropertyCreate,
  PropertyDetail,
  PropertyUpdate,
  PropertyHost,
} from "@/types/Property";

/**
 * Logement tel que renvoyé par l'API (snake_case)
 */
export interface ApiProperty {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover: string | null;
  location: string | null;
  price_per_night: number;
  rating_avg: number;
  ratings_count: number;
  host: PropertyHost;
}

/**
 * Logement avec son détail tel que renvoyé par l'API
 */
interface ApiPropertyDetail extends ApiProperty {
  pictures: string[];
  equipments: string[];
  tags: string[];
}

/**
 * Conversion des données API (snake_case) en version camelCase
 */
export function toProperty({
  price_per_night,
  rating_avg,
  ratings_count,
  ...rest
}: ApiProperty): PropertyBase {
  return {
    ...rest,
    pricePerNight: price_per_night,
    ratingAvg: rating_avg,
    ratingCount: ratings_count,
  };
}

/**
 * Conversion des données de détail de logement API (snake_case) en version camelCase
 */
function toPropertyDetail(api: ApiPropertyDetail): PropertyDetail {
  return {
    ...toProperty(api),
    pictures: api.pictures,
    equipments: api.equipments,
    tags: api.tags,
  };
}

/**
 * Conversion des données en camelCase vers le snake_case (type de données API)
 */
function toApi({ pricePerNight, hostId, ...rest }: PropertyUpdate) {
  return {
    ...rest,
    price_per_night: pricePerNight,
    host_id: hostId,
  };
}

/**
 * Liste de toutes les propriétés enregistrées
 * @returns liste des propriétés
 */
export async function getProperties(): Promise<PropertyBase[]> {
  const response: ApiProperty[] = await fetchApi("/api/properties");
  return response.map(toProperty);
}

/**
 * Création d'une nouvelle propriété
 * @param data - Données du formulaire de création de la propriété
 * @returns une nouvelle propriété créée
 */
export async function createProperty(data: PropertyCreate): Promise<PropertyDetail> {
  const response: ApiPropertyDetail = await fetchApi("/api/properties", {
    method: "POST",
    body: JSON.stringify(toApi(data)),
  });

  return toPropertyDetail(response);
}

/**
 * Récupération d'une propriété en particulier
 * @param id - id du logement à récupérer
 * @returns la propriété recherchée
 */
export async function getPropertyById(id: string): Promise<PropertyDetail> {
  const response: ApiPropertyDetail = await fetchApi(`/api/properties/${id}`);
  return toPropertyDetail(response);
}

/**
 * Mise à jour d'une propriété
 * @param id - id du logement à mettre à jour
 * @param data - données du formulaire de mise à jour d'une propriété
 * @returns le détail de la propriété mise à jour
 */
export async function updateProperty(id: string, data: PropertyUpdate): Promise<PropertyDetail> {
  const response: ApiPropertyDetail = await fetchApi(`/api/properties/${id}`, {
    method: "PATCH",
    body: JSON.stringify(toApi(data)),
  });
  return toPropertyDetail(response);
}

/**
 * Suppression d'une propriété
 * @param id - id du logement à supprimer
 */
export async function deleteProperty(id: string) {
  await fetchApi(`/api/properties/${id}`, {
    method: "DELETE",
  });
}
