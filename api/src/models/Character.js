const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("character", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Alive', 'Dead', 'unknown'),
      allowNull: false,
    },
    // species: {
    //   type: DataTypes.STRING,
    // },
    // type: {
    //   type: DataTypes.STRING,
    // },
    // gender: {
    //   type: DataTypes.STRING,
    // },
    // origin: {
    //   type: DataTypes.STRING,
    // },
    // location: {
    //   type: DataTypes.STRING,
    // },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // episodes: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    // },
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
