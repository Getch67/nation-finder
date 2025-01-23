export function initializeSearch() {
  const searchInput = document.getElementById("search-input");

  document.addEventListener("countriesFetched", (event) => {
    const fetchedCountries = event.detail;

    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase();
      fetchedCountries.forEach(({ card, name }) => {
        card.classList.toggle(
          "hidden",
          !name.toLowerCase().includes(searchValue)
        );
      });
    });
  });
}
