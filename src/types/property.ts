export type CurrencyType = 'EUR' | 'USD' | 'GBP';
export type PriceFreqType = 'sale' | 'month' | 'week';
export type PropertyType = 'Apartment' | 'Bungalow' | 'Commercial' | 'Detached Villa' | 'Penthouse' | 'Quad House' | 'Semi-Detached' | 'Town House' | 'Townhouse' | 'Villa';
export type EnergyRatingType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'X';

export interface PropertyTitle {
  language: string;
  title: string;
}

export interface PropertyDescription {
  language: string;
  description: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  tags: string[];
}

export interface Property {
  id: string;
  date: string;
  ref: string;
  price: number;
  currency: CurrencyType;
  price_freq: PriceFreqType;
  part_ownership: boolean;
  leasehold: boolean;
  new_build: boolean;
  type: PropertyType;
  town: string;
  province: string;
  costa: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  location_detail: string;
  postal_code: string;
  beds: number;
  baths: number;
  pool: boolean;
  built_area: number;
  plot_area: number;
  terrace_m2: number | null;
  solarium_area_m2: number | null;
  usable_living_area_m2: number | null;
  distance_to_beach_m: number | null;
  energy_rating_consumption: EnergyRatingType | null;
  energy_rating_emissions: EnergyRatingType | null;
  features: string[];
  images: PropertyImage[];
  titles: Record<string, string>;
  descriptions: Record<string, string>;
  created_at: string;
  updated_at: string;
}
