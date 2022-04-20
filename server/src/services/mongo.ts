import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_ENDPOINT;

mongoose.connection.once('open', () => {
	console.debug('[MongoDB] Ready');
});
mongoose.connection.on('error', (error: any) => {
	console.debug('[MongoDB] Error: ', error);
});

export async function mongoConnect() {
	if (MONGO_URL) {
		return mongoose.connect(MONGO_URL, {});
	} else {
		throw new Error('[MongoDB] No endpoint specified!');
	}
}

export async function mongoDisconnect() {
	return mongoose.disconnect();
}
