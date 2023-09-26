import { log, error, debug } from "../../../../repo/js/libs/logger.js";

function initGallerySlider(selector) {
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
			loop: true,
			autoplay: {
				delay: 5000,
			}
		});
	}
}

export default function initSliders() {
	initGallerySlider("#gallery-slider");
}