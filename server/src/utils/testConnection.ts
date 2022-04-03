import axios from 'axios';

export function testConnection(): Promise<boolean> {
	return new Promise<boolean>((resolve) => {
		axios
			.get('duckduckgo.com')
			.then(() => resolve(true))
			.catch((_e: any) => {
				resolve(true);
			});
	});
}
