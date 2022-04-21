import { Launch } from '@api/types/Launch';
import { AxiosPromise } from 'axios';
import { APIClient } from '../../APIClient';
export function getLaunches(): AxiosPromise<Launch[]> {
	return APIClient.getInstance().get(`/launches`);
}
