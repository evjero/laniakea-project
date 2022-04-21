import type { Launch } from '@api/types/Launch';
import { model, Schema } from 'mongoose';

export const LaunchesSchema = new Schema<Launch>({
	/** kepler_name of Planet */
	destination: {
		type: Schema.Types.String,
		required: true,
	},
	/** Unique flight number */
	flightNumber: {
		type: Schema.Types.Number,
		required: true,
	},
	/** Date of launch */
	launchDate: {
		type: Schema.Types.Date,
		required: true,
	},
	/** Mission name */
	mission: {
		type: Schema.Types.String,
		required: true,
	},
	/** Rocket type */
	rocket: {
		type: Schema.Types.String,
		required: true,
	},
	/** Recorded success */
	success: {
		type: Schema.Types.Boolean,
		required: false,
	},
	/** Upcoming flag */
	upcoming: {
		type: Schema.Types.Boolean,
		required: false,
	},
});

export const LaunchModel = model('Launch', LaunchesSchema);
export default LaunchModel;
