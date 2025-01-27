const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const Tasks = require("./models/Tasks");
const sequelize = require("./DataBase/db");
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});

const route = require("./routes/route");

app.use(route);

// const DBConnection = () => {
//   try {
//     const connection = mysql.createConnection({
//       host: process.env.DATABASEHOST,
//       port: process.env.DATABASEPORT,
//       user: process.env.DATABASEUSER,
//       password: process.env.DATABASEPASS,
//       database: process.env.DATABASENAME,
//     });
//     return connection;
//   } catch (err) {
//     console.log("Database connection error");
//     console.error(err);
//   }
// };
