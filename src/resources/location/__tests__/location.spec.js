import { signup, login } from '../../auth/auth';
import { setLocationForTrackerSession } from '../location';
import { Location } from '../location.model';
import {
  mockDriverReq,
  mockLatLongReq,
  mockRes,
} from '../../../utils/__mocks__/driver';

describe('Location', () => {
  describe('setLocationForTrackerSession', () => {
    test('requires email, latitude and longitude', async () => {
      const req = { body: {} };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await setLocationForTrackerSession(req, res);
    });

    test('ask driver to signup', async () => {
      const req = { ...mockLatLongReq };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await setLocationForTrackerSession(req, res);
    });

    test('ask driver to login', async () => {
      await signup(mockDriverReq, mockRes);

      const req = mockLatLongReq;
      const res = {
        status(status) {
          expect(status).toBe(403);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await setLocationForTrackerSession(req, res);
    });

    test('create a coordinate location and push into tracker session', async () => {
      await signup(mockDriverReq, mockRes);
      await login(mockDriverReq, mockRes);

      const req = mockLatLongReq;

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        async send(result) {
          const locationId = result.locationIds[0];
          const location = await Location.findById(locationId)
            .lean()
            .exec();
          expect(result.isActive).toBe(true);
          expect(location.coordinates).toEqual([
            req.body.latitude,
            req.body.longitude,
          ]);
        },
      };

      await setLocationForTrackerSession(req, res);
    });

    test('500 catch block ', async () => {
      const res = {
        status(status) {
          expect(status).toBe(500);
          return this;
        },
        end() {
          expect(true).toBe(true);
        },
      };

      await setLocationForTrackerSession(undefined, res);
    });
  });
});
