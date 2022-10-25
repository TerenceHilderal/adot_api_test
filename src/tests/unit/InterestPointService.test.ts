import { InterestPointService } from '../../services/InterestPointService';
import { DataMock } from '../mock/data-mock';

describe('InterestPointService', () => {
	it('distanceBetweenInterestPointAndEvent should return 7.399143691651205', () => {
		const result =
			InterestPointService.distanceBetweenInterestPointAndEvent(
				48.8759992,
				2.3481253,
				48.82094216189432,
				2.4049238868200975,
				'K',
			);
		expect(result).toBe(7.399143691651205);
	});

	it('eventsData should return ResponseApi', () => {
		const result = InterestPointService.eventsData();
		expect(result).toEqual(DataMock.ResponseApi());
	});
});
