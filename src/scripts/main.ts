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
