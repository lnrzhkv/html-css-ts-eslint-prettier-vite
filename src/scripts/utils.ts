/**
 * Создает элемент из строки HTML.
 * @param {string} str - Строка HTML.
 * @returns {Element | null} - Созданный элемент.
 * @example
 * const el = createElFromStr('<div>Привет</div>');
 */
export const createElFromStr = <K extends keyof HTMLElementTagNameMap>(
	str: string,
	tag?: K,
): Element | null => {
	const el = document.createElement(tag || 'div');
	el.innerHTML = str;
	const child = el.firstElementChild;
	el.remove();
	return child;
};
