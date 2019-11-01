import { signup, login, logout } from '../../auth/auth';
import {
  showActiveLocations,
  showInactiveTrackerSessions,
} from '../trackerSession';
import { mockDriverReq, mockRes } from '../../../utils/__mocks__/driver';

describe('TrackerSession', () => {
  describe('showActiveLocations', () => {
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

      await showActiveLocations(req, res);
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

      await showActiveLocations(undefined, res);
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

      await showActiveLocations(req, res);
    });
  });

  describe('showInactiveTrackerSessions', () => {
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

      await showInactiveTrackerSessions(req, res);
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

      await showInactiveTrackerSessions(undefined, res);
    });

    test('returns inActiveSessions with empty locationIds', async () => {
      let driverId;
      await signup(mockDriverReq, mockRes);
      await login(mockDriverReq, {
        ...mockRes,
        send(result) {
          driverId = result._id.toString();
        },
      });

      await logout(mockDriverReq, mockRes);

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
          expect(result[0]).toHaveProperty('isActive', false);
          expect(result[0]).toHaveProperty('driverId');
          expect(result[0]).toHaveProperty('locationIds');
        },
      };

      await showInactiveTrackerSessions(req, res);
    });
  });
});
