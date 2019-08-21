# Graphql Sample Project:
This is a sample project. I used Node.js, ES7, Express, MongoDB, mongoose, and Graphql here. Its a simple backend server shows how to use Node.js, Express with MongoDB (mongoose) and Graphql, together.
In this project, we have a booking event system. You can create an event or book an event such as your birthday or wedding anniversary.

**Note :** This is a dev project, not a production version.

# Developer Note:

## Before Start:
- Please create a JSON file in the root folder and name it `nodemon.json`. 

**Note :** It will use to store the environment variable during dev mode. In production, you need to set them in another way.

- Copy and past below JSON object to `nodemon.json` file: 
```
{
  "env": {
    "MONGO_USER": "<your mongodb username in mongoDB Atlas>",
    "MONGO_PASSWORD": "<your mongodb password in mongoDB Atlas>",
    "MONGO_DB": "graphql-sample-db",
    "SECRET_KEY": "SuperSaltySecretKey"
  }
}
```

- Update fields in JSON file

## How to Run:
In the root folder, run:

- npm install
- npm start

## Health Check:
- Send a GET request to `/health-check` 
- You should be able to get the message: "The Server is Up & Healthy" in respond.
- You are fine

## How to Use:
To use Graphql, you just need to send a POST request to `/graphql`  endpoint with your favorite HTTP tools.
Please note you cannot send anything but POST to Graphql endpoint and put other details in the body.
Since graphic QL is enabled, it's much easier to interact with backend using browser.

- Create user
- Login with user and get token
- Set token in header (Bearer Token)
- Send a POST request to the server 
- Cheers

**Note:** You don't need to Authenticate for all routes. You can find more details in Queries and Mutations. 

## Models:
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
**NOTE :** The email should have a valid email format.

## API Defenition:
- Endpoint: `/graphql`
- Action: POST

## Queries:
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

## Mutations:
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

## To Do:
- Put related db hits in a Transaction
- Make sure each user can only delete his own event