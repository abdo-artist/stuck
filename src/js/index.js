// Owl Carousel (services scroller)
// - center: true → highlights the middle item
// - items: 2 → base items per view (mobile-first)
// - loop: true, autoplay: true → continuous auto-scrolling
// - margin: 15 → spacing between cards
// - responsive: {600: {items: 4}} → 4 items on ≥600px widths
function initOwl(lang) {
  const owl = $(".owl-carousel");

  if (!owl.length) return;

  try {
    owl.owlCarousel("destroy");
  } catch (e) {}

  owl.owlCarousel({
    center: true,
    items: 2,
    loop: true,
    dots: false,
    autoplay: true,
    margin: 15,
    rtl: lang === "ar",
    responsive: {
      768: { items: 4 },
    },
  });
}

window.addEventListener("languageChanged", (e) => {
  initOwl(e.detail); // e.detail = "ar" أو "en"
});

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "en";
  initOwl(savedLang); // شغّل الأويل على حسب اللغة
});

// لما اللغة تتغير بدون Reload
window.addEventListener("languageChanged", (e) => {
  initOwl(e.detail); // e.detail = "ar" أو "en"
});

// Pricing toggle slider
// Moves the gradient slider under the selected toggle button and
// updates the background color depending on the chosen plan.
function initTab(lang) {
  const isRtl = lang == "ar" ? true : false;
  const container = document.getElementById("pricing-toggle");
  const slider = container.querySelector(".slider-bg");
  const buttons = container.querySelectorAll(".toggle-btn");
  const initBtn = isRtl ? buttons[1] : buttons[0];
  // Set initial slider position and width to match the first button
  slider.style.width = initBtn.offsetWidth + "px";
  slider.style.left = initBtn.offsetLeft + "px";

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Compute width/left with padding compensation for visual alignment
      const width = btn.offsetWidth - 16;

      const left = btn.offsetLeft + 8;

      slider.style.width = width + "px";
      slider.style.left = left + "px";

      // Style based on selected value
      if (btn.dataset.value === "monthly") {
        slider.style.background = "#5b5aea";
      } else {
        slider.style.background = "linear-gradient(135deg, #3fb7bf, #5b5aea)";
      }
    });
  });
}
window.addEventListener("languageChanged", (e) => {
  initTab(e.detail); // e.detail = "ar" أو "en"
});
document.addEventListener("DOMContentLoaded", (e) => {
  initTab(e);
});

// Utility: extract initials from a full name (e.g., "Jane Doe" → "JD")
function getInitials(fullName) {
  if (!fullName) return "";

  const words = fullName.trim().split(" "); // split by space
  const firstLetter = words[0][0]; // first letter of first word
  const lastLetter = words[words.length - 1][0]; // first letter of last word

  return (firstLetter + lastLetter).toUpperCase();
}

// Testimonial items source (name/title/description)
const items = [
  {
    name: "Noor Andejani",
    title: "Rumman Life",
    description:
      "Working with STUCK? has transformed our content creation process. Translation is no longer a roadblock, thanks to their expertise and speed. What sets them apart is their ability to deliver translations that go beyond being merely accurate—they truly capture the voice and",
  },
  {
    name: "Yasmine Khoweitar",
    title: "The Majlis",
    description:
      "I'm so happy that I found STUCK?! They get the local market and vocabulary. They're good at catching that nuance. I wouldn't have been able to do the podcast without them for sure.",
  },
  {
    name: "Samar Ibrahim",
    title: "BaSamah Group",
    description:
      "This is my daily go to platform to quickly translate and adjust my announcements, and for heavier content the easy access to trusted human translators/editors gives me time to focus on more important tasks ...",
  },
  {
    name: "Liam O'Reilly",
    title: "BaSamah Group",
    description:
      "The creativity and passion at STUCK?! are contagious. They pushed my project beyond my expectations.",
  },
  {
    name: "Priya Sharma",
    title: "@PriyaCreates",
    description:
      "STUCK? changed the game for me with their high quality content and short turnaround time by blending Al and Human. The team has expedited how efficient we became at producing episodes and the translation is on-point.",
  },
  {
    name: "Saad Bin Waqas",
    title: "Blinkico",
    description:
      "STUCK has been instrumental in localizing our system's wording to align with the expectations of the Saudi market. The UI/UX of their mobile and web apps is incredibly seamless and easy to navigate. Plus, their team is highly responsive with an impressive turnaround",
  },
  {
    name: "Mohamed Islam",
    title: "TheMoShow",
    description:
      "STUCK? changed the game for me with their high quality content and short turnaround time by blending Al and Human. The team has expedited how efficient we became at producing episodes and the translation is on-point.",
  },
  {
    name: "Wedad Abdullah",
    title: "KAUST",
    description:
      "One of the key benefits I've experienced with STUCK? is how it streamlined the translation and copywriting process. Now, I can access high-quality translations quickly and seamlessly, which has saved me significant time and effort.",
  },
];

// Render testimonials using the <template id="item-template">
const testimonialsContainer = document.getElementById("testimonialsContainer");
const template = document.getElementById("item-template");
// Duplicate the list twice to create a longer continuous track
for (let i = 0; i < 2; i++) {
  items.forEach((item) => {
    // Clone template content
    const clone = template.content.cloneNode(true);

    // Populate fields
    clone.querySelector(".avatar").textContent = getInitials(item.name);
    clone.querySelector(".name").textContent = item.name;
    clone.querySelector(".title").textContent = item.title;
    clone.querySelector(".description").textContent = item.description;

    // Append to container
    testimonialsContainer.appendChild(clone);
  });
}
