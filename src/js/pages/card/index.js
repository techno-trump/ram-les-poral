import initSliders from "./sliders.js";
import { log, error, debug } from "../../../../repo/js/libs/logger.js";
import { initTabs } from "../../../../repo/js/libs/tabs.js";
import { initCallbackRequestForm } from "../../shared/initCallbackRequestForm.js";

window.addEventListener("DOMContentLoaded", onLoaded);

function onLoaded() {
	initSliders();
	initTabs();
	initCallbackRequestForm("loan-callback-request-form", "loan");
}
