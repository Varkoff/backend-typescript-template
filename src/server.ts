import express from 'express';
import 'dotenv/config';

const app = express();

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
