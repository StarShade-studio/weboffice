# Starshade Studio — portfolio

Professional single-page portfolio for **Starshade Studio**, built with **HTML5**, **CSS**, and **vanilla JavaScript**. Animations use [GSAP](https://greensock.com/gsap/) (hero + scroll-linked motion) and [AOS](https://michalsnik.github.io/aos/) (section reveals). The site includes a **light/dark** theme toggle with optional persistence in `localStorage`.

## Run locally

Open `index.html` in a browser, or serve the folder with any static server, for example:

```bash
npx serve .
```

## Customize

- **Copy & structure:** `index.html`
- **Layout & themes:** `assets/css/portfolio.css` (CSS custom properties under `:root` and `[data-theme="light"]`)
- **Theme, nav, form, animation wiring:** `assets/js/portfolio.js`
- **Social links:** replace `#` placeholders for Instagram and LinkedIn in the footer.

## License

Project code is licensed under the MIT License — see `LICENSE`.
