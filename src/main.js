import { themeToggle } from "./theme-function";
import { countryNames } from "./country-names";
import { fetchCountries } from "./country-fetch";
import { initializeDropdown } from "./dropdown";
import { initializeSearch } from "./search";
import { initializeEvents } from "./init-events";

// Initialize functionalities
fetchCountries(countryNames);
themeToggle();
initializeDropdown();
initializeSearch();
initializeEvents();
