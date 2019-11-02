import { Router } from 'express';
import { showInactiveTrackerSessions } from './trackerSession';

const router = Router();

// List inactive sessions for a driver by driverId
router.get('/inactive', showInactiveTrackerSessions);

export default router;
