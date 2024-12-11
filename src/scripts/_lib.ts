/**
 * Утилита для работы с DOM элементами.
 * @param {string} selector - CSS селектор.
 * @param {ParentNode} [parent=document] - Родительский элемент для поиска.
 * @returns {Object} - Объект с методами для работы с элементами.
 * @example
 * $('.my-class')
 *   .addClass('new-class')
 *   .hide()
 *   .animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });
 */

type Chainable = {
	/**
	 * Добавляет обработчик события для выбранных элементов
	 * @param {keyof HTMLElementEventMap} event - Тип события
	 * @param {(e: Event) => void} callback - Функция-обработчик
	 * @returns {Chainable}  Chainable - Цепочка методов
	 * @example $('.button').on('click', (e) => console.log('Клик!'))
	 */
	on: (event: keyof HTMLElementEventMap, callback: (e: Event) => void) => Chainable;

	/**
	 * Удаляет обработчик события для выбранных элементов
	 * @param {keyof HTMLElementEventMap} event - Тип события
	 * @param {(e: Event) => void} callback - Функция-обработчик
	 * @returns {Chainable}  Chainable - Цепочка методов
	 * @example $('.button').off('click', (e) => console.log('Клик!'))
	 */
	off: (event: keyof HTMLElementEventMap, callback: (e: Event) => void) => Chainable;

	/**
	 * Добавляет CSS класс к выбранным элементам
	 * @param {string} className - Имя класса
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').addClass('active')
	 */
	addClass: (className: string) => Chainable;

	/**
	 * Удаляет CSS класс у выбранных элементов
	 * @param {string} className - Имя класса
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').removeClass('active')
	 */
	removeClass: (className: string) => Chainable;

	/**
	 * Проверяет наличие класса у выбранных элементов
	 * @param {string} className - Имя класса
	 * @returns {boolean} Результат проверки
	 * @example const isClassActiveExist = $('.element').hasClass('active')
	 */
	hasClass: (className: string) => boolean;

	/**
	 * Скрывает выбранные элементы
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').hide()
	 */
	hide: () => Chainable;

	/**
	 * Показывает выбранные элементы
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').show()
	 */
	show: () => Chainable;

	/**
	 * Возвращает NodeList выбранных элементов
	 * @returns {NodeListOf<HTMLElement>} Список элементов/список с одним элементом(в зависимости от кол-ва эл.)
	 * @example const elements = $('.element').get()
	 */
	get: () => NodeListOf<HTMLElement>;

	/**
	 * Анимирует выбранные элементы
	 * @param {Keyframe[] | PropertyIndexedKeyframes | null} keyframes - Ключевые кадры анимации
	 * @param {number | KeyframeAnimationOptions} options - Настройки анимации
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 })
	 */
	animate: (
		keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
		options: number | KeyframeAnimationOptions,
	) => Chainable;

	/**
	 * Устанавливает CSS стили для выбранных элементов
	 * @param {Partial<CSSStyleDeclaration>} styles - Объект стилей
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').css({ backgroundColor: 'red', fontSize: '16px' })
	 */
	css: (styles: Partial<CSSStyleDeclaration>) => Chainable;

	/**
	 * Устанавливает атрибуты для выбранных элементов
	 * @param {Record<string, string>} attributes - Объект атрибутов
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').setAttributes({ 'data-id': '1', 'aria-label': 'Текст' })
	 */
	setAttributes: (attributes: Record<string, string>) => Chainable;

	/**
	 * Возвращает значение дата-аттрибута.
	 * @param {attributeKey} attributeKey - ключ искомого дата-аттрибута.
	 * @returns {Chainable} string
	 * @example $('.element').getAttribute('id')
	 */
	getAttribute: (attributeKey: string) => string | boolean;

	/**
	 * Проверяет наличие атрибута у выбранных элементов
	 * @param {string} attribute - Имя атрибута
	 * @returns {boolean} Результат проверки
	 * @example const isAttrExist = $('.element').hasAttribute('data-id')
	 */
	hasAttribute: (attribute: string) => boolean;

	/**
	 * Удаляет атрибуты у выбранных элементов
	 * @param {string[]} attributes - Массив имен атрибутов
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').removeAttributes(['data-id', 'aria-label'])
	 */
	removeAttributes: (attributes: string[]) => Chainable;

	/**
	 * Устанавливает текстовое содержимое выбранных элементов
	 * @param {string} text - Текст
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').setText('Новый текст')
	 */
	setText: (text: string) => Chainable;

	/**
	 * Устанавливает HTML содержимое выбранных элементов
	 * @param {string} html - HTML строка
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').setHTML('<span>Новый HTML</span>')
	 */
	setHTML: (html: string) => Chainable;
};

export const $ = (selector: string, parent: ParentNode = document): Chainable => {
	const elements: NodeListOf<HTMLElement> = parent.querySelectorAll(selector);

	if (!elements.length) {
		console.warn('Element(s) do not exist');
	}

	const methods: Chainable = {
		on(event: string, callback: (e: Event) => void): Chainable {
			elements.forEach((el) => el.addEventListener(event, callback));
			return methods;
		},

		off(event: string, callback: (e: Event) => void): Chainable {
			elements.forEach((el) => el.removeEventListener(event, callback));
			return methods;
		},

		addClass(className: string): Chainable {
			elements.forEach((el) => el.classList.add(className));
			return methods;
		},

		removeClass(className: string): Chainable {
			elements.forEach((el) => el.classList.remove(className));
			return methods;
		},

		hide(): Chainable {
			elements.forEach((el) => {
				el.classList.add('visually-hidden');
			});
			return methods;
		},

		show(): Chainable {
			elements.forEach((el) => {
				el.classList.remove('visually-hidden');
			});
			return methods;
		},

		get(): NodeListOf<HTMLElement> {
			return elements;
		},

		animate(
			keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
			options: number | KeyframeAnimationOptions,
		): Chainable {
			elements.forEach((el) => el.animate(keyframes, options));
			return methods;
		},

		css(styles: Partial<CSSStyleDeclaration>): Chainable {
			elements.forEach((el) => Object.assign(el.style, styles));
			return methods;
		},

		hasClass(className: string): boolean {
			return Array.from(elements).some((el) => el.classList.contains(className));
		},

		setAttributes(attributes: Record<string, string>): Chainable {
			elements.forEach((el) => {
				Object.entries(attributes).forEach(([key, value]) => {
					el.setAttribute(key, value);
				});
			});
			return methods;
		},

		getAttribute(attributeKey: string): string | boolean {
			return elements[0].getAttribute(attributeKey) || false;
		},

		hasAttribute(attribute: string): boolean {
			return Array.from(elements).some((el) => el.hasAttribute(attribute));
		},

		removeAttributes(attributes: string[]): Chainable {
			elements.forEach((el) => {
				attributes.forEach((attr) => el.removeAttribute(attr));
			});
			return methods;
		},

		setText(text: string): Chainable {
			elements.forEach((el) => {
				el.textContent = text;
			});
			return methods;
		},

		setHTML(html: string): Chainable {
			elements.forEach((el) => {
				el.innerHTML = html;
			});
			return methods;
		},
	};

	return methods;
};
