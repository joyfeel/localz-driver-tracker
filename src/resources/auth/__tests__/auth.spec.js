import { signup, login, logout } from '../auth';
import { Driver } from '../../driver/driver.model';
import { mockDriverReq, mockRes } from '../../../utils/__mocks__/driver';

describe('Auth', () => {
  describe('signup', () => {
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

      await signup(req, res);
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

      await signup(undefined, res);
    });

    test('409 duplcate resource', async () => {
      // create a driver with same email
      await Driver.create(mockDriverReq.body);

      const res = {
        status(status) {
          expect(status).toBe(409);
          return this;
        },
        async send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await signup(mockDriverReq, res);
    });

    test('returns a new driver', async () => {
      const req = mockDriverReq;

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        async send(result) {
          expect(result).toHaveProperty('_id');
          expect(result).toHaveProperty('email', req.body.email);
          expect(result).toHaveProperty('firstName', req.body.firstName);
          expect(result).toHaveProperty('lastName', req.body.lastName);
        },
      };

      await signup(req, res);
    });
  });

  describe('login', () => {
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

      await login(req, res);
    });

    test('500 catch block', async () => {
      const res = {
        status(status) {
          expect(status).toBe(500);
          return this;
        },
        end() {
          expect(true).toBe(true);
        },
      };

      await login(undefined, res);
    });

    test('comfirms driver exist', async () => {
      const req = mockDriverReq;
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await login(req, res);
    });

    test('returns a driver after login', async () => {
      await signup(mockDriverReq, mockRes);

      const req = mockDriverReq;
      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        send(result) {
          expect(result).toHaveProperty('_id');
          expect(result).toHaveProperty('email', mockDriverReq.body.email);
          expect(result).toHaveProperty(
            'firstName',
            mockDriverReq.body.firstName
          );
          expect(result).toHaveProperty(
            'lastName',
            mockDriverReq.body.lastName
          );
        },
      };

      await login(req, res);
    });

    test('returns a driver after re-login', async () => {
      await signup(mockDriverReq, mockRes);

      const req = mockDriverReq;
      let res = {
        status() {
          return this;
        },
        send() {},
      };

      await login(req, res);

      res = {
        ...res,
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        async send(result) {
          expect(result).toHaveProperty('_id');
          expect(result).toHaveProperty('email', mockDriverReq.body.email);
          expect(result).toHaveProperty(
            'firstName',
            mockDriverReq.body.firstName
          );
          expect(result).toHaveProperty(
            'lastName',
            mockDriverReq.body.lastName
          );
        },
      };
      await login(req, res);
    });
  });

  describe('logout', () => {
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

      await logout(req, res);
    });

    test('401 invalid email', async () => {
      await Driver.create(mockDriverReq.body);

      const req = { body: { email: 'john@yahoo.com' } };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await logout(req, res);
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

      await logout(undefined, res);
    });

    test('step2', async () => {
      await signup(mockDriverReq, mockRes);
      await login(mockDriverReq, mockRes);

      const req = mockDriverReq;
      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        send(result) {
          expect(result).toHaveProperty('_id');
          expect(result).toHaveProperty('isActive', false);
          expect(result).toHaveProperty('locationIds');
        },
      };

      await logout(req, res);
    });
  });
});
