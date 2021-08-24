<h1 align="center">Express - OneWord Blog App Website REST API</h1>

This API is created for backend of OneWord Blog App. OneWord blog app is blog that inspired from one of the blog site from Google called Blogger. This API is tested by Thunder Client extension from Visual Studio Code. This API are created with Express as Nodejs framework and MySQL as store database. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)


## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client">Thunder Client for VSCode</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](https://jsoneditoronline.org/#left=cloud.3851a618880e4a6390228b008860acba)
9. Type `npm run dev` to activated the server.

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_PORT= <YOUR SERVER PORT>
DB_HOST= <YOUR DATABASE HOST>
DB_USER= <YOUR DATABASE USERNAME>
DB_PASS= <YOUR DATABASE PASSWORD>
DB_DATABASES= <YOUR DATABASE NAME>

SMTP_EMAIL = <YOUR EMAIL>
SMTP_PASSWORD = <YOUR PASSWORD>
```

## Feature

1. Login and Register API
2. Update User's Profile
3. Create and Update Post
4. Create Comment for Post

## License

© [Muhammad Akbar Saladin Siregar](https://github.com/akbarsaladin36/)
