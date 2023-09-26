import "../../../repo/components/drawers/index.js";
import { initPortals } from "../../../repo/js/libs/portals.js";
import { isMobile } from "../../../repo/js/libs/utils.js";
import { trackFocus } from "../../../repo/js/libs/input-service-classes.js";
import { log, error, debug } from "../../../repo/js/libs/logger.js";
import { initCallbackRequestForm } from "../shared/initCallbackRequestForm.js";
import { initIntersectionAnimations } from "../../../repo/js/libs/initIntersectionAnimations.js";


window.addEventListener("DOMContentLoaded", onLoaded);

function onLoaded() {
	try {
		initPortals();
		drawers.init();
		trackFocus();
		initCloseDrawersOnResize();
		initMarkOnScroll();
		addIsMobileClass();
		initCallbackRequestForm("footer-callback-request-form");
		initIntersectionAnimations();
		initCallbackRequestBtns();
		initMainMenuAutoclose();
		//initFooterCallbackRequestBtn();
	} catch (ex) {
		error(ex);
	}
}
function addIsMobileClass() {
	if (isMobile.any()) {
		document.documentElement.classList.add("is-mobile");
	}
}
function initCloseDrawersOnResize() {
	const close = ({ matches }) => {
		drawers.get("main-menu").close();
	}
	const mediaMatch = window.matchMedia("(max-width: 1400px)");
	mediaMatch.addListener(close);
}
function initMarkOnScroll() {
	document.addEventListener("scroll", () => {
		if (window.scrollY > 80) {
			document.documentElement.classList.add("scroll-80-plus");
		} else {
			document.documentElement.classList.remove("scroll-80-plus");
		}
	});
}
function initCallbackRequestBtns() {
	const formFirstFieldElem = document.forms["callback-request"].name;
	const elems = document.querySelectorAll("[data-callback-request-btn]");
	elems.forEach(elem => {
		elem.addEventListener("click", (event) => {
			event.preventDefault();
			formFirstFieldElem.focus();
		});
	})
}
// function initFooterCallbackRequestBtn() {
// 	const $elem = $("#footer-callback-request-btn");
// 	const $capElem = $elem.children(".btn__cap");
// 	const defaultText = $capElem.text();
// 	const adaptiveText = $capElem.attr("data-tablet-text");
// 	const mediaMatch = matchMedia("(min-width: 1024.1px) and (max-width: 1400px)");
// 	const matchHandler = ({ matches }) => {
// 		if (matches) {
// 			$capElem.text(adaptiveText);
// 		} else {
// 			$capElem.text(defaultText);
// 		}
// 	}
// 	mediaMatch.addListener(matchHandler);
// 	matchHandler(mediaMatch);
// }

function initMainMenuAutoclose() {
	const elem = document.querySelector("[data-drawer='main-menu']");
	elem.addEventListener("click", ({ target }) => {
		if (target.closest(".ative-item, .btn") || target.classList.contains("ative-item") || target.classList.contains("btn")) {
			drawers.close("main-menu");
		}
	});
}