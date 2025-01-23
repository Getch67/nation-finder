import { renderCountryCard } from "./country-render";
import { showError } from "./error";

export async function fetchCountries(countryNames) {
  const container = document.querySelector(".container");
  const fetchedCountries = [];
  try {
    const countryData = await Promise.all(
      countryNames.map(async (country) => {
        const encodedCountry = encodeURIComponent(country);
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${encodedCountry}`
        );
        if (!response.ok)
          throw new Error(`Failed to fetch data for ${country}`);
        const countries = await response.json();

        // Find the exact country match from the response
        const countryInfo = countries.find(
          (item) => item.name.common.toLowerCase() === country.toLowerCase()
        );

        if (!countryInfo) {
          throw new Error(`Exact country match not found for "${country}"`);
        }

        return countryInfo;
      })
    );

    countryData.forEach((country) =>
      renderCountryCard(country, container, fetchedCountries)
    );

    document.dispatchEvent(
      new CustomEvent("countriesFetched", { detail: fetchedCountries })
    );
  } catch (error) {
    console.error(error);
    showError(
      container,
      "Failed to load country data. Please try again later."
    );
  }
}
