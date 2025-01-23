import { themeToggle } from "./theme-function";

themeToggle();

const section = document.getElementById("section");

// Helper function for API request
async function fetchAPI(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${url} - Status: ${response.status}`);
  }
  return response.json();
}

// Helper function to create DOM elements
function createElement(tag, classes = "", content = "") {
  const element = document.createElement(tag);
  if (classes) element.className = classes;
  if (content) element.innerHTML = content;
  return element;
}

// Main function to fetch and display country details
async function fetchCountry(country) {
  const encodedCountry = encodeURIComponent(country);

  try {
    const countryData = await fetchAPI(
      `https://restcountries.com/v3.1/name/${encodedCountry}`
    );

    // Filter out the exact match based on the common name (case insensitive)
    const countryInfo = countryData.find(
      (item) => item.name.common.toLowerCase() === country.toLowerCase()
    );

    if (!countryInfo) {
      throw new Error(`Exact country match not found for "${country}"`);
    }

    // Extracting country details
    const nativeNames = Object.values(countryInfo.name?.nativeName || {}).map(
      (n) => n.common
    );
    const population = countryInfo.population?.toLocaleString() || "Unknown";
    const region = countryInfo.region || "Unknown";
    const subRegion = countryInfo.subregion || "Unknown";
    const capital = countryInfo.capital?.[0] || "N/A";
    const tld = countryInfo.tld?.[0] || "N/A";
    const currencies = Object.values(countryInfo.currencies || {})
      .map((c) => c.name)
      .join(", ");
    const languages = Object.values(countryInfo.languages || {}).join(", ");
    const borders = countryInfo.borders || [];
    const flagImage = countryInfo.flags?.png || "";

    // Fetching border countries details (if any)
    const borderCountries =
      borders.length > 0
        ? await Promise.all(
            borders.map((code) =>
              fetchAPI(`https://restcountries.com/v3.1/alpha/${code}`).then(
                (data) => data[0]?.name?.common || "Unknown"
              )
            )
          )
        : ["No bordering countries"];

    // Generating HTML content
    section.innerHTML = `
      <div class="flex flex-col lg:flex-row gap-12">
        <img src="${flagImage}" alt="Country Flag" class="w-full h-60 object-center md:w-96">
        <div>
          <h2 class="text-2xl font-extrabold mb-6">${
            countryInfo.name.common
          }</h2>
          <div class="grid grid-cols-2 gap-10">
            <div>
              <p><strong>Native Name:</strong> ${nativeNames.join(" / ")}</p>
              <p><strong>Population:</strong> ${population}</p>
              <p><strong>Region:</strong> ${region}</p>
              <p><strong>Sub Region:</strong> ${subRegion}</p>
              <p><strong>Capital:</strong> ${capital}</p>
            </div>
            <div>
              <p><strong>Top Level Domain:</strong> ${tld}</p>
              <p><strong>Currencies:</strong> ${currencies}</p>
              <p><strong>Languages:</strong> ${languages}</p>
            </div>
          </div>
          <div>
            <strong>Border Countries:</strong>
            <div class="flex flex-wrap gap-2">
              ${borderCountries
                .map((name) => `<div class="border-country">${name}</div>`)
                .join("")}
            </div>
          </div>
        </div>
      </div>`;

    // Event listener for border country click
    document.querySelectorAll(".border-country").forEach((el) => {
      el.addEventListener("click", () => {
        localStorage.setItem("selectedCountry", el.textContent);
        window.location.href = "../detail.html";
      });
    });
  } catch (error) {
    console.error(`Error fetching country: ${error.message}`);
    section.innerHTML = `<p>Failed to load country details. Please try again later.</p>`;
  }
}

// Initialize country detail page
const countryName = localStorage.getItem("selectedCountry");
if (countryName) fetchCountry(countryName);

// Back button event listener
document.getElementById("back-btn").addEventListener("click", () => {
  document.referrer
    ? window.history.back()
    : (window.location.href = "../index.html");
});
