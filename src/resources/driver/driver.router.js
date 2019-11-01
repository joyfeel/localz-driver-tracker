import { Router } from 'express';
import { listDrivers, searchDriver, getDriver } from './driver';

const router = Router();

// List drivers
router.get('/', listDrivers);

// Search driver by name
router.get('/search', searchDriver);

// Retrieve a driver by driver ID
router.get('/:id', getDriver);

export default router;
