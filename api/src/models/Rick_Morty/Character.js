const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("character", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      //* Estas son las únicas opciones
      type: DataTypes.ENUM('Alive', 'Dead', 'unknown'),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //* Este sería mi personaje
    mine: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    timestamps: false,
  });
};
