import { Router } from 'express';
import {
  setLocationForTrackerSession,
  showLocationsWithTrackerSession,
} from './location';

const router = Router();

// Submit a location for a session
router.post('/', setLocationForTrackerSession);

// List locations for a driver's active session
router.get('/active', showLocationsWithTrackerSession);

export default router;
