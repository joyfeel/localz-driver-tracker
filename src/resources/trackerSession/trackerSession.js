import { TrackerSession } from './trackerSession.model';

export const showActiveLocations = async (req, res, next) => {
  try {
    const { driverId } = req.query;
    if (typeof driverId !== 'string') {
      return res.status(401).send({ message: 'Wrong input of driver ID' });
    }

    const activeSessions = await TrackerSession.find(
      {
        driverId,
        isActive: true,
      },
      { locationIds: true }
    )
      .populate('locationIds')
      .lean()
      .exec();

    return res.status(200).send(activeSessions);
  } catch (e) {
    return res.status(500).end();
  }
};

export const showInactiveTrackerSessions = async (req, res, next) => {
  try {
    const { driverId } = req.query;
    if (typeof driverId !== 'string') {
      return res.status(401).send({ message: 'Wrong input of driver ID' });
    }

    const inactiveSessions = await TrackerSession.find(
      {
        driverId,
        isActive: false,
      },
      { __v: false }
    )
      .populate('locationIds')
      .lean()
      .exec();

    return res.status(200).send(inactiveSessions);
  } catch (e) {
    return res.status(500).end();
  }
};
