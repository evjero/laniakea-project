import axios, {
	Axios,
	AxiosInstance,
	AxiosDefaults,
	AxiosRequestConfig,
	AxiosResponse,
} from 'axios';
import { API_URL } from './hooks';

export class APIClient {
	private static instance: APIClient;
	private axiosClient: AxiosInstance;

	constructor() {
		this.axiosClient = axios.create({
			baseURL: API_URL,
			timeout: 10000,
			headers: { 'X-tracability-id': 'lp-client' },
		});
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new APIClient();
		}
		return this.instance;
	}

	get<T = any, R = AxiosResponse<T, any>, D = any>(
		url: string,
		config?: AxiosRequestConfig<D> | undefined
	): Promise<R> {
		return this.axiosClient.get(url, config);
	}
	post<T = any, R = AxiosResponse<T, any>, D = any>(
		url: string,
		config?: AxiosRequestConfig<D> | undefined
	): Promise<R> {
		return this.axiosClient.post(url, config);
	}
	delete<T = any, R = AxiosResponse<T, any>, D = any>(
		url: string,
		config?: AxiosRequestConfig<D> | undefined
	): Promise<R> {
		return this.axiosClient.delete(url, config);
	}
}
