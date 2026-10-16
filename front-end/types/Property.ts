/**
 * Type : propriétaire du logement
 */
export interface PropertyHost {
  id: number;
  name: string;
  picture: string | null;
}

/**
 * Type propriété (données de base sans détail)
 */
export interface PropertyBase {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover: string | null;
  location: string | null;
  pricePerNight: number;
  ratingAvg: number;
  ratingCount: number;
  host: PropertyHost;
}

/**
 * Type : détail d'une propriété
 */
export interface PropertyDetail extends PropertyBase {
  pictures: string[];
  equipments: string[];
  tags: string[];
}

/**
 * Type : Création d'une propriété
 */
export interface PropertyCreate {
  id?: string;
  title: string;
  description?: string;
  cover?: string;
  location?: string;
  pricePerNight?: number;
  hostId?: number;
  host?: Omit<PropertyHost, "id">;
  pictures?: string[];
  equipments?: string[];
  tags?: string[];
}

/**
 * Type : Mise à jour d'une propriété
 */
export interface PropertyUpdate {
  title?: string;
  description?: string;
  cover?: string;
  location?: string;
  hostId?: number;
  pricePerNight?: number;
}
