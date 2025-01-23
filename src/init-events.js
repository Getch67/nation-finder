export function initializeEvents() {
  const options = document.querySelector(".dropdown-options");
  const dropdown = document.querySelector(".dropdown-selected");
  const caretIcon = document.querySelector(".caret");

  document.addEventListener("click", (e) => {
    if (!options.contains(e.target) && !dropdown.contains(e.target)) {
      options.classList.add("hidden");
      caretIcon.classList.add("fa-caret-down");
      caretIcon.classList.remove("fa-caret-up");
    }
  });
}
