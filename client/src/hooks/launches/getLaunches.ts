import { Launch } from '@api/types/Launch';
import { APIClient } from '../../APIClient';
import { AxiosPromise } from 'axios';
export function getLaunches(): AxiosPromise<Launch[]> {
	return APIClient.getInstance().get(`/launches`);
}
