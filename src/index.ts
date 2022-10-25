import express from 'express';
import { expressApp } from './server';




const app = express();
    const PORT = 3000

    expressApp(app);

    app.listen(PORT);

    console.log(
      `Express server has started on port ${PORT}`
    );