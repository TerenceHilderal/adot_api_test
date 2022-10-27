import express from 'express';
import interestPointRoute from './routes/InterestPointRoute';
import { expressApp } from './server';

const app = express();
const PORT = 3000;

expressApp(app);

app.use(express.json());

app.use(interestPointRoute);

app.listen(PORT);

console.log(`Express server has started on port ${PORT}`);
