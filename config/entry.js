function getEntryPoints (base = "", mode) {
	return {
		"common": [`${base}/js/common/index.js`, `${base}/scss/common/index.scss`],
		"home": [`${base}/js/pages/home/index.js`, `${base}/scss/pages/home/index.scss`],
		"built": [`${base}/js/pages/built/index.js`, `${base}/scss/pages/built/index.scss`],
		"about": [`${base}/js/pages/about/index.js`, `${base}/scss/pages/about/index.scss`],
		"catalogue": [`${base}/js/pages/catalogue/index.js`, `${base}/scss/pages/catalogue/index.scss`],
		"card": [`${base}/js/pages/card/index.js`, `${base}/scss/pages/card/index.scss`],
		"contacts": [`${base}/js/pages/contacts/index.js`, `${base}/scss/pages/contacts/index.scss`],
		"show-area": [`${base}/js/pages/show-area/index.js`, `${base}/scss/pages/show-area/index.scss`],
		"cases": [`${base}/js/pages/cases/index.js`, `${base}/scss/pages/cases/index.scss`],
	};
}
export default getEntryPoints;
