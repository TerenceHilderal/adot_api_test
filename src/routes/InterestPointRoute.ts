import { Router } from 'express';
import { InterestPointController } from '../controllers/InterestPointController';

const interestPointRoute = Router();

interestPointRoute.post('/link', InterestPointController.getClickAndImpressionsBasedOnInterestPointProximity);

export default interestPointRoute;
