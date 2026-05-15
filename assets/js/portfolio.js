(function () {
	"use strict";

	var THEME_KEY = "starshade-theme";
	var root = document.documentElement;
	var prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

	function getStoredTheme() {
		try {
			return localStorage.getItem(THEME_KEY);
		} catch (e) {
			return null;
		}
	}

	function applyTheme(theme, persist) {
		var t = theme === "light" ? "light" : "dark";
		root.setAttribute("data-theme", t);
		var toggle = document.querySelector("[data-theme-toggle]");
		if (toggle) {
			toggle.setAttribute("aria-pressed", t === "light" ? "true" : "false");
			toggle.setAttribute("title", t === "light" ? "Switch to dark mode" : "Switch to light mode");
		}
		if (persist) {
			try {
				localStorage.setItem(THEME_KEY, t);
			} catch (e) {
				/* ignore */
			}
		}
		if (typeof AOS !== "undefined") {
			AOS.refresh();
		}
	}

	function initTheme() {
		var stored = getStoredTheme();
		if (stored === "light" || stored === "dark") {
			applyTheme(stored, false);
			return;
		}
		applyTheme(prefersDark.matches ? "dark" : "light", false);
	}

	function toggleTheme() {
		var current = root.getAttribute("data-theme") || "dark";
		applyTheme(current === "dark" ? "light" : "dark", true);
	}

	function initNav() {
		var btn = document.querySelector("[data-nav-toggle]");
		var nav = document.querySelector("[data-nav]");
		if (!btn || !nav) return;

		btn.addEventListener("click", function () {
			var open = nav.classList.toggle("is-open");
			btn.setAttribute("aria-expanded", open ? "true" : "false");
		});

		nav.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", function () {
				nav.classList.remove("is-open");
				btn.setAttribute("aria-expanded", "false");
			});
		});
	}

	function initHeaderShadow() {
		var header = document.querySelector("[data-header]");
		if (!header) return;
		var onScroll = function () {
			header.classList.toggle("is-scrolled", window.scrollY > 8);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
	}

	function initYear() {
		var el = document.querySelector("[data-year]");
		if (el) el.textContent = String(new Date().getFullYear());
	}

	function initForm() {
		var form = document.getElementById("contact-form");
		var note = document.getElementById("form-note");
		if (!form || !note) return;

		form.addEventListener("submit", function (e) {
			e.preventDefault();
			var nameEl = document.getElementById("name");
			var emailEl = document.getElementById("email");
			var messageEl = document.getElementById("message");
			var name = nameEl ? nameEl.value.trim() : "";
			var email = emailEl ? emailEl.value.trim() : "";
			var message = messageEl ? messageEl.value.trim() : "";
			if (!name || !email || !message) {
				note.textContent = "Please fill in all fields.";
				return;
			}
			var subject = encodeURIComponent("Project inquiry from " + name);
			var body = encodeURIComponent(
				"Name: " + name + "\nEmail: " + email + "\n\n" + message
			);
			var mail = "mailto:starshadestudios26@gmail.com?subject=" + subject + "&body=" + body;
			window.location.href = mail;
			note.textContent = "Opening your email app…";
		});
	}

	function prefersReducedMotion() {
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}

	function initAOS() {
		if (typeof AOS === "undefined") return;
		AOS.init({
			duration: 750,
			once: true,
			offset: 60,
			easing: "ease-out-cubic",
			disable: prefersReducedMotion() ? true : false,
		});
	}

	function initGSAP() {
		if (typeof gsap === "undefined") return;
		if (prefersReducedMotion()) return;

		if (typeof ScrollTrigger !== "undefined") {
			gsap.registerPlugin(ScrollTrigger);
		}

		var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
		tl.from("[data-anim='hero-eyebrow']", { opacity: 0, y: 16, duration: 0.5 }, 0)
			.from("[data-anim='hero-title']", { opacity: 0, y: 28, duration: 0.75 }, 0.08)
			.from("[data-anim='hero-lead']", { opacity: 0, y: 20, duration: 0.65 }, 0.18)
			.from("[data-anim='hero-actions']", { opacity: 0, y: 16, duration: 0.55 }, 0.28)
			.from("[data-anim='hero-stats']", { opacity: 0, y: 14, duration: 0.55 }, 0.36)
			.from("[data-anim='hero-panel']", { opacity: 0, y: 32, scale: 0.98, duration: 0.85 }, 0.2);

		var bg = document.querySelector(".hero__bg");
		if (bg && typeof ScrollTrigger !== "undefined") {
			gsap.to(bg, {
				yPercent: 12,
				ease: "none",
				scrollTrigger: {
					trigger: ".hero",
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});
		}
	}

	function initThemeToggle() {
		var btn = document.querySelector("[data-theme-toggle]");
		if (!btn) return;
		btn.addEventListener("click", toggleTheme);
	}

	prefersDark.addEventListener("change", function (e) {
		if (getStoredTheme()) return;
		applyTheme(e.matches ? "dark" : "light", false);
	});

	document.addEventListener("DOMContentLoaded", function () {
		initTheme();
		initThemeToggle();
		initNav();
		initHeaderShadow();
		initYear();
		initForm();
		initAOS();
		initGSAP();
	});
})();
