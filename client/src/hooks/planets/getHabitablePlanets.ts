import { Planet } from '@api/types/Planet';
import { AxiosPromise } from 'axios';
import { APIClient } from '../../APIClient';
export function getHabitablePlanets(): AxiosPromise<Planet[]> {
	return APIClient.getInstance().get(`/planets`, {
		params: {
			habitable: true,
		},
	});
}
