import { Planet } from '@api/types/Planet';
import { APIClient } from '../../APIClient';
import { AxiosPromise } from 'axios';
export function getPlanets(): AxiosPromise<Planet[]> {
	console.debug('getPlanets..');
	return APIClient.getInstance().get(`/planets`);
}
