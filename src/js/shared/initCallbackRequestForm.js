export function initCallbackRequestForm(formId, formType = "callback") { // or "loan"
	const $form = $(`#${formId}`);
	const validator = $form.validate({
		ignore: [],
		highlight: function(element, errorClass, validClass) {
			$(element).closest(".form-field").addClass(errorClass);
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).closest(".form-field").removeClass(errorClass);
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.closest(".form-field"));
		},
		// Отправляем данные на сервер
		// submitHandler: async function(form, event) {
		// 	event.preventDefault();
		// 	drawers.open("successful-callback-request");
			// const formData = new FormData(form);
			// const response = await fetch(``, {
			// 	method: "POST",
			// 	body: formData,
			// 	redirect: 'follow'
			// });
			// if (response.ok) {
			// 	drawers.open("successful-callback-request");
			// } else {
			// 	console.error("Ошибка при отпрвке/обработке формы запороса обратного звонка: status::" + response.status + ", statusText::" + response.statusText);
			// }
		//}
	});
	const $telInputElem = $form.find("input[name='tel']");

	const cleave = new Cleave($telInputElem.get(0), {
		numericOnly: true,
		blocks: [2, 3, 3, 2, 2],
		delimiters: [" (", ") ", "-", "-"],
		prefix: "+7",
		noImmediatePrefix: true,
	});
	return validator;
}