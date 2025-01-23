export function themeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");
  const themeName = document.querySelector(".theme-name");

  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function setTheme(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
    themeIcon.classList.toggle("fa-sun", !isDark);
    themeIcon.classList.toggle("fa-moon", isDark);
    themeName.textContent = isDark ? "Dark Mode" : "Light Mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  setTheme(userTheme === "dark" || (!userTheme && systemTheme));

  themeToggle.addEventListener("click", () =>
    setTheme(!document.documentElement.classList.contains("dark"))
  );
}
