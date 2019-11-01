import { Router } from 'express';
import { setLocationForTrackerSession } from './location';

const router = Router();

// Submit a location for a session
router.post('/', setLocationForTrackerSession);

export default router;
