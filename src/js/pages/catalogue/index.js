import initSliders from "./sliders.js";
import { log, error, debug } from "../../../../repo/js/libs/logger.js";
import { inputAutoSize } from "../../../../repo/js/libs/input-service-classes.js";
import { initDoubleRangeSliders } from "../../../../repo/js/libs/double-range-slider.js";

window.addEventListener("DOMContentLoaded", onLoaded);

function onLoaded() {
	initSliders();
	inputAutoSize();
	initDoubleRangeSliders();
	initPriceFormat(document.querySelector("#price-from"));
	initPriceFormat(document.querySelector("#price-to"));
	initFiltersSync();
	initFiltersReset();
}

function initPriceFormat(elem) {
	const cleave = new Cleave(elem, {
		delimiter: ' ',
		numeral: true,
    numeralThousandsGroupStyle: 'thousand'
	});
}
function initFiltersSync() {
	syncCheckboxes(document.querySelectorAll("#main-filter--floors--one, #short-filter--one-floor-houses"));
	syncCheckboxes(document.querySelectorAll("#main-filter--floors--two, #short-filter--two-floors-houses"));
	syncCheckboxes(document.querySelectorAll("#main-filter--guest-houses, #short-filter--guest-houses"));
	function syncCheckboxes(list) {
		const changeHandler = (event) => {
			if (event.__sync) return;
			list.forEach(elem => {
				if (elem === event.target) return;
				elem.checked = event.target.checked;
				emitChangeEvent(elem, true);
			});
		}
		list.forEach(elem => {
			elem.addEventListener("change", changeHandler);
		});
	}
}
function emitChangeEvent(elem, sync = false) {
	const event = new Event("change", { bubbles: true });
	event.__sync = sync;
	elem.dispatchEvent(event);
}
function emitInputEvent(elem, sync = false) {
	const event = new Event("input", { bubbles: true });
	event.__sync = sync;
	elem.dispatchEvent(event);
}
function initFiltersReset() {
	const btnElem = document.querySelector("#main-filter-reset");
	const checkboxes = document.querySelectorAll("form[name='main-filter'] input[type='checkbox']");
	const priceFromElem = document.querySelector("#main-filter--price-from");
	const priceToElel = document.querySelector("#main-filter--price-to");
	const squareFromElem = document.querySelector("#main-filter--square-from");
	const squareToElel = document.querySelector("#main-filter--square-to");
	btnElem.addEventListener("click", (event) => {
		checkboxes.forEach(elem => {
			elem.checked = false;
			emitChangeEvent(elem);
		});
		resetRange(priceFromElem, priceToElel);
		resetRange(squareFromElem, squareToElel)
	});
	function resetRange(fromElem, toElem) {
		fromElem.value = fromElem.getAttribute("min") || 0;
		toElem.value = fromElem.getAttribute("max") || 100;
		emitInputEvent(fromElem);
		emitInputEvent(toElem);
	}
}