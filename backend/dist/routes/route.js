"use strict";

var express = require("express");
var CreateTask = require("../controllers/CreateTask");
var GetTasks = require("../controllers/GetTasks");
var UpdateTask = require("../controllers/UpdateTasks");
var DeleteTask = require("../controllers/DeleteTask");
var router = express.Router();
router.route("/todoPost").post(CreateTask);
router.route("/todoGet").get(GetTasks);
router.route("/todoUpdate/:id").put(UpdateTask);
router.route("/todoDelete/:id")["delete"](DeleteTask);
module.exports = router;