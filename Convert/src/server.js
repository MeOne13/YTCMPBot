'use strict';
require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 1488;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
