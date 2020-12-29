// import { ApolloServer } from 'apollo-server-express';
// import 'reflect-metadata';
import express, { Request, Response } from 'express';
// import { buildSchema } from 'type-graphql';
import 'dotenv/config';
import mongoose from 'mongoose';
// import * as cors from 'cors';

import { graphqlHTTP } from 'express-graphql';
import Player from './models/players';

const playerController = require('./controllers/playerController');

const app = express();

const asyncHandler = require('express-async-handler');

// Import du schéma graphQL
const schema = require('./schema/schema.js');
// Database
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wlnl2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    }
  )
  .then(() => console.log('Connected to database'))
  .catch((err: Error) => console.log(err));

// Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());
app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});
app.post('/api/player', asyncHandler(playerController.create));
app.get('/api/list', asyncHandler(playerController.read));

app.get('*', (req: Request, res: Response) => {
  res.status(404);
  res.send({ success: false, message: 'Wrong address' });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
