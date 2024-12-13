const section = document.getElementById("section");
const borders = [];

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
    const cNativeNames = Object.values(country[0].name.nativeName);
    const cPopln = country[0].population.toLocaleString();
    const cRegion = country[0].region;
    const cCapital = country[0].capital[0];
    const cSubRegion = country[0].subregion;
    const cTLD = country[0].tld[0];
    const cCurrencies = Object.values(country[0].currencies)[0].name;
    const cLanguages = Object.values(country[0].languages).join(", ");
    const cBorders = country[0].borders;
    const cFlags = Object.values(country[0].flags);
    //
    const cNativeNamesArray = [];
    cNativeNames.map((na) => {
      cNativeNamesArray.push(na.common);
    });

    // Fetch data for each border country.
    let borderCountriesDisplay;

    if (cBorders === undefined) {
      borderCountriesDisplay = "No bordering countries";
    } else {
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
      //
      console.log(borderCountryData);
      //
      const borderCountries = [];
      if (borderCountryData.length > 0) {
        borderCountriesDisplay = borderCountryData
          .map((countryName) => `<div class="borders">${countryName}</div>`)
          .join(" ");
        // borderCountryData.forEach((countryName) => {
        //   const borderCountry = document.createElement("div");
        //   borderCountry.innerHTML = `${countryName}`;
        //   borderCountry.classList.add("borders");
        //   borderCountries.push(borderCountry);
        // });
        console.log(borderCountries);
      }
    }
    section.innerHTML = `<div class="flex flex-col lg:flex-row xl:flex-row gap-12 xl:gap-32 xl:items-center">
        <img src="${cFlags[1]}" alt="${
      cFlags[2]
    }" id="flag" class="w-full h-60 object-center md:w-96 xl:w-detailFlag xl:h-detailFlag ">
        <div>
          <h2 id="name" class="text-textColorLight dark:text-textColorDark text-2xl font-extrabold mb-6">${cName}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10 mb-12 leading-loose">
            <div>
              <p class="font-light"><span class="font-semibold">Native Name:</span> ${cNativeNamesArray.join(
                " / "
              )}</p>
              <p class="font-light"><span class="font-semibold">Population:</span> ${cPopln}</p>
              <p class="font-light"><span class="font-semibold">Region:</span> ${cRegion}</p>
              <p class="font-light"><span class="font-semibold">Sub Region:</span> ${cSubRegion}</p>
              <p class="font-light"><span class="font-semibold">Capital:</span> ${cCapital}</p>
            </div>
            <div>
              <p class="font-light"><span class="font-semibold">Top Level Domain:</span> ${cTLD}</p>
              <p class="font-light"><span class="font-semibold">Currencies:</span> ${cCurrencies}</p>
              <p class="font-light"><span class="font-semibold">Languages:</span> ${cLanguages}</p>
            </div>
          </div>
          <div class="flex flex-col xl:flex-row gap-4"><span class="font-semibold text-lg xl:text-base">Border Countries:</span> <div class="flex flex-wrap gap-2">${borderCountriesDisplay}</div> </div>
        </div>
      </div>`;
    const borders = document.querySelectorAll(".borders");
    borders.forEach((border) => {
      border.addEventListener("click", () => {
        localStorage.setItem("name", `${border.textContent}`);
        window.location.href = "../detail.html";
      });
    });
  } catch (error) {
    console.log(`Sorry, ${error}`);
  }
}
const countryName = localStorage.getItem("name");
fetchCountry(countryName);

// back button
const backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", () => {
  if (document.referrer === "") {
    window.location.href = "../index.html";
  } else {
    window.history.back();
  }
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
