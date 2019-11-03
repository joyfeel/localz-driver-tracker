import validator from 'validator';
import { Driver } from '../driver/driver.model';
import { TrackerSession } from '../trackerSession/trackerSession.model';

export const signup = async (req, res, next) => {
  try {
    const email = req.body.email || '';
    const firstName = req.body.firstName || '';
    const lastName = req.body.lastName || '';

    if (
      !validator.isEmail(email) ||
      typeof firstName !== 'string' ||
      typeof lastName !== 'string'
    ) {
      return res.status(401).send({ message: 'Wrong input of email or name' });
    }

    const findDriver = await Driver.findOne({
      email,
    })
      .lean()
      .exec();

    if (findDriver) {
      return res.status(409).send({ message: 'Duplicated driver email' });
    }
    const newDriver = await Driver.create(req.body);
    return res.status(200).send(newDriver);
  } catch (e) {
    return res.status(500).end();
  }
};

export const login = async (req, res, next) => {
  try {
    const email = req.body.email || '';

    if (!validator.isEmail(email)) {
      return res.status(401).send({ message: 'Wrong input of email' });
    }

    const driver = await Driver.findOne(
      {
        email,
      },
      {
        __v: false,
      }
    )
      .lean()
      .exec();

    if (!driver) {
      return res.status(401).send({ message: 'Please go to signup' });
    }

    const trackerSession = await TrackerSession.findOne({
      driverId: driver._id,
      isActive: true,
    })
      .lean()
      .exec();

    if (trackerSession) {
      return res.status(200).send({
        ...driver,
        trackerSessionId: trackerSession._id,
      });
    }

    const newTrackerSession = await TrackerSession.create({
      driverId: driver._id,
      isActive: true,
    });

    return res.status(200).send({
      ...driver,
      trackerSessionId: newTrackerSession._id,
    });
  } catch (e) {
    return res.status(500).end();
  }
};

export const logout = async (req, res, next) => {
  try {
    const email = req.body.email || '';

    if (!validator.isEmail(email)) {
      return res.status(401).send({ message: 'Wrong input of email' });
    }

    const driver = await Driver.findOne({
      email,
    })
      .lean()
      .exec();

    if (!driver) {
      return res.status(401).send({ message: 'Invalid driver email' });
    }

    await TrackerSession.findOneAndUpdate(
      {
        isActive: true,
      },
      {
        isActive: false,
      },
      { new: true }
    )
      .lean()
      .exec();

    return res.status(200).send({ message: 'Logout successful' });
  } catch (e) {
    return res.status(500).end();
  }
};
