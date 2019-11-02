import { signup, login, logout } from '../../auth/auth';
import { showInactiveTrackerSessions } from '../trackerSession';
import { mockDriverReq, mockRes } from '../../../utils/__mocks__/driver';

describe('TrackerSession', () => {
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

    test('returns inActiveSessions with empty location', async () => {
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
          expect(result[0]).toHaveProperty('locationIds');
        },
      };

      await showInactiveTrackerSessions(req, res);
    });
  });
});
