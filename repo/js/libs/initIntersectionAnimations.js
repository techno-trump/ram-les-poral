export function initIntersectionAnimations() {
	const map = new Map();
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
			if (!map.has(target)) return;
			const animatedElem = map.get(target);
			const animationClassesOnEnter = extractAnimationClasses(animatedElem, "data-animate-on-enter");
			const animationClassesOnOut = extractAnimationClasses(animatedElem, "data-animate-on-out");
			if (isIntersecting || boundingClientRect.top < 0) {
				animatedElem.classList.remove(...animationClassesOnOut);
				animatedElem.classList.add(...animationClassesOnEnter);
			} else {
				animatedElem.classList.remove(...animationClassesOnEnter);
				animatedElem.classList.add(...animationClassesOnOut);
			}
		});
	}, {
		rootMargin: "0px",
		threshold: 0.3,
	});
	const targetElems = document.querySelectorAll("[data-animate-on-enter]");
	targetElems.forEach(elem => {
		const intersectionTarget = elem.getAttribute("data-intersection-target");
		if (!intersectionTarget || intersectionTarget === "this") {
			observe(elem);
		} else if(intersectionTarget === "parent") {
			observe(elem.parentElement, elem);
		} else if(intersectionTarget.startsWith("closest:")) {
			const match = intersectionTarget.match(/^closest:\s*(.+)/);
			if (match) {
				const target = elem.closest(match[1]);
				if (target) {
					observe(target, elem);
				}
			}
		} else if (intersectionTarget.startsWith("query:")) {
			const match = intersectionTarget.match(/^query:\s*(.+)/);
			if (match) {
				const target = document.querySelector(match[1]);
				if (target) {
					observe(target, elem);
				}
			}
		}
	});
	function observe(observable, animated) {
			console.log(observable, animated);
		map.set(observable, animated || observable);
		observer.observe(observable);
	}
	function extractAnimationClasses(target, attribute) {
		const animationClasses = target.getAttribute(attribute);
		return animationClasses && animationClasses.split(/[,\s]+/) || [];
	}
}