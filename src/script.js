import { countryNames } from "./countryNames.js";

const container = document.querySelector(".container");
const fetchedCountries = [];

countryNames.forEach((country) => {
  const encodedCountry = encodeURIComponent(country);

  async function fetchCountries() {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${encodedCountry}`
      );

      if (!response.ok) {
        throw new Error(`Response status not ok ${response.status}`);
      }
      const countries = await response.json();

      const cName = Object.values(countries[0].name)[0];
      const cPopln = countries[0].population.toLocaleString();
      const cRegion = countries[0].region;
      const cCapital = countries[0].capital[0];
      const cFlags = Object.values(countries[0].flags);

      const card = document.createElement("div");
      card.setAttribute(
        "class",
        "card bg-elementBgLight dark:bg-elementBgDark h-72 flex-col shadow-custom rounded overflow-hidden cursor-pointer transition-transform ease-in-out duration-700 hover:scale-105"
      );
      card.innerHTML = ` <img src="${cFlags[1]}" alt="${cFlags[2]}" class="w-full h-2/5 object-cover">
        <div class="flex-col w-full p-6">
            <h3 class="font-bold text-mxl mb-3">${cName}</h3>
            <p class="text-sm leading-relaxed font-light"><span class="font-semibold">Population:</span> ${cPopln}</p>
            <p class="text-sm leading-relaxed font-light"><span class="font-semibold">Region:</span> ${cRegion}</p>
            <p class="text-sm leading-relaxed font-light"><span class="font-semibold">Capital:</span> ${cCapital}</p>
        </div>`;
      card.addEventListener("click", () => {
        window.location.href = "../detail.html";
        localStorage.setItem("name", `${cName}`);
      });
      container.appendChild(card);
      fetchedCountries.push({ card, region: cRegion, name: cName });
    } catch (error) {
      console.log(`Sorry, ${error}`);
    }
  }
  fetchCountries();
});

// filter options
const options = document.querySelector(".dropdown-options");
const currentOption = document.querySelector(".current-option");
const dropdown = document.querySelector(".dropdown-selected");
const caretIcon = document.querySelector(".caret");

dropdown.addEventListener("click", function () {
  options.classList.toggle("hidden");
  if (caretIcon.classList.contains("fa-caret-down")) {
    caretIcon.classList.remove("fa-caret-down");
    caretIcon.classList.add("fa-caret-up");
  } else {
    caretIcon.classList.remove("fa-caret-up");
    caretIcon.classList.add("fa-caret-down");
  }
});

document.querySelectorAll(".option").forEach(function (option) {
  option.addEventListener("click", function () {
    currentOption.textContent = this.textContent;
    filterCountries(this.textContent);
    options.classList.add("hidden");
    caretIcon.classList.remove("fa-caret-up");
    caretIcon.classList.add("fa-caret-down");
  });
});

function filterCountries(selectedRegion) {
  fetchedCountries.forEach(({ card, region: cardRegion }) => {
    if (cardRegion !== selectedRegion) {
      card.classList.add("hidden");
    } else {
      card.classList.remove("hidden");
    }
  });
}
document.addEventListener("click", (e) => {
  if (!options.contains(e.target) && !dropdown.contains(e.target)) {
    options.classList.add("hidden");
    caretIcon.classList.remove("fa-caret-up");
    caretIcon.classList.add("fa-caret-down");
  }
});

// Search functionality
const searchInput = document.getElementById("search-input");
searchInput.oninput = function () {
  searchCountries(searchInput.value);
};

function searchCountries(searchValue) {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  fetchedCountries.forEach(({ card, name: cardName }) => {
    if (cardName.toLowerCase().includes(lowerCaseSearchValue)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

// detail page link
fetchedCountries.forEach(({ card, name }) => {
  card.addEventListener("click", () => {
    window.location.href = "../detail.html";
    console.log("first");
  });
});

// theme toggle
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeName = document.querySelector(".theme-name");

const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

function themeCheck() {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    themeName.textContent = "Dark Mode";
    return;
  }
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
  themeName.textContent = "Light Mode";
}

function changeTheme() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    themeName.textContent = "Light Mode";
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  themeName.textContent = "Dark Mode";
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
}

themeToggle.addEventListener("click", changeTheme);

themeCheck();
