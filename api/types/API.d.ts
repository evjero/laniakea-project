import { Launch } from './Launch';
import { Planet } from './Planet';

export type API = {
	readonly planets: Planet[];
	readonly launches: Launch[];
};
