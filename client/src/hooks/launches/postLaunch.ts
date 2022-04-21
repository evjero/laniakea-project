import { Launch } from '@api/types/Launch';
import { AxiosPromise } from 'axios';
import { APIClient } from '../../APIClient';
export function postLaunch(launch: Launch): AxiosPromise<void> {
	return APIClient.getInstance().post(`/launches`, {
		data: launch,
	});
}
