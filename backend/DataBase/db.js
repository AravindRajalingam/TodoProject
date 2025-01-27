const { Sequelize } = require("sequelize");
const path = require("path");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const sequelize = new Sequelize("todos_db", "root", "aravind@2004", {
  host: "192.168.183.150",
  port: "3306",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error occured:", err));

module.exports = sequelize;
