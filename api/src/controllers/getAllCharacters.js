require('dotenv').config()
const { API } = process.env;
const fetch = require("node-fetch");
const { Character, Episode } = require("../db");

const getAllCharacters = async () => {
  try {
    const characterDb = await Character.findAll({
      includes: {
        model: Episode,
      }
    });
    console.log("characters in db:", characterDb.length)
    
    if (!characterDb.length) {
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
            species: el.species,
            type: !el.type.length ? "WHITOUT TYPE" : el.type,
            gender: el.gender,
            origin: el.origin.name,
            location: el.location.name,
            image: el.image,
            episode: episodeApi,
          }
        });
        infoApi = await Promise.all(infoApi);
        console.log("infoApi:", infoApi.length);

        infoApi = await Character.bulkCreate(infoApi);
        return infoApi;
      } catch (error) {
        console.log("Error en la API por: ", error)
      }
    } else {
      return characterDb;
    }
  } catch (error) {
    console.log("Error en DB por: ", error)
  }
}

module.exports = { getAllCharacters }