const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userCheckController = require('./routes/user/user-check-controller.js');
const { userLoginController } = require('./routes/user/user-login-controller');
const router = require('./routes/router.js');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();
const port = process.env.PORT || 3001;

const allowedOrigins = Array(4)
  .fill(0)
  .map((_, i) => `http://localhost:300${i}`);

app.use(
  cors({ methods: ['GET', 'POST'], origin: allowedOrigins, credentials: true }),
);
app.use(cookieParser());
app.post('/login', userLoginController);
app.use(userCheckController);
app.use(router);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`sunucu ${port} nolu portta başladı.`));
