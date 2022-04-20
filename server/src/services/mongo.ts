import mongoose from 'mongoose';

mongoose.connection.once('open', () => {
	console.debug('[MongoDB] Ready');
});
mongoose.connection.on('error', (error: any) => {
	console.debug('[MongoDB] Error: ', error);
});

export async function mongoConnect() {
	if (process.env.MONGO_ENDPOINT) {
		return mongoose.connect(process.env.MONGO_ENDPOINT, {});
	} else {
		throw new Error('[MongoDB] No endpoint specified!');
	}
}

export async function mongoDisconnect() {
	return mongoose.disconnect();
}
