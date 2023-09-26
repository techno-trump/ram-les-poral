import { log } from "./logger.js";
import { getTargetElem } from "./utils.js";

export class DoubleRangeSlider {
	constructor(target) {
		this.rootElem = getTargetElem(target);
		if (!this.rootElem) return null;
		this.alias = this.rootElem.getAttribute("data-double-range-slider");
		this.rangeFromElem = this.rootElem.querySelector(".double-range-slider__from");
		this.rangeToElem = this.rootElem.querySelector(".double-range-slider__to");

		const [fromValue, toValue] = getInputValues(this.rangeFromElem, this.rangeToElem);

		this.updateSelection(fromValue, toValue);

		const fromChangeHandler = (e) => {
			const [fromValue, toValue] = getInputValues(this.rangeFromElem, this.rangeToElem);
			if (fromValue > toValue) {
				this.rangeFromElem.value = toValue;
			}
			this.updateSelection(fromValue, toValue);
		}
		const toChangeHandler = (e) => {
			const [fromValue, toValue] = getInputValues(this.rangeFromElem, this.rangeToElem);
			if (toValue < fromValue) {
				this.rangeToElem.value = fromValue;
			}
			this.updateSelection(fromValue, toValue);
		}

		this.rangeFromElem.addEventListener("input", fromChangeHandler);
		this.rangeToElem.addEventListener("input", toChangeHandler);
		this.rangeFromElem.addEventListener("change", fromChangeHandler);
		this.rangeToElem.addEventListener("change", toChangeHandler);

		if (this.rootElem.hasAttribute("data-sync-with-inputs")) {
			this.initSync();
		}
	}
	updateSelection(fromValue, toValue) {
		const [minValue, maxValue] = this.getMinMax();
		const range = maxValue - minValue;
		const posFrom = (fromValue - minValue) / range * 100;
		const posTo = (toValue - minValue) / range * 100;
		this.rangeFromElem.style.setProperty("--selected-from", `${posFrom.toFixed(2)}%`);
		this.rangeFromElem.style.setProperty("--selected-to", `${posTo.toFixed(2)}%`);
	}
	initSync() {
		const inputElems = document.querySelectorAll(`[data-range-input-from="${this.alias}"], [data-range-input-to="${this.alias}"]`);
			log("initSync::inputElems", inputElems);
		if (inputElems.length !== 2) return;
		if (inputElems[0].hasAttribute("data-range-input-from")) {
			this.inputFromElem = inputElems[0];
			this.inputToElem = inputElems[1];
		} else {
			this.inputFromElem = inputElems[1];
			this.inputToElem = inputElems[0];
		}
		const inputFromChangeHandler = (event) => {
			if (!event.__sync) {
				const { target } = event;
				const value = stripNumberFormat(target.value) || "0";
				const [minValue, maxValue] = this.getMinMax();
				const normalizedValue = Math.max(minValue, Math.min(value, parseInt(this.rangeToElem.value, 10)));
				target.value = normalizedValue;
				this.rangeFromElem.value = normalizedValue;
			
				emitEvent(target, "input");
				emitEvent(this.rangeFromElem, "input");
			}
		}
		const inputToChangeHandler = (event) => {
			if (!event.__sync) {
				const { target } = event;
				const value = stripNumberFormat(target.value) || "0";
				const [minValue, maxValue] = this.getMinMax();
				const normalizedValue = Math.min(maxValue, Math.max(value, parseInt(this.rangeFromElem.value, 10)));
				target.value = normalizedValue;
				this.rangeToElem.value = normalizedValue;
			
				emitEvent(target, "input");
				emitEvent(this.rangeToElem, "input");
			}
		}
		const rangeFromChangeHandler = (event) => {
			if (!event.__sync) {
				const { target } = event;
				this.inputFromElem.value = target.value;
			
				emitEvent(this.inputFromElem, "input");
			}
		}
		const rangeToChangeHandler = (event) => {
			if (!event.__sync) {
				const { target } = event;
				this.inputToElem.value = target.value;
			
				emitEvent(this.inputToElem, "input");
			}
		}
		
		this.inputFromElem.value = this.rangeFromElem.value;
		this.inputToElem.value = this.rangeToElem.value;

		emitEvent(this.inputFromElem, "input");
		emitEvent(this.inputToElem, "input");
		
		this.inputFromElem.addEventListener("change", inputFromChangeHandler);
		this.inputToElem.addEventListener("change", inputToChangeHandler);
		this.rangeFromElem.addEventListener("input", rangeFromChangeHandler);
		this.rangeToElem.addEventListener("input", rangeToChangeHandler);
		function emitEvent(elem, type) {
			const event = new Event(type);
			event.__sync = true;
			elem.dispatchEvent(event);
		}
	}
	getMinMax() {
		return [parseInt(this.rangeFromElem.getAttribute("min"), 10) || 0, parseInt(this.rangeFromElem.getAttribute("max"), 10) || 100];
	}
}

export function initDoubleRangeSliders() {
	const rootElems = document.querySelectorAll("[data-double-range-slider]");

	rootElems.forEach(rootElem => {
		new DoubleRangeSlider(rootElem);
	});
}
function getInputValues(elemFrom, elemTo) {
	return [parseInt(elemFrom.value, 10), parseInt(elemTo.value, 10)];
}
function stripNumberFormat(value) {
	return parseInt(value.replace(/[,\.\s]/g, ""), 10);
}