import { Planet } from '@api/types/Planet';
import { APIClient } from '../../APIClient';
import { AxiosPromise } from 'axios';
export function getHabitablePlanets(): AxiosPromise<Planet[]> {
	return APIClient.getInstance().get(`/planets`, {
		params: {
			habitable: true,
		},
	});
}
