import { Router } from 'express';
import {
  showActiveLocations,
  showInactiveTrackerSessions,
} from './trackerSession';

const router = Router();

// List locations for a driver's active session
router.get('/active', showActiveLocations);

// List inactive sessions for a driver by driverId
router.get('/inactive', showInactiveTrackerSessions);

export default router;
