import { $ } from './_lib';

document.addEventListener('DOMContentLoaded', () => {
	// code there
	$('.panel').on('click', (e) => {
		$('.panel').removeClass('active');

		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.classList.add('active');
		}
	});
});
