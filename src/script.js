import { countryNames } from "./countryNames.js";

const container = document.querySelector(".container");

countryNames.forEach((country) => {
  const ecncodeCountry = encodeURIComponent(country);

  async function fetchCountries() {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${ecncodeCountry}`
      );

      if (!response.ok) {
        throw new Error(`Response status not ok ${response.status}`);
      }
      const countries = await response.json();
      console.log(Object.values(countries[0].name)[0]);
      console.log(countries[0].population);
      console.log(countries[0].region);
      console.log(countries[0].subregion);
      console.log(countries[0].capital[0]);
      console.log(countries[0].tld[0]);
      console.log(Object.values(countries[0].currencies)[0].name);
      console.log(Object.values(countries[0].languages)[0]);
      console.log(countries[0].borders);
      console.log(Object.values(countries[0].flags));

      const cName = Object.values(countries[0].name)[0];
      const cPopln = countries[0].population.toLocaleString();
      const cRegion = countries[0].region;
      const cCapital = countries[0].capital[0];
      const cSubRegion = countries[0].subregion;
      const cTLD = countries[0].tld[0];
      const cCurrencies = Object.values(countries[0].currencies)[0].name;
      const cLanguages = Object.values(countries[0].languages)[0];
      const cBorders = countries[0].borders;
      const cFlags = Object.values(countries[0].flags);

      const card = document.createElement("div");
      card.setAttribute(
        "class",
        "bg-elementBg h-72 flex-col shadow-md rounded overflow-hidden cursor-pointer transition-transform ease-in-out duration-700 hover:scale-105"
      );
      card.innerHTML = ` <img src="${
        Object.values(countries[0].flags)[0]
      }" alt="" class="w-full h-1/2 object-cover">
        <div class="flex-col w-full p-6">
            <h3 class="font-bold text-mxl mb-2">${cName}</h3>
            <p class="text-sm"><span class="font-medium">Population:</span> ${cPopln}</p>
            <p class="text-sm"><span class="font-medium">Region:</span> ${cRegion}</p>
            <p class="text-sm"><span class="font-medium">Capital:</span> ${cCapital}</p>
        </div>`;
      container.appendChild(card);
    } catch (error) {
      console.log(`There's error, ${error}`);
    }
  }
  fetchCountries();
});

// filter options
const options = document.querySelector(".dropdown-options");
const dropdown = document.querySelector(".dropdown-selected");
const caretIcon = document.querySelector(".caret");

dropdown.addEventListener("click", function () {
  options.style.display = options.style.display === "block" ? "none" : "block";
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
    dropdown.textContent = this.textContent;
    options.classList.add("hidden");
  });
});
// hide options
window.addEventListener("click", () => {
  console.log("tttttttesssssssett");
});
