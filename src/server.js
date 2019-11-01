import express from 'express';
import { json, urlencoded } from 'body-parser';
import config from './config';
import { connect } from './utils/db';
import authRouter from './resources/auth/auth.router';
import locationRouter from './resources/location/location.router';
import driverRouter from './resources/driver/driver.router';
import trackerSessionRouter from './resources/trackerSession/trackerSession.router';

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

    // listen to requests
    app.listen(config.port, () => {
      console.log(
        `server started on port http://localhost:${config.port} (${config.env})`
      );
    });
  } catch (e) {
    console.error(e);
  }
};
