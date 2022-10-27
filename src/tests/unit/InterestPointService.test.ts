import { InterestPointService } from '../../services/InterestPointService';
import { DataMock } from '../mock/data-mock';

describe('InterestPointService', () => {
	it('distanceBetweenInterestPointAndEvent should return 7.399143691651205', () => {
		const result = InterestPointService.distanceBetweenInterestPointAndEvent(48.8759992, 2.3481253, 48.82094216189432, 2.4049238868200975, 'K');
		expect(result).toBe(7.399143691651205);
	});

	it('eventsData should return ResponseApi', () => {
		const result = InterestPointService.eventsData(DataMock.Payload());
		result.then((res) => {
			expect(res).toEqual(DataMock.ResponseApi());
		});
	});

	it('pointInterestImpressions should return { arcImp: 1, chateletImp: 0 } ', () => {
		let response = { arcImps: 1, chateletImps: 0 };
		const result = InterestPointService.pointInterestImpressions(DataMock.CsvMockImpressions(), 0, 0);
		expect(result).toEqual(response);
	});

	it('pointInterestClicks should return { arcClick: 1, chateletClick: 0 } ', () => {
		let response = { arcClicks: 1, chateletClicks: 0 };
		const result = InterestPointService.pointInterestClicks(DataMock.CsvMockClicks(), 0, 0);
		expect(result).toEqual(response);
	});
});
