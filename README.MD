An API created with expressJS. It has register and login functionality. Jobs are private to the user who created them, once you logged in you can create, get, update, and delete jobs.

<a href="https://jobs-api-qomp.onrender.com/">api link</a>
<a href="https://jobs-api-qomp.onrender.com/api-docs/#/">docs</a>

#### Setup

If you want to use this API as a template, you have to create a .env file contains MONGO_URI(link for the mongo db), JWT_SECRET(your secret key while decoding JWT), JWT_LIFETIME(token lifetime) variables and values.

```bash
npm install && npm start
```


#### Security

- helmet
- cors
- xss-clean
- express-rate-limit
