/**
 * Создает элемент из строки HTML.
 * @param {string} str - Строка HTML.
 * @returns {Element | null} - Созданный элемент.
 * @example
 * const el = createElFromStr('<div>Привет</div>');
 */
export const createElFromStr = (str: string): Element | null => {
	const el = document.createElement('div');
	el.innerHTML = str;
	const child = el.firstElementChild;
	el.remove();
	return child;
};
