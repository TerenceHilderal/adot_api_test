import { ApiResponse, Payload, ResponseApi, Csv } from '../../types/type';

export class DataMock {
	static ResponseApi(): ResponseApi {
		return {
			Arc: {
				lat: 48.8759992,
				lon: 2.3481253,
				name: 'Arc de triomphe',
				impressions: 6,
				clicks: 2,
			},
			Chatelet: {
				lat: 48.86,
				lon: 2.35,
				name: 'Chatelet',
				impressions: 10,
				clicks: 1,
			},
		};
	}

	static Payload(): Payload {
		return [
			{
				lat: 48.86,
				lon: 2.35,
				name: 'Chatelet',
			},
			{
				lat: 48.8759992,
				lon: 2.3481253,
				name: 'Arc de triomphe',
			},
		];
	}

	static CsvMockImpressions(): Csv {
		return {
			lat: 48.878436309018916,
			lon: 2.3262636873424807,
			event_type: 'imp',
		};
	}

	static CsvMockClicks(): Csv {
		return {
			lat: 48.878436309018916,
			lon: 2.3262636873424807,
			event_type: 'click',
		};
	}
}
