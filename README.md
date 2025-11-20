# STUCK — Project Guide

This document provides a clear site map of the HTML structure and explains how to compile and watch the SCSS during development.

## Site Map

- `index.html`
  - Hero: Navbar, headline, subtitle, CTAs
  - Dashboard Overview: desktop/mobile mockup images
  - Clients: trusted brand logos
  - Journeys: AI, Human, Hybrid cards
  - Impact: KPI cards with metrics
  - Services: Owl Carousel of offerings
  - Workflow: 4-step process (Sign Up → Request → Matched → Receive)
  - Case Studies: highlighted projects (e.g., Misk, Qiddiya)
  - Theme Dropdown: toggles site theme
  - Scripts: jQuery, Bootstrap, Owl Carousel, `src/js/main.js`

- `home.html`
  - Secondary page (not fully documented here). Open to add more sections as needed.

- Assets
  - CSS
    - `src/css/main.css` (compiled output)
    - `src/css/vendor/*` (Bootstrap, Owl Carousel)
  - SCSS
    - `src/scss/main.scss` (entry point, imports partials)
    - Partials: `_base.scss`, `_layout.scss`, `_mixins.scss`, `_utilities.scss`, `_variables.scss`, and `components/`
  - JS
    - `src/js/main.js` (site interactions)
    - `src/js/vendor/*` (jQuery, Bootstrap bundle, Owl Carousel)
  - Images & Fonts
    - `src/img/*` and `src/fonts/*`

## SCSS Watch

Run:

```
sass --watch src/scss:src/css
```

This watches the `src/scss` folder and outputs compiled CSS into `src/css`.

## Carousel Initialization

The services carousel is initialized in `index.html` using Owl Carousel:

```
$(".owl-carousel").owlCarousel({
  center: true,
  items: 2,
  loop: true,
  dots: false,
  autoplay: true,
  margin: 15,
  responsive: { 600: { items: 4 } }
});
```

Ensure jQuery and the Owl Carousel scripts are loaded before this block.

## Theme Images & Switching

The site supports light/dark themes and swaps image assets accordingly. Images that should change with theme use `class="theme-image"` and provide `data-dark` and `data-light` sources.

Example:

```
<img
  class="theme-image"
  src="src/img/mockup.png"
  data-dark="src/img/mockup-dark.png"
  data-light="src/img/mockup.png"
  alt="Dashboard mockup"
/>
```

Theme selection is controlled via dropdown items with `data-theme` values (`dark`, `light`, or `system`).

```
<a class="dropdown-item" data-theme="system">System</a>
<a class="dropdown-item" data-theme="light">Light</a>
<a class="dropdown-item" data-theme="dark">Dark</a>
```

- Choosing "Light" sets `<html class="light">` and uses `data-light` images.
- Choosing "Dark" sets `<html class="dark">` and uses `data-dark` images.
- Choosing "System" removes explicit theme classes and follows OS preference.
- Theme choice persists using `localStorage`.

## main.js — Short Description

- Manages theme state on the `<html>` element (`dark`/`light` or system default).
- Persists user choice in `localStorage` and applies it on load.
- Swaps `src` of all `.theme-image` elements based on `data-dark`/`data-light`.
- Saves original image `src` into `data-light` if missing (fallback behavior).
- Listens to OS theme changes (`prefers-color-scheme`) and updates images live.
- Hooks the theme dropdown (`.dropdown-item[data-theme]`) to toggle theme and refresh images.