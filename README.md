# Simple CRUD API

## Description
This is a simple CRUD API that utilizes an in-memory database. This API allows for basic data operations: Create, Read, Update, and Delete. The in-memory database provides quick access to data, making this API ideal for application development and testing. However, it’s important to note that data stored in memory can be lost upon system reboot.

## Installation
1) Before you start, make sure to fork the repository. 
2) After forking, you should clone the repository to your local machine.
3) Then, to install the necessary dependencies, execute the following command: ```npm install```

## User's guide
1) You should also add a ```.env``` file to your project with the following content ```PORT={PORT_NUMBER}``` (e.g ```PORT=3000```). If the PORT variable is not specified in the .env file, the server will default to running on port 3000.
2) Once the setup is complete, you have four modes to start the application:
 - ```npm run start:dev``` - This will start a single process in development mode.
 - ```npm run start:prod``` - This will start a single process in production mode.
 - ```npm run start:multidev``` - This will start a cluster in development mode.
 - ```npm run start:multiprod``` - This will start a cluster in production mode.
3) In addition to previous steps, test scenarios for the application can also be run. To do this, use the command ```npm run test```. This will execute the test cases defined in the project, helping to ensure that the application is working as expected before deployment.

## Endpoints

1) **GET** ```api/users``` is used to get a array all persons
2) **GET** ```api/users/${userId}``` is used to get a specific user’s details if it exists
3) **POST** ```api/users``` is used to create record about new user and store it in database
4) **PUT** ```api/users/{userId}``` is used to update existing user
5) **DELETE** ```api/users/${userId}``` is used to delete existing user from database

  ### Data model
  ```js
  [
    {
      id: string //Unique identifier (uuid) generated on server side
      username: string //User's name (required)
      age: number //User's age (required)
      hobbies: [] | string[] //User's hobbies (required)
    },
    ...
  ]
  ```