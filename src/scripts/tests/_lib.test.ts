import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { $ } from '../_lib';

describe('$ library', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	afterEach(() => {
		document.body.innerHTML = '';
		vi.clearAllMocks();
	});

	const createElement = (className = 'test-element') => {
		const div = document.createElement('div');
		div.className = className;
		document.body.appendChild(div);
		return div;
	};

	test('should select elements', () => {
		createElement();
		const elements = $('.test-element').get();
		expect(elements.length).toBe(1);
	});

	describe('on()', () => {
		test('should add event listener to single element', () => {
			const div = createElement();
			const mockCallback = vi.fn();

			$('.test-element').on('click', mockCallback);
			div.click();

			expect(mockCallback).toHaveBeenCalledTimes(1);
		});

		test('should add event listener to multiple elements', () => {
			createElement('multi');
			createElement('multi');
			const mockCallback = vi.fn();

			$('.multi').on('click', mockCallback);
			document.querySelectorAll('.multi').forEach((el) => (el as HTMLElement).click());

			expect(mockCallback).toHaveBeenCalledTimes(2);
		});

		test('should remove event listener to multiple elements', () => {
			createElement('multi');
			createElement('multi');
			const mockCallback = vi.fn();

			$('.multi').on('click', mockCallback).off('click', mockCallback);
			document.querySelectorAll('.multi').forEach((el) => (el as HTMLElement).click());

			expect(mockCallback).not.toHaveBeenCalled();
		});
	});

	describe('addClass()', () => {
		test('should add class to elements', () => {
			createElement();
			$('.test-element').addClass('new-class');

			expect(document.querySelector('.test-element')?.classList.contains('new-class')).toBe(
				true,
			);
		});

		test('should add class to multiple elements', () => {
			createElement('multi');
			createElement('multi');

			$('.multi').addClass('new-class');
			const elements = document.querySelectorAll('.multi');

			elements.forEach((el) => {
				expect(el.classList.contains('new-class')).toBe(true);
			});
		});
	});

	describe('removeClass()', () => {
		test('should remove class from elements', () => {
			const div = createElement();
			div.classList.add('remove-me');

			$('.test-element').removeClass('remove-me');

			expect(div.classList.contains('remove-me')).toBe(false);
		});
	});

	describe('hide() and show()', () => {
		test('should hide elements', () => {
			createElement();
			$('.test-element').hide();

			expect(
				document.querySelector('.test-element')?.classList.contains('visually-hidden'),
			).toBe(true);
		});

		test('should show elements', () => {
			const div = createElement();
			div.classList.add('visually-hidden');

			$('.test-element').show();

			expect(div.classList.contains('visually-hidden')).toBe(false);
		});
	});

	describe('animate()', () => {
		test('should call animate on elements', () => {
			const div = createElement();
			const animateMock = vi.fn();
			div.animate = animateMock;

			const keyframes = [{ opacity: 0 }, { opacity: 1 }];
			const options = { duration: 1000 };

			$('.test-element').animate(keyframes, options);

			expect(animateMock).toHaveBeenCalledWith(keyframes, options);
		});
	});

	describe('css()', () => {
		test('should set styles on elements', () => {
			createElement();
			$('.test-element').css({
				backgroundColor: 'red',
				color: 'blue',
			});

			const element = document.querySelector('.test-element') as HTMLElement;
			expect(element.style.backgroundColor).toBe('red');
			expect(element.style.color).toBe('blue');
		});
	});

	describe('hasClass()', () => {
		test('should check if elements have class', () => {
			const div = createElement();
			div.classList.add('existing-class');

			expect($('.test-element').hasClass('existing-class')).toBe(true);
			expect($('.test-element').hasClass('non-existing-class')).toBe(false);
		});
	});

	describe('setAttributes() and hasAttribute()', () => {
		test('should set attributes on elements', () => {
			createElement();
			$('.test-element').setAttributes({
				'data-test': 'value',
				'aria-label': 'label',
			});

			const element = document.querySelector('.test-element');
			expect(element?.getAttribute('data-test')).toBe('value');
			expect(element?.getAttribute('aria-label')).toBe('label');
		});

		test('should check if elements have attribute', () => {
			const div = createElement();
			div.setAttribute('data-test', 'value');

			expect($('.test-element').hasAttribute('data-test')).toBe(true);
			expect($('.test-element').hasAttribute('non-existing')).toBe(false);
		});
	});

	describe('removeAttributes()', () => {
		test('should remove attributes from elements', () => {
			const div = createElement();
			div.setAttribute('data-test', 'value');
			div.setAttribute('aria-label', 'label');

			$('.test-element').removeAttributes(['data-test', 'aria-label']);

			expect(div.hasAttribute('data-test')).toBe(false);
			expect(div.hasAttribute('aria-label')).toBe(false);
		});
	});

	describe('getAttribute()', () => {
		test('should return attribute from elements', () => {
			const div = createElement();
			div.setAttribute('data-test', 'value');

			expect($('.test-element').getAttribute('data-test')).toBe('value');
		});
	});

	describe('setText() and setHTML()', () => {
		test('should set text content', () => {
			createElement();
			$('.test-element').setText('New text');

			expect(document.querySelector('.test-element')?.textContent).toBe('New text');
		});

		test('should set HTML content', () => {
			createElement();
			$('.test-element').setHTML('<span>New HTML</span>');

			expect(document.querySelector('.test-element')?.innerHTML).toBe(
				'<span>New HTML</span>',
			);
		});
	});
});
