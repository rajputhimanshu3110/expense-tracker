const express = require('express');
const cors = require('cors');
const router = require('./router');
const connection = require('./midllewares/db');
const dotenv = require("dotenv");
dotenv.config();

connection();
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);




app.listen(process.env.PORT, () => {
  //console.log("Server Started at " + process.env.PORT);
});
