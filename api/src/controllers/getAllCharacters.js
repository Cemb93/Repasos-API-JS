require('dotenv').config()
const { API } = process.env;
const fetch = require("node-fetch");
const { Character, Episode } = require("../db");

//! NOTA: No se puede guardar la API, la propiedad "episodes" COLICIONA al Relacionar
const characterApi = async () => {
  try {
    const characterApi = await fetch(API);
    const { results } = await characterApi.json();

    let infoApi = results.map(async el => {
      let episodeApi = el.episode.map(async ep => {
        let allNames = await fetch(ep);
        let { name } = await allNames.json();

        return name;
      });
      episodeApi = await Promise.all(episodeApi);
      return {
        id: el.id,
        name: el.name,
        status: el.status,
        image: el.image,
        episodes: episodeApi,
      }
    });
    infoApi = await Promise.all(infoApi);
    console.log("infoApi:", infoApi.length);
    return infoApi;
  } catch (error) {
    throw ("Error en characterApi por: ", error);
  }
}

const characterInDb = async () => {
  try {
    const characterDb = await Character.findAll({
      include: {
        model: Episode,
        attributes: ["name"],
        through: { attributes: [], },
      }
    });

    return characterDb;
  } catch (error) {
    throw ("Error en characterDb por:", error);
  }
}

const allCharacters = async () => {
  const infoApi = await characterApi();
  const infoDb = await characterInDb();

  return [...infoDb, ...infoApi];
}

module.exports = { allCharacters }