export function initializeDropdown() {
  const dropdown = document.querySelector(".dropdown-selected");
  const options = document.querySelector(".dropdown-options");
  const caretIcon = document.querySelector(".caret");
  const currentOption = document.querySelector(".current-option");

  document.addEventListener("countriesFetched", (event) => {
    const fetchedCountries = event.detail;

    dropdown.addEventListener("click", () => {
      options.classList.toggle("hidden");
      caretIcon.classList.toggle("fa-caret-down");
      caretIcon.classList.toggle("fa-caret-up");
    });

    document.querySelectorAll(".option").forEach((option) =>
      option.addEventListener("click", function () {
        currentOption.textContent = this.textContent;
        filterCountries(this.textContent, fetchedCountries);
        options.classList.add("hidden");
        caretIcon.classList.toggle("fa-caret-down");
        caretIcon.classList.toggle("fa-caret-up");
      })
    );
  });
}

function filterCountries(selectedRegion, fetchedCountries) {
  fetchedCountries.forEach(({ card, region }) => {
    card.classList.toggle("hidden", region !== selectedRegion);
  });
}
