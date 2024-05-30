export * from './lib/timer.model';
export * from './lib/schedule.model';
export * from './lib/user.model';

export function mapToJson(map: Map<unknown, unknown>): string {
	return JSON.stringify(Array.from(map.entries()));
}

export function jsonToMap(json: string): Map<unknown, unknown> {
	return new Map(JSON.parse(json));
}
