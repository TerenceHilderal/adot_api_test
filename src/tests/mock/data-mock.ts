import { ApiResponse, ResponseApi } from '../../types/type';

export class DataMock {
	static ResponseApi(): ResponseApi {
		return {
			Arc: {
				clicks: 0,
				impressions: 0,
				lat: 48.86,
				lon: 2.35,
				name: 'Chatelet',
			},
			Chatelet: {
				clicks: 0,
				impressions: 0,
				lat: 48.8759992,
				lon: 2.3481253,
				name: 'Arc de triomphe',
			},
		};
	}
}
