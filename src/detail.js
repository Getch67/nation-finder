const section = document.getElementById("section");

async function fetchCountry(country) {
  const encodedCountry = encodeURIComponent(country);
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodedCountry}`
    );

    if (!response.ok) {
      throw new Error(`Response status not ok ${response.status}`);
    }

    const country = await response.json();
    const cName = Object.values(country[0].name)[0];
    const cNativeName = country[0].name.nativeName;
    const cPopln = country[0].population.toLocaleString();
    const cRegion = country[0].region;
    const cCapital = country[0].capital[0];
    const cSubRegion = country[0].subregion;
    const cTLD = country[0].tld[0];
    const cCurrencies = Object.values(country[0].currencies)[0].name;
    const cLanguages = Object.values(country[0].languages)[0];
    const cBorders = country[0].borders;
    const cFlags = Object.values(country[0].flags);
    console.log(cNativeName);
    console.log(country[0].languages);
    console.log(cBorders);
    console.log(country[0]);

    // Fetch data for each border country.
    const borderCountryData = await Promise.all(
      cBorders.map(async (borderCountryCode) => {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${borderCountryCode}`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching border country: ${borderCountryCode}`
          );
        }
        const borderCountry = await response.json();
        const borderCountryName = Object.values(borderCountry[0].name)[0];
        return borderCountryName;
      })
    );

    // Create a string for border countries or display a message if there are none.
    let borderCountriesDisplay = "No bordering countries";
    if (borderCountryData.length > 0) {
      // Create a styled list of border countries without commas.
      borderCountriesDisplay = borderCountryData
        .map(
          (countryName) =>
            `<div class="bg-elementBgLight dark:bg-elementBgDark w-28 h-8 flex items-center justify-center mr-2 rounded shadow-custom">${countryName}</div>`
        )
        .join(" "); // Use a space instead of a comma to separate the names.
    }

    section.innerHTML = `<div class="flex flex-col lg:flex-row xl:flex-row gap-12 xl:gap-32 xl:items-center">
        <img src="${cFlags[1]}" alt="${cFlags[2]}" id="flag" class="w-full h-60 object-center md:w-96 xl:w-detailFlag xl:h-detailFlag ">
        <div>
          <h2 id="name" class="text-textColorLight dark:text-textColorDark text-2xl font-extrabold mb-6">${cName}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10 mb-12 leading-loose">
            <div>
              <p><span>Native Name:</span></p>
              <p><span>Population:</span> ${cPopln}</p>
              <p><span>Region:</span> ${cRegion}</p>
              <p><span>Sub Region:</span> ${cSubRegion}</p>
              <p><span>Capital:</span> ${cCapital}</p>
            </div>
            <div>
              <p><span>Top Level Domain:</span> ${cTLD}</p>
              <p><span>Currencies:</span> ${cCurrencies}</p>
              <p><span>Languages:</span></p>
            </div>
          </div>
          <div class="flex gap-4">Border Countries: <div class="grid grid-cols-3 gap-2">${borderCountriesDisplay}</div> </div>
        </div>
      </div>`;
  } catch (error) {
    console.log(`Sorry, ${error}`);
  }
}
fetchCountry("ethiopia");
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
