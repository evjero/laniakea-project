import { Planet } from './Planet';

export type Launch = {
	destination: Planet['kepoi_name'];
	/** Unique flight number */
	flightNumber: number;
	/** Date of launch */
	launchDate: Date;
	/** Mission name */
	mission: string;
	/** Rocket type */
	rocket: string;
	/** Recorded success */
	success: boolean;
	/** Upcoming flag */
	upcoming: boolean;
};