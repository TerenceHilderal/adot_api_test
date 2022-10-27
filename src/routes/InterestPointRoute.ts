import { Router } from 'express';
import { InterestPointController } from '../controllers/InterestPointController';

const interestPointRoute = Router();

interestPointRoute.post(
	'/interest',
	InterestPointController.getClickAndImpressionsBasedOnInterestPointProximity,
);

export default interestPointRoute;
