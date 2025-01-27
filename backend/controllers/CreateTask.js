const sequelize = require("../DataBase/db");
const Tasks = require("../models/Tasks");

const CreateTask = async (req, res) => {
  try {
    // const con = await DBConnection();
    await sequelize.sync({ alter: true });
    console.log("Database synchronized");
    const data = req.body;
    const title = data.title;
    const description = data.description;
    // const query1 = "Select * from todos_table";
    // const [rows, fields] = await con.query(query1);
    // var id = rows.length + 1;
    // const query2 =
    //   "Insert into todos_table (id,title,description) values(?,?,?)";
    // await con.query(query2, [id, title, description], (err, results) => {
    //   if (err) {
    //     console.log("Error during inserting the data");
    //   } else {
    //     console.log("Data inserted successfully!! ");
    //   }
    // });

    await Tasks.create({ title, description }).then(() =>
      res.status(201).json(data)
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!!" });
  }
};

module.exports = CreateTask;
