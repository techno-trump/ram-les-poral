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
function initFiltersSlider() {
	new Swiper("#filters-slider", {
		observer: true,
		resizeObserver: true,
		slidesPerView: "auto",
		grabCursor: true,
		spaceBetween: 30,
	});
}



export default function initSliders() {
	initCardsSlider("#projects-slider");
	//initFiltersSlider();
}