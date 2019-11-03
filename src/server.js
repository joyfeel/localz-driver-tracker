import express from 'express';
import { json, urlencoded } from 'body-parser';
import { connect } from './utils/db';
import authRouter from './resources/auth/auth.router';
import locationRouter from './resources/location/location.router';
import driverRouter from './resources/driver/driver.router';
import trackerSessionRouter from './resources/trackerSession/trackerSession.router';

require('dotenv').config();

export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/', authRouter);

app.use('/api/drivers', driverRouter);
app.use('/api/locations', locationRouter);
app.use('/api/tracker_session', trackerSessionRouter);

export const start = async () => {
  try {
    // open mongoose connection
    await connect();

    const PORT = process.env.PORT || 3000;
    const ENV = process.env.NODE_ENV || 'development';

    // listen to requests
    app.listen(PORT, () => {
      console.log(`server started on http://localhost:3000 (${ENV})`);
    });
  } catch (e) {
    console.error(e);
  }
};
