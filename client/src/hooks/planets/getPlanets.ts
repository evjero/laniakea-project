import { Planet } from '@api/types/Planet';
import { AxiosPromise } from 'axios';
import { APIClient } from '../../APIClient';
export function getPlanets(): AxiosPromise<Planet[]> {
	console.debug('getPlanets..');
	return APIClient.getInstance().get(`/planets`);
}
