import mongoose from 'mongoose';

const MONGO_URL =
	'mongodb+srv://laniakea:2ZV3ABHxRUE55NO5@laniakeacluster.njuio.mongodb.net/koi?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
	console.debug('[MongoDB] Ready');
});
mongoose.connection.on('error', (error: any) => {
	console.debug('[MongoDB] Error: ', error);
});

export async function mongoConnect() {
	return mongoose.connect(MONGO_URL, {});
}

export async function mongoDisconnect() {
	return mongoose.disconnect();
}
