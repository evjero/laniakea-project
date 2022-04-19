import { API, Launch, Planet } from '@api/index';

/**
 * Interim database singleton object when not using external
 * @deprecated
 */
export class Database implements API {
	private static instance: Database;
	private _planets: Planet[] = [];
	private _launches: Launch[] = [];

	static getInstance(): Database {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}
	get launches() {
		return this._launches;
	}
	set launches(launches: Launch[]) {
		this._launches = launches;
	}
	get planets() {
		return this._planets;
	}
	set planets(planets: Planet[]) {
		this._planets = planets;
	}
	toString(): string {
		return JSON.stringify(Database.getInstance(), null, 4);
	}
}
