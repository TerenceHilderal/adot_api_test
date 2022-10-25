import * as express from 'express';
import cors = require("cors");
import { Express } from 'express-serve-static-core';

export const expressApp = async(app: Express) =>
{
  app.use(express.json());
  app.use(cors());
}