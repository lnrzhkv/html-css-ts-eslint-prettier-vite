import { describe, expect, test } from 'vitest';

import { createElFromStr } from '../utils';

describe('createElFromStr', () => {
	test('должен создать элемент из строки HTML', () => {
		const el = createElFromStr('<div>Test</div>');
		expect(el?.tagName).toBe('DIV');
		expect(el?.textContent).toBe('Test');
	});

	test('должен создать элемент с указанным тегом', () => {
		const el = createElFromStr('<span>Test</span>', 'span');
		expect(el?.tagName).toBe('SPAN');
		expect(el?.textContent).toBe('Test');
	});

	test('должен вернуть null для пустой строки', () => {
		const el = createElFromStr('');
		expect(el).toBeNull();
	});

	test('должен вернуть null для невалидного HTML', () => {
		const el = createElFromStr('<div>Test');
		expect(el?.textContent).toBe('Test');
		expect(el?.tagName).toBe('DIV');
	});

	test('должен создать элемент с атрибутами', () => {
		const el = createElFromStr('<div class="test" id="test-id">Test</div>');
		expect(el?.className).toBe('test');
		expect(el?.id).toBe('test-id');
	});

	test('должен создать вложенные элементы', () => {
		const el = createElFromStr('<div><span>Test</span></div>');
		expect(el?.firstElementChild?.tagName).toBe('SPAN');
		expect(el?.textContent).toBe('Test');
	});
});
