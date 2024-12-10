import { $ } from './_lib';

document.addEventListener('DOMContentLoaded', () => {
	const circles = $('[data-progress="circle"]').get();

	const line = $('[data-progress="line"]').get();

	let currentActive = 0;

	$('[data-button="prev"]').on('click', () => {
		currentActive--;
		hasControls();

		update();
	});

	$('[data-button="next"]').on('click', () => {
		currentActive++;
		hasControls();

		update();
	});

	function update() {
		circles.forEach((c, index) => {
			if (index < currentActive) {
				c.classList.add('active');
			} else {
				c.classList.remove('active');
			}
		});

		line[0].style.width = `${(currentActive / circles.length) * 100}%`;
	}

	function hasControls() {
		$('[data-button]').removeClass('disabled');
		if (currentActive <= 0) $('[data-button="prev"]').addClass('disabled');
		if (circles.length - 1 < currentActive) $('[data-button="next"]').addClass('disabled');
	}
});
