import { log, error, debug } from "../../../../repo/js/libs/logger.js";

function initCardsSlider(selector) {
		log("initCardsSlider::selector: ", selector);
	let slider;
	const mediaMatch = matchMedia("(max-width: 575px)");
	const handleMatch = ({ matches }) => {
		if (matches) {
			if (!slider) {
				slider = init();
			}
		} else if (slider && slider.initialized) {
			slider.destroy();
			slider = null;
		}
	};
	mediaMatch.addListener(handleMatch);
	handleMatch(mediaMatch);

	function init() {
		return new Swiper(selector, {
			observer: true,
			resizeObserver: true,
			slidesPerView: 1,
			grabCursor: true,
			autoplay: {
				delay: 5000,
			}
		});
	}
}
function initWelcomeSlider() {
	return new Swiper("#welcome-slider", {
		observer: true,
		resizeObserver: true,
		slidesPerView: 1,
		grabCursor: true,
		loop: true,
		autoplay: {
			delay: 5000,
		},
		navigation: {
			prevEl: "#welcome-slider-btn-prev",
			nextEl: "#welcome-slider-btn-next",
		},
		pagination: {
			el: "#welcome-slider-pagination",
			clickable: true,
		}
	});
}
function initBundlesSlider(selector) {
	new Swiper(selector, {
		observer: true,
		resizeObserver: true,
		slidesPerView: 1,
		grabCursor: true,
		spaceBetween: 40,
		breakpoints: {
			"768": {
				slidesPerView: 2.2,
				spaceBetween: 60,
			},
			"1400": {
				slidesPerView: 3,
				spaceBetween: 20,
			}
		}
	});
}



export default function initSliders() {
	initWelcomeSlider();
	initBundlesSlider("#bundles-slider-under-roof");
	initBundlesSlider("#bundles-slider-under-key");
	initCardsSlider("#popular-slider");
}