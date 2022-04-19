import { Launch } from '@api/types/Launch';
import { APIClient } from '../../APIClient';
import { AxiosPromise } from 'axios';
export function deleteLaunch(
	flightNumber: Launch['flightNumber']
): AxiosPromise<void> {
	return APIClient.getInstance().delete(`/launches`, {
		data: flightNumber,
	});
}
