export const IMPACT_ART_OPTIONS = [
  { title: "Nations / Globe", value: "nations" },
  { title: "People / Believers", value: "believers" },
  { title: "Baptisms / Water", value: "baptisms" },
  { title: "Bibles", value: "bibles" },
  { title: "Medical Care", value: "medical" },
  { title: "Leaders / Training", value: "leaders" },
] as const;

export type ImpactArtKey = (typeof IMPACT_ART_OPTIONS)[number]["value"];

export const COUNTRY_ART_OPTIONS = [
  { title: "Nepal", value: "nepal", name: "Nepal" },
  { title: "Algeria", value: "algeria", name: "Algeria" },
  { title: "Indonesia", value: "indonesia", name: "Indonesia" },
  { title: "Afghanistan", value: "afghanistan", name: "Afghanistan" },
  { title: "Somalia", value: "somalia", name: "Somalia" },
] as const;

export type CountryArtKey = (typeof COUNTRY_ART_OPTIONS)[number]["value"];
export type CountryArtName = (typeof COUNTRY_ART_OPTIONS)[number]["name"];

export function getCountryArtName(key?: string) {
  return COUNTRY_ART_OPTIONS.find((option) => option.value === key)?.name;
}
