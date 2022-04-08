import { Launch } from '@api/types/Launch';
import { APIClient } from '../../APIClient';
import { AxiosPromise } from 'axios';
export function postLaunch(launch: Launch): AxiosPromise<void> {
	return APIClient.getInstance().post(`/launches`, {
		data: launch,
	});
}
