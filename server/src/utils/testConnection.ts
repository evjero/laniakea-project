import axios from 'axios';

export function testConnection(): Promise<boolean> {
	return new Promise<boolean>((resolve) => {
		axios
			.get('www.google.com')
			.then(() => resolve(true))
			.catch((_e: any) => {
				resolve(true);
			});
	});
}
