import initSliders from "./sliders.js";
import { initCallbackRequestForm } from "../../shared/initCallbackRequestForm.js";
import { log, error, debug } from "../../../../repo/js/libs/logger.js";

window.addEventListener("DOMContentLoaded", onLoaded);

function onLoaded() {
	initSliders();
	initCallbackRequestForm("loan-callback-request-form", "loan");
}
