const express = require("express");
const CreateTask = require("../controllers/CreateTask");
const GetTasks = require("../controllers/GetTasks");
const UpdateTask = require("../controllers/UpdateTasks");
const DeleteTask = require("../controllers/DeleteTask");
const router = express.Router();

router.route("/todoPost").post(CreateTask);
router.route("/todoGet").get(GetTasks);
router.route("/todoUpdate/:id").put(UpdateTask);
router.route("/todoDelete/:id").delete(DeleteTask);

module.exports = router;
