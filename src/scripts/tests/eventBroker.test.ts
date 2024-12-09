// eventBroker.test.ts
import { beforeEach, describe, expect, test, vi } from 'vitest';

import createEventBroker from '../eventBroker';

describe('EventBroker', () => {
	const broker = createEventBroker();
	const mockHandler = vi.fn();
	const testEvent = 'test-event';
	const testData = { message: 'test data' };

	beforeEach(() => {
		vi.clearAllMocks();
		// Очищаем все подписки
		Object.keys(broker.hub).forEach((event) => {
			delete broker.hub[event];
		});
	});

	describe('on()', () => {
		test('должен добавлять обработчик события', () => {
			broker.on(testEvent, mockHandler);
			expect(broker.hub[testEvent]).toContain(mockHandler);
		});

		test('должен создавать массив обработчиков для нового события', () => {
			broker.on(testEvent, mockHandler);
			expect(Array.isArray(broker.hub[testEvent])).toBe(true);
			expect(broker.hub[testEvent].length).toBe(1);
		});

		test('должен добавлять несколько обработчиков', () => {
			const secondHandler = vi.fn();
			broker.on(testEvent, mockHandler);
			broker.on(testEvent, secondHandler);
			expect(broker.hub[testEvent].length).toBe(2);
		});
	});

	describe('emit()', () => {
		test('должен вызывать обработчик с переданными данными', () => {
			broker.on(testEvent, mockHandler);
			broker.emit(testEvent, testData);
			expect(mockHandler).toHaveBeenCalledWith(testData);
		});

		test('должен вызывать все обработчики события', () => {
			const secondHandler = vi.fn();
			broker.on(testEvent, mockHandler);
			broker.on(testEvent, secondHandler);
			broker.emit(testEvent, testData);
			expect(mockHandler).toHaveBeenCalledWith(testData);
			expect(secondHandler).toHaveBeenCalledWith(testData);
		});

		test('не должен вызывать ошибку если нет обработчиков', () => {
			expect(() => broker.emit('non-existent', testData)).not.toThrow();
		});
	});

	describe('off()', () => {
		test('должен удалять обработчик события', () => {
			broker.on(testEvent, mockHandler);
			broker.off(testEvent, mockHandler);
			expect(broker.hub[testEvent]).toBeUndefined();
		});

		test('должен удалять только указанный обработчик', () => {
			const secondHandler = vi.fn();
			broker.on(testEvent, mockHandler);
			broker.on(testEvent, secondHandler);
			broker.off(testEvent, mockHandler);
			expect(broker.hub[testEvent]).not.toContain(mockHandler);
			expect(broker.hub[testEvent]).toContain(secondHandler);
		});

		test('должен удалять событие если не осталось обработчиков', () => {
			broker.on(testEvent, mockHandler);
			broker.off(testEvent, mockHandler);
			expect(broker.hub[testEvent]).toBeUndefined();
		});

		test('не должен вызывать ошибку если событие не существует', () => {
			expect(() => broker.off('non-existent', mockHandler)).not.toThrow();
		});
	});
});
