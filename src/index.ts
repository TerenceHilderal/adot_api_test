import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import { expressApp } from './server';
import * as swaggerDocument from './swagger.json';
import interestPointRoute from './routes/InterestPointRoute';

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

expressApp(app);

app.use(interestPointRoute);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT);

console.log(`Express server has started on port ${PORT}`);
