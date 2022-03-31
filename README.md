Read Bahasa Indonesia version of README [here](https://github.com/babelianrr/waysbucks-app/blob/main/README-id.md)

# WaysBucks
The initial version of WaysBucks by babelianrr.
I've fixed some codes to improve this project, thought there's still some bugs around.

## Getting started
- Clone the repository to your machine.
- Run `npm install` to install dependencies.
- Import `waysbucks.sql` to phpMyAdmin.
  - Don't forget to configure database on `server/config/config.json`
  - Admin's credential is:
    ```
    "email": "admin@tbc.net",
    "password": "123456"
    ```
  - User's credential is:
    ```
    "email": "bayupks@tbc.net",
    "password": "123456"
    ```
- Navigate to `server` folder then use command `npm run dev` to run the app.
- You can also run the backend only to test, simply navigate to `server` folder then use command `npm start`.
  - API routes can be found on `server/src/routes/index.js`.
  - Run API using Postman or Thunder Client.

### What users can do:
- Registering and logging in.
- Creating transactions.
- Checking profile (can't access profile page fixed).

### What admins can do:
- Checking and managing transactions.
- Adding & removing products.
- Updating products.
- Checking users and transactions count and estimated income on Dashboard (incompleted feature).

### Known bugs
- When switching language then navigating to other page, language selection changes into English, thought the language still the same (to switch back to English just click the rendered language then click English again).
