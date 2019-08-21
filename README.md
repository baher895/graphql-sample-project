# graphql-sample-project
This a sample project. I used Node.js, ES7, Express, Mongodb and Graphql here. Its a simple Back end server shows how to use Node.js, Express with Mongodb (mongoose) and Graphql.
In this project we have a booking event system. You can create and event or book and event such as your birthday or wedding aniversery.

**Note :** This is a dev sample project, not for production.

## Developer Note:
### Before Start:
- Please create a JSON file in root folder and name it `nodemon.json`. 

**Note :** it will use to store enviroment ariable during dev mode. in production you need to set them in other way.

- copy and past: 
```
{
  "env": {
    "MONGO_USER": "<your mongodb username in Mongo Atlas>",
    "MONGO_PASSWORD": "<your mongodb password in Mongo Atlas>",
    "MONGO_DB": "graphql-sample-db",
    "SECRET_KEY": "SuperSaltySecretKey"
  }
}
```

- update fields in .json file

### How to Run:
```
In root folder, run:
```
- npm install
- npm start

### Health Check:
- send a GET request to /health-check 
- you should be able to get the message: "The Server is Up & Healthy" in respond.
- You are fine

### How to Use:
```
to use graphql, you just need to send POST request to /graphql end point with your favourate http tools.
please note you can noty send anything but POST to graphql end point and put other details in body.
open 
```
- Create User
- Login with User and get token
- Set token in header (Bearer Token)
- send request to the server 
- Cheers

**Note:** You dont need to Authenticate for all routs. you can find more details in API definition. 

### Models:
- Booking:
```
event
user
createdAt
updatedAt
```

- Event:
```
title
description
price
date
creator
```

- User:
```
email
password
createdEvents
```
**NOTE :** Email should has valid email format

### API Defenition:
- end point: /graphql
- verb: POST
- body:
```
mutation:
query:
```

### Queries:
- login
```
Authentication: Not required
Input: 
  email: String!
  password: String!
Output: 
{
  userId: ID!
  token: String!
  tokenExpiration: Int!
}
```

- events
```
Authentication: Not required
Input: None
Output:
[
  {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }
]
```

- bookings
```
Authentication: Required
Input: None
Output: 
[
  {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String
    updatedAt: String
  }
]
```

### Mutations:
- createUser
```
Authentication: Not required
Input: 
  userInput: {
    email: String!
    password: String!
  }
Output:
{
  _id: ID!
  email: String!
  password: String
  createdEvents: [Event!]
}
```

- createEvent
```
Authentication: Required
Input:
  eventInput: {
    title: String!
    description: String!
    price: Float!
    date: String!
  }
Output:
{
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User!
}
```

- bookEvent
```
Authentication: Required
Input:
  eventId: ID!
Output:
{
  _id: ID!
  event: Event!
  user: User!
  createdAt: String
  updatedAt: String
}
```

- cancelBooking
```
Authentication: Required
Input:
  bookingId: ID!
Output:
{
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User!
}
```

### To Do:
- Put related db hits in a Transaction
- Make sure each user can only delete his own event