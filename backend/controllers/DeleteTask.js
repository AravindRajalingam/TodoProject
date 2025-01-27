const Tasks = require("../models/Tasks");

const DeleteTask = async (req, res) => {
  try {
    // const con = await DBConnection();
    // const id = req.params.id;
    // const query = "Delete from todos_table where id=?";
    // await con.query(query, [id], (err, results) => {
    //   if (err) {
    //     console.log("Error during deleting the data");
    //   } else {
    //     console.log("Data deleted successfully!! ");
    //   }
    // });
    const id = req.params.id;
    const count = await Tasks.destroy({
      where: {
        id: id,
      },
    });
    if (count > 0) {
      res.status(200).json({ message: "Task deleted successfully!!" });
    } else {
      console.log("No records found for given id : ", id);
      res.status(200).json({ message: "No tasks found for given id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error error");
  }
};

module.exports = DeleteTask;
