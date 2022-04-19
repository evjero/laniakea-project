import { Planet } from './Planet';

export type Launch = {
	/** Mission destination (kepler_name) */
	destination: Planet['kepler_name'];
	/** Unique flight number */
	flightNumber: number;
	/** Date of launch */
	launchDate: Date;
	/** Mission name */
	mission: string;
	/** Rocket type */
	rocket: string;
	/** Recorded success */
	success?: boolean;
	/** Upcoming flag */
	upcoming: boolean;
};
