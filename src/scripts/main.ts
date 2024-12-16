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

	const isActiveButton = () => {
		prev = document.querySelector('.prev-btn');
		next = document.querySelector('.next-btn');

		if (currentActive === 1) {
			prev.disabled = true;
		} else if (currentActive === circles.length) {
			next.disabled = true;
		} else {
			prev.disabled = false;
			next.disabled = false;
		}
	};

	$('.prev-btn').on('click', () => {
		currentActive = currentActive - 1;

		if (currentActive < 1) {
			currentActive = 1;
		}
		update();
		isActiveButton();
	});

	$('.next-btn').on('click', () => {
		currentActive = currentActive + 1;

		if (currentActive > circles.length) {
			currentActive = circles.length;
		}

		update();
		isActiveButton();
	});
});
