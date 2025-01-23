export function renderCountryCard(country, container, fetchedCountries) {
  const { name, population, region, capital, flags } = country;
  const cName = Object.values(name)[0];
  const cPopln = population.toLocaleString();
  const cRegion = region;
  const cCapital = capital ? capital[0] : "N/A";
  const cFlags = Object.values(flags);

  const card = document.createElement("div");
  card.className = "country-card";
  card.innerHTML = `
    <img src="${cFlags[1]}" alt="${cFlags[2]}" loading="lazy" class="w-full h-1/2 object-cover">
    <div class="flex-col w-full p-6">
        <h3 class="font-bold text-mxl mb-3">${cName}</h3>
        <p class="text-sm leading-relaxed font-light"><span class="font-semibold">Population:</span> ${cPopln}</p>
        <p class="text-sm leading-relaxed font-light"><span class="font-semibold">Region:</span> ${cRegion}</p>
        <p class="text-sm leading-relaxed font-light"><span class="font-semibold">Capital:</span> ${cCapital}</p>
    </div>`;
  card.addEventListener("click", () => handleCardClick(cName));
  container.appendChild(card);
  fetchedCountries.push({ card, region: cRegion, name: cName });
}

function handleCardClick(cName) {
  window.location.href = "../detail.html";
  localStorage.setItem("selectedCountry", cName);
}
