import mongoose from 'mongoose';
import { signup } from '../../auth/auth';
import { listDrivers, searchDriver, getDriver } from '../driver';
import { mockDriverReq, mockRes } from '../../../utils/__mocks__/driver';

describe('Driver', () => {
  describe('listDrivers', () => {
    test('requires email, latitude and longitude', async () => {
      await signup(mockDriverReq, mockRes);

      const req = {};
      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        send(result) {
          expect(result[0]).toHaveProperty('email', mockDriverReq.body.email);
          expect(result[0]).toHaveProperty(
            'firstName',
            mockDriverReq.body.firstName
          );
          expect(result[0]).toHaveProperty(
            'lastName',
            mockDriverReq.body.lastName
          );
        },
      };

      await listDrivers(req, res);
    });
  });

  describe('searchDriver', () => {
    test('401 if wrong input name', async () => {
      const req = {
        query: {
          firstName: 123,
        },
      };

      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await searchDriver(req, res);
    });

    test('404 if not found driver', async () => {
      const req = {
        query: {
          firstName: 'John',
          lastName: 'Smith',
        },
      };

      const res = {
        status(status) {
          expect(status).toBe(404);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await searchDriver(req, res);
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

      await searchDriver(undefined, res);
    });

    test('search a driver by name', async () => {
      const req = {
        query: {
          firstName: 'Joey',
          lastName: 'Chen',
        },
      };

      await signup(mockDriverReq, mockRes);

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        send(result) {
          expect(result[0]).toHaveProperty('email', mockDriverReq.body.email);
          expect(result[0]).toHaveProperty(
            'firstName',
            mockDriverReq.body.firstName
          );
          expect(result[0]).toHaveProperty(
            'lastName',
            mockDriverReq.body.lastName
          );
        },
      };

      await searchDriver(req, res);
    });

    test('search many drivers by name', async () => {
      const req = {
        query: {
          lastName: 'Chen',
        },
      };

      await signup(mockDriverReq, mockRes);

      const mockReq = {
        ...mockDriverReq,
        body: {
          email: 'b@gmail.com',
          firstName: 'JK',
          lastName: 'Chen',
        },
      };

      await signup(mockReq, mockRes);

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        send(result) {
          expect(result).toHaveLength(2);
        },
      };

      await searchDriver(req, res);
    });
  });

  describe('getDriver', () => {
    test('400 if wrong driver id', async () => {
      const req = {
        params: {
          id: '123',
        },
      };

      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await getDriver(req, res);
    });

    test('404 not found', async () => {
      const req = {
        params: {
          id: mongoose.Types.ObjectId(),
        },
      };

      const res = {
        status(status) {
          expect(status).toBe(404);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await getDriver(req, res);
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

      await getDriver(undefined, res);
    });

    test('get driver by driver id', async () => {
      const req = {
        params: {
          id: null,
        },
      };

      await signup(mockDriverReq, {
        ...mockRes,
        send(result) {
          req.params.id = result._id.toString();
        },
      });

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

      await getDriver(req, res);
    });
  });
});
