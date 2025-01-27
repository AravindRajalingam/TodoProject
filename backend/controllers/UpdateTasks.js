const Tasks = require("../models/Tasks");

const UpdateTask = async (req, res) => {
  try {
    // const con = await DBConnection();
    const id = req.params.id;
    const data = req.body;
    const title = data.title;
    const description = data.description;
    // const query = "Update todos_table set title=? , description=? where id=?";
    // await con.query(query, [title, description, id], (err, results) => {
    //   if (err) {
    //     console.log("Error during updating the data");
    //   } else {
    //     console.log("Data updated successfully!! ");
    //   }
    // });
    const count = await Tasks.update(
      {
        title: title,
        description: description,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (count > 0) {
      res.status(204).send();
    } else {
      console.log("No records found for given id : ", id);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error error");
  }
};

module.exports = UpdateTask;
