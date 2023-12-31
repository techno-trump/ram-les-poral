export function initInputFocusTracking(root = document) {
	const nodes = root.querySelectorAll("[data-focus-receiver]");
	nodes.forEach((node) => {
		const focusIndicator = node.closest("[data-focus-indicator]");
		if (focusIndicator) {
			node.addEventListener("focus", (e) => {
				focusIndicator.classList.add("focus");
			});
			node.addEventListener("blur", (e) => {
				focusIndicator.classList.remove("focus");
			});
		}
	});
}
export function initInputCheckTracking(root = document) {
	const nodes = root.querySelectorAll("[data-check-receiver]");
	nodes.forEach((node) => {
		const indicator = node.closest("[data-check-indicator]");
		if (indicator) {
			if (node.checked) {
				indicator.classList.add("checked");
			}
			node.addEventListener("change", (e) => {
				if (e.currentTarget.checked) {
					indicator.classList.add("checked");
				} else {
					indicator.classList.remove("checked");
				}
			});
		}
	});
}
export function initRadioCheckTracking(root = document) {
	const elems = root.querySelectorAll("[data-radio]");
	let checked = {};
	elems.forEach((elem) => {
		const indicator = elem.closest("[data-radio-wrapper]");
		const formName = elem.form?.getAttribute("name") || "";
		const name = elem.name;
		if (indicator) {
			if (elem.checked) {
				indicator.classList.add("checked");
				checked[`${formName}__${name}`] = indicator;
			}
			elem.addEventListener("change", (event) => {
				if (event.currentTarget.checked) {
					indicator.classList.add("checked");
					if (checked[`${formName}__${name}`] && checked[`${formName}__${name}`] !== indicator) {
						checked[`${formName}__${name}`].classList.remove("checked");
						checked[`${formName}__${name}`] = indicator;
					}
					checked[`${formName}__${name}`] = indicator;
				} else {
					indicator.classList.remove("checked");
				}
			});
		}
	});
}

export function trackFocus(root = document) {
	const targetElems = root.querySelectorAll("[data-track-child-focus]");
	
	targetElems.forEach((elem) => {
		elem.addEventListener("focusin", (e) => {
			elem.classList.add("_focus");
		});
		elem.addEventListener("focusout", (e) => {
			elem.classList.remove("_focus");
		});
	});
}
export function inputAutoSize() {
	const targetElems = document.querySelectorAll("[data-input-auto-size]");
	
	targetElems.forEach((elem) => {
		const handler = (e) => {
			setTimeout(() => {
				e.target.style.width = "1px";
				requestAnimationFrame(() => {
					e.target.style.width = `${e.target.scrollWidth}px`;
				});
			}, 1);
		};
		elem.addEventListener("blur", handler);
		elem.addEventListener("change", handler);
		elem.addEventListener("input", handler);
		handler({ target: elem });
	});
}