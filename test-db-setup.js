import mongoose from 'mongoose'
import cuid from 'cuid'
import _map from 'lodash/map'
import config from './src/config'
import { Driver } from './src/resources/driver/driver.model'
import { Location } from './src/resources/location/location.model'
import { TrackerSession } from './src/resources/trackerSession/trackerSession.model'

const models = { Driver, Location, TrackerSession }

// tesing
const url = config.dbUrl;

global.newId = () => {
  return mongoose.Types.ObjectId()
}

const remove = collection =>
  new Promise((resolve, reject) => {
    collection.deleteOne(err => {
      if (err) return reject(err)
      resolve()
    })
  })

beforeEach(async done => {
  const db = cuid()
  function clearDB() {
    return Promise.all(_map(mongoose.connection.collections, c => remove(c)))
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(
        url + db,
        {
          useNewUrlParser: true,
          autoIndex: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }
      )
      await clearDB()
      await Promise.all(Object.keys(models).map(name => models[name].init()))
    } catch (e) {
      console.log('connection error')
      console.error(e)
      throw e
    }
  } else {
    await clearDB()
  }
  done()
})
afterEach(async done => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
  return done()
})
afterAll(done => {
  return done()
})
