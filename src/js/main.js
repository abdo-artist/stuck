function updateDarkImages() {
  const html = document.documentElement;

  const isDark = html.classList.contains("dark");
  const isLight = html.classList.contains("light");

  // If neither class is set, fallback to system preference
  const finalIsDark =
    isDark ||
    (!isDark &&
      !isLight &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const finalIsLight =
    isLight ||
    (!isDark &&
      !isLight &&
      window.matchMedia("(prefers-color-scheme: light)").matches);

  console.log([finalIsLight, finalIsDark]);
  const icon = document.getElementById("currentTheme");
  if (!icon) return;

  if (finalIsDark) icon.className = "bx bx-moon h5 m-0";
  else icon.className = "bx bx-sun h5 m-0";

  document.querySelectorAll(".theme-image").forEach((pic) => {
    const img = pic;
    if (!img) return;

    if (finalIsDark && pic.dataset.dark) {
      img.src = pic.dataset.dark;
    } else if (finalIsLight && pic.dataset.light) {
      img.src = pic.dataset.light;
    } else {
      img.src = img.dataset.light || img.src;
    }
  });
}

// Save original src for fallback
document.querySelectorAll(".theme-image").forEach((img) => {
  if (!img.dataset.light) img.dataset.light = img.src;
});

// Apply theme from localStorage if exists
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") {
  document.documentElement.classList.add(savedTheme);
} else {
  // system/default
  document.documentElement.classList.remove("dark", "light");
}

// Initial run
updateDarkImages();

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateDarkImages);
window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", updateDarkImages);

// Dropdown to select theme
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const theme = item.dataset.theme;
    const html = document.documentElement;

    // Remove any existing theme classes
    html.classList.remove("dark", "light");

    if (theme === "dark") {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      html.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      // system
      localStorage.removeItem("theme");
    }

    updateDarkImages();
  });
});
document.querySelectorAll('[data-bs-toggle="popover"]').forEach((el, index) => {
  let pop = new bootstrap.Popover(el);
  el.classList.contains("show") && pop.show();
});

document.addEventListener("DOMContentLoaded", () => {
  const langLinks = document.querySelectorAll(".dropdown-item[data-lang]");
  const html = document.documentElement;
  const langSpan = document.getElementById("current-lang");
  const bootstrapLink = document.getElementById("bootstrap-link");

  // Load saved language
  const savedLang = localStorage.getItem("lang");
  if (typeof initOwl === "function") {
    initOwl(savedLang);
  }
  if (savedLang) {
    applyLanguage(savedLang);
  }

  // Handle click selection
  langLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = e.target.dataset.lang;

      applyLanguage(lang);

      localStorage.setItem("lang", lang);
      window.dispatchEvent(
        new CustomEvent("languageChanged", { detail: lang })
      );
    });
  });

  function applyLanguage(lang) {
    if (lang === "ar") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");

      langSpan.textContent = "العربية";

      // Add ar-text class
      langSpan.classList.add("ar-text");

      // Change Bootstrap file to RTL version
      bootstrapLink.href = "./src/css/vendor/bootstrap.rtl.min.css";
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");

      langSpan.textContent = "English";

      // Remove ar-text class
      langSpan.classList.remove("ar-text");

      // Switch back to normal Bootstrap
      bootstrapLink.href = "./src/css/vendor/bootstrap.min.css";
    }
  }
});
