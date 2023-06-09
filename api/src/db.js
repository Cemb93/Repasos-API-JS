require('dotenv').config()
const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')
const { SQL, USER, PASSWORD, HOST, DB } = process.env;

const sequelize = new Sequelize(`${SQL}://${USER}:${PASSWORD}@${HOST}/${DB}`,{
  logging: false,
  native: false,
});
const basename = path.basename(__filename)

const modelDefiners = []

fs.readdirSync(path.join(__dirname, '/models/Rick_Morty'))
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    return modelDefiners.push(require(path.join(__dirname, '/models/Rick_Morty', file)));
  })

modelDefiners.forEach((model) => model(sequelize))

let entries = Object.entries(sequelize.models)
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1), entry[1],
])
sequelize.models = Object.fromEntries(capsEntries)

const {Character, Episode} = sequelize.models;

Character.belongsToMany(Episode, { through: 'Character_Episode' });
Episode.belongsToMany(Character, { through: 'Character_Episode' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
}