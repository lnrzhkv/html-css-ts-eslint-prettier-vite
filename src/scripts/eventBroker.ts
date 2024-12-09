type EventHandler = (data: unknown) => void;

type EventBroker = {
	hub: Record<string, EventHandler[]>;
	emit: (event: string, data: unknown) => void;
	on: (event: string, handler: EventHandler) => void;
	off: (event: string, handler: EventHandler) => void;
};

const createEventBroker = (): EventBroker => ({
	hub: Object.create(null),
	emit(e, d) {
		(this.hub[e] || []).forEach((h) => h(d));
	},
	on(e, h) {
		if (!this.hub[e]) this.hub[e] = [];
		this.hub[e].push(h);
	},
	off(e, h) {
		if (!this.hub[e]) return; // Ранний выход если события нет

		const i = this.hub[e].findIndex((handler) => handler === h);
		if (i > -1) {
			this.hub[e].splice(i, 1);
			if (this.hub[e].length === 0) delete this.hub[e];
		}
	},
});

export default createEventBroker;
