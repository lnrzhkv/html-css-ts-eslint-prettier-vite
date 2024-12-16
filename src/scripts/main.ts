import { $ } from './_lib';

document.addEventListener('DOMContentLoaded', () => {
	$('.btn').on('click', () => {
		if ($('.input').hasClass('hide')) {
			$('.input').removeClass('hide');
		} else {
			$('.input').addClass('hide');
		}
	});
});
