import { $ } from './_lib';

document.addEventListener('DOMContentLoaded', () => {
	const circles = $('.circle').get();
	let currentActive = 1;

	const update = () => {
		circles.forEach((circle, index) => {
			if (index < currentActive) {
				circle.classList.add('active');
			} else {
				circle.classList.remove('active');
			}
		});

		const actives = $('.active').get();
		$('.progress').css({ width: ((actives.length - 1) / (circles.length - 1)) * 100 + '%' });
	};

	$('.prev-btn').on('click', () => {
		currentActive = currentActive - 1;

		if (currentActive < 1) {
			currentActive = 1;
		}
		update();
	});

	$('.next-btn').on('click', () => {
		currentActive = currentActive + 1;

		if (currentActive > circles.length) {
			currentActive = circles.length;
		}

		update();
	});
});
