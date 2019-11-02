import { signup, login, logout } from '../../auth/auth';
import {
  setLocationForTrackerSession,
  showLocationsWithTrackerSession,
} from '../location';
import { Location } from '../location.model';
import {
  mockDriverReq,
  mockLatLongReq,
  mockRes,
} from '../../../utils/__mocks__/driver';

describe('Location', () => {
  describe('setLocationForTrackerSession', () => {
    test('401 wrong input', async () => {
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

    test('403 ask driver to login', async () => {
      let trackerSessionId;
      await signup(mockDriverReq, mockRes);
      await login(mockDriverReq, {
        ...mockRes,
        send(result) {
          trackerSessionId = result.trackerSessionId;
        },
      });

      await logout(mockDriverReq, mockRes);

      const req = {
        body: {
          ...mockLatLongReq.body,
          trackerSessionId: trackerSessionId,
        },
      };

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

    test('create a coordinate location and push into tracker session', async () => {
      let trackerSessionId;
      await signup(mockDriverReq, mockRes);
      await login(mockDriverReq, {
        ...mockRes,
        send(result) {
          trackerSessionId = result.trackerSessionId;
        },
      });

      const req = {
        body: {
          ...mockLatLongReq.body,
          trackerSessionId: trackerSessionId,
        },
      };

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
  });

  describe('showLocationsWithTrackerSession', () => {
    test('401 wrong input', async () => {
      const req = { query: {} };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await showLocationsWithTrackerSession(req, res);
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

      await showLocationsWithTrackerSession(undefined, res);
    });

    test('returns activeSessions with empty locationIds', async () => {
      let driverId;
      await signup(mockDriverReq, mockRes);
      await login(mockDriverReq, {
        ...mockRes,
        send(result) {
          driverId = result._id.toString();
        },
      });

      const req = {
        query: {
          driverId,
        },
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        send(result) {
          expect(result).toHaveLength(1);
          expect(result[0]).toHaveProperty('_id');
          expect(result[0]).toHaveProperty('locationIds', []);
        },
      };

      await showLocationsWithTrackerSession(req, res);
    });
  });
});
