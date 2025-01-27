const Tasks = require("../models/Tasks");

const GetTasks = async (req, res) => {
  try {
    // const con = await DBConnection();
    // const query = "Select * from todos_table";
    // const [rows, fields] = await con.query(query);
    var data = [];
    data = await Tasks.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error error");
  }
};

module.exports = GetTasks;
