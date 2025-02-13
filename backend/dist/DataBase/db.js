"use strict";

var _require = require("sequelize"),
  Sequelize = _require.Sequelize;
var path = require("path");
var dotenv = require("dotenv");
var mysql = require("mysql2/promise");
dotenv.config({
  path: path.join(__dirname, "config", "config.env")
});
var sequelize = new Sequelize("todos_db", "root", "aravind@2004", {
  host: "localhost",
  port: "3306",
  dialect: "mysql"
});
sequelize.authenticate().then(function () {
  return console.log("Database Connected");
})["catch"](function (err) {
  return console.log("Error occured:", err);
});
module.exports = sequelize;