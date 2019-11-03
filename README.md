Localz Driver Tracker
===

## Getting Started

Clone the repository
``` 
$ git clone https://github.com/joyfeel/localz-driver-tracker.git
$ cd localz-driver-tracker
```
Install yarn 
``` 
$ npm i -g yarn
```
Install packages
```
$ yarn
```
Set enviroment variables
```
$ cp .env.example .env
```

Then choose one of the following steps

### 1. Running with docker (Recommend)

Build application
``` 
$ npm run build
```
Build docker image
```
$ docker-compose build
```
Run docker container
```
$ docker-compose up -d
```

### 2. Running on local

Install mongo db on your local machine and launch it (open another terminal)
```
$ mongod
```

Run application
``` 
$ npm run dev
```

## Testing
Run tests
```
$ npm run test
```
Generate coverage report
```
$ npm run test:coverage
```

## Approaches

Create a `TrackerSession` entitity to connect the relationship between `Driver` and `Location`,
which allow user to track driver's locations by the tracker session id.

## Entities

* Driver
```json
{
  "id": "5dbe573c8b2d5208dc6afdc3",
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@gmail.com",
  "createdAt": "2019-11-03T04:27:40.983Z",
  "updatedAt": "2019-11-03T04:27:40.983Z",
}
```

* TrackerSession
```json
{
  "id": "5dbebde61732307969699d56",
  "isActive" : false, 
    "locationIds" : [
        ObjectId("5dbebe651732307969699d57"), 
        ObjectId("5dbebe908e1ec68b5ec61ef5"), 
        ObjectId("5dbebe918e1ec68b5ec61ef6"), 
    ], 
  "driverId" : "5dbe573c8b2d5208dc6afdc3", 
  "createdAt" : "2019-11-03T04:27:40.983Z",
  "updatedAt" : "2019-11-03T04:27:40.983Z",
}
```

* Location
```json
{
  "id": "5dbebe651732307969699d57",
  "coordinates": [
    -37.61381,          // latitude
    144.6660788,        // longitude
  ],
  "type" : "Point",
  "createdAt": "2019-11-03T04:27:40.983Z",
  "updatedAt": "2019-11-03T04:27:40.983Z",  
}
```

## API Resources
  - [POST /signup](#post-signup)
  - [POST /login](#post-login)
  - [POST /logout](#post-logout)
  - [POST /api/locations](#post-apilocations)
  - [GET /api/drivers](#get-apidrivers)
  - [GET /api/drivers/[id]](#get-apidriversid)
  - [GET /api/drivers/search?firstName=&lastName=](#get-apidriverssearchfirstNamelastName)
  - [GET /api/locations/active?driverId=](#get-apilocationsactivedriverId)
  - [GET /api/tracker_session/inactive?driverId=](#get-apitrackersessioninactivedriverId)  

### POST /signup

Request body:
```json
{
    "email": "john@gmail.com",
    "firstName": "John",
    "lastName": "Smith"
}
```
Response body:
```json
{
    "_id": "5dbebd961732307969699d55",
    "email": "john@gmail.com",
    "firstName": "John",
    "lastName": "Smith",
    "createdAt": "2019-11-03T11:44:22.160Z",
    "updatedAt": "2019-11-03T11:44:22.160Z"
}
```
### POST /login

Request body:
```json
{
    "email": "john@gmail.com"
}
```
Response body:
```json
{
    "_id": "5dbebd961732307969699d55",
    "email": "john@gmail.com",
    "firstName": "John",
    "lastName": "Smith",
    "createdAt": "2019-11-03T11:44:22.160Z",
    "updatedAt": "2019-11-03T11:44:22.160Z",
    "trackerSessionId": "5dbebde61732307969699d56"
}
```
### POST /logout

Request body:
```json
{
    "email": "john@gmail.com"
}
```

Response body:
```json
{
    "message": "Logout successful"
} 
```

### POST /api/locations

Request body:
```json
{
    "latitude": -31.61382, 
    "longitude": 144.6660788,
    "trackerSessionId": "5dbebde61732307969699d56"
}
```

Response body:
```json
{
    "_id": "5dbebde61732307969699d56",
    "isActive": true,
    "locationIds": [
        "5dbebe651732307969699d57"
    ],
    "driverId": "5dbebd961732307969699d55",
    "createdAt": "2019-11-03T11:45:42.880Z",
    "updatedAt": "2019-11-03T11:50:39.968Z"
}
```
### GET /api/drivers

Example: 
    
    /api/drivers

Response body:
```json
[
    {
        "_id": "5dbe573c8b2d5208dc6afdc3",
        "email": "joybee210@gmail.com",
        "firstName": "Joey",
        "lastName": "Chen",
        "createdAt": "2019-11-03T04:27:40.983Z",
        "updatedAt": "2019-11-03T04:27:40.983Z"
    },
    {
        "_id": "5dbebd961732307969699d55",
        "email": "john@gmail.com",
        "firstName": "John",
        "lastName": "Smith",
        "createdAt": "2019-11-03T11:44:22.160Z",
        "updatedAt": "2019-11-03T11:44:22.160Z"
    }
]
```

### GET /api/drivers/[driverId]

Example: 
```json    
/api/drivers/5dbebd961732307969699d55
```
Response body:
```json
{
    "_id": "5dbebd961732307969699d55",
    "email": "john@gmail.com",
    "firstName": "John",
    "lastName": "Smith",
    "createdAt": "2019-11-03T11:44:22.160Z",
    "updatedAt": "2019-11-03T11:44:22.160Z"
}
```
### GET /api/drivers/search?firstName=&lastName=

Example: 
```json
  /api/drivers/search?firstName=John&lastName=Chen
```
Response body:
```json
[
    {
        "_id": "5dbe573c8b2d5208dc6afdc3",
        "email": "joybee210@gmail.com",
        "firstName": "Joey",
        "lastName": "Chen",
        "createdAt": "2019-11-03T04:27:40.983Z",
        "updatedAt": "2019-11-03T04:27:40.983Z"
    },
    {
        "_id": "5dbebd961732307969699d55",
        "email": "john@gmail.com",
        "firstName": "John",
        "lastName": "Smith",
        "createdAt": "2019-11-03T11:44:22.160Z",
        "updatedAt": "2019-11-03T11:44:22.160Z"
    }
]
```

### GET /api/locations/active?driverId=

Example: 
    
    /api/locations/active?driverId=5dbd2683724d724ce8683ff

Response body:
```json
[
    {
        "_id": "5dbebde61732307969699d56",
        "locationIds": [
            {
                "_id": "5dbebebeae88a08f39a323a8",
                "coordinates": [
                    -31.61382,
                    144.6660788
                ],
                "createdAt": "2019-11-03T11:49:18.937Z",
                "updatedAt": "2019-11-03T11:49:18.937Z"
            },
            {
                "_id": "5dbebf01d35fb39420af72a8",
                "coordinates": [
                    -30.61382,
                    175.6660788
                ],
                "createdAt": "2019-11-03T11:50:25.039Z",
                "updatedAt": "2019-11-03T11:50:25.039Z"
            },
            {
                "_id": "5dbebf0f79fd2895a8e122d3",
                "coordinates": [
                    -11.41382,
                    194.6356788
                ],
                "createdAt": "2019-11-03T11:50:39.962Z",
                "updatedAt": "2019-11-03T11:50:39.962Z"
            }
        ]
    }
]
```

### GET /api/tracker_session/inactive?driverId=

Example: 
```json
/api/tracker_session/inactive?driverId=5dbe9e32496f612ae9cfbe18
```
Response body:
```json
[
    {
        "_id": "5dbe9e32496f612ae9cfbe18",
        "locationIds": [],
        "createdAt": "2019-11-03T09:30:26.106Z",
        "updatedAt": "2019-11-03T11:46:45.149Z"
    }
]
```