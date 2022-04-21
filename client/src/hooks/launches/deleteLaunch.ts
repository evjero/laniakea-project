import { Launch } from '@api/types/Launch';
import { AxiosPromise } from 'axios';
import { APIClient } from '../../APIClient';
export function deleteLaunch(
	flightNumber: Launch['flightNumber']
): AxiosPromise<void> {
	return APIClient.getInstance().delete(`/launches/${flightNumber}`);
}
