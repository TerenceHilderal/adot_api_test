import { Request, Response } from 'express';
import { InternalServerError } from '../Errors/Error';
import { InterestPointService } from '../services/InterestPointService';

export class InterestPointController {
	static async getClickAndImpressionsBasedOnInterestPointProximity(req: Request, res: Response) {
		try {
			const body = req.body.interest;
			const response = await InterestPointService.eventsData(body);
			res.status(200).json(response);
		} catch (error) {
			console.error(error);
			throw new InternalServerError('Internal Server Error');
		}
	}
}
