import { Driver } from './driver.model';

export const listDrivers = async (req, res, next) => {
  const drivers = await Driver.find({}, { __v: false })
    .lean()
    .exec();

  return res.status(200).send(drivers);
};

export const searchDriver = async (req, res, next) => {
  try {
    const { firstName } = req.query;
    const { lastName } = req.query;

    // Can input either one
    if (typeof firstName !== 'string' && typeof lastName !== 'string') {
      return res
        .status(400)
        .send({ message: 'Wrong input of firstName and lastName' });
    }

    const drivers = await Driver.find(
      {
        $or: [{ firstName }, { lastName }],
      },
      { __v: false }
    )
      .lean()
      .exec();

    if (drivers.length === 0) {
      return res.status(404).send({ message: 'Not found match driver' });
    }

    return res.status(200).send(drivers);
  } catch (e) {
    return res.status(500).end();
  }
};

export const getDriver = async (req, res, next) => {
  try {
    const driverId = req.params.id;

    if (typeof driverId !== 'string') {
      return res.status(400).send({ message: 'Wrong input of driver ID' });
    }

    const driver = await Driver.findById(driverId, { __v: false })
      .lean()
      .exec();

    return res.status(200).send(driver);
  } catch (e) {
    return res.status(500).end();
  }
};
