function resolveAddonStatus(id, addons) {
	const classList = document.getElementById(id).classList;
	const isAlreadyAddon = classList.contains('current-addon');

	if (addons.includes(id)) {
		if (!isAlreadyAddon) {
			classList.add('current-addon');
		}
	} else if (isAlreadyAddon) {
		classList.remove('current-addon');
	}
}

function showModal(modalID, addons = []) {
	const modal = document.getElementById('input-modal');

	if (modal.classList.contains('show')) {
		return false;
	}

	const prevModal = document.querySelector('.current-modal');
	const nextModal = document.getElementById(modalID);

	resolveAddonStatus('scalar', addons);
	resolveAddonStatus('applied-matrix', addons);
	resolveAddonStatus('other-matrix', addons);
	resolveAddonStatus('first-row', addons);
	resolveAddonStatus('second-row', addons);

	if (prevModal !== nextModal) {
		if (prevModal) {
			prevModal.classList.remove('current-modal');
		}

		if (nextModal) {
			nextModal.classList.add('current-modal');
		}
	}

	modal.classList.add('show');
	return true;
}

function formWrapper(func, modalID, addons) {
	return function () {
		const shouldContinue = showModal(modalID, addons);

		if (!shouldContinue) {
			return;
		}

		const form = document.getElementById('modal-form');
		form.querySelector('input, select').focus();

		function onSubmit() {
			func();
			this.parentNode.classList.remove('show');
			form.removeEventListener('submit', onSubmit);
		}

		form.addEventListener('submit', onSubmit);
		//not actual reset just remove the listener
		form.addEventListener('reset', () => form.removeEventListener('submit', onSubmit));
		document.body.addEventListener('focus', () => console.log(2));
	};
}

export default formWrapper;
