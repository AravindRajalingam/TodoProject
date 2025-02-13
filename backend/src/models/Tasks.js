const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase/db");

const Tasks = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "todos_table",
    timestamps: true,
  }
);

module.exports = Tasks;
