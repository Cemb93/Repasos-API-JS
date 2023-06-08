require('dotenv').config()
const { API } = process.env;
const fetch = require("node-fetch");
const { Character, Episode } = require("../db");

const getAllCharacters = async () => {
  try {
    const characterDb = await Character.findAll({
      include: {
        model: Episode,
        attributes: ["name"],
        through: { attributes: [], },
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
          // console.log("ALL EPISODES:", episodeApi);
          return {
            name: el.name,
            status: el.status,
            // species: el.species,
            // type: !el.type.length ? "WHITOUT TYPE" : el.type,
            // gender: el.gender,
            // origin: el.origin.name,
            // location: el.location.name,
            image: el.image,
            // episodes: console.log("EACH EPISODE:", episodeApi),//ok
            // episodes: episodeApi,
          }
        });
        infoApi = await Promise.all(infoApi);
        // console.log("infoApi:", infoApi);//* Aca me muestra los episodios

        infoApi.forEach(async el => {
          // console.log("EACH EPISODE:", el.episodes);
          await Character.findOrCreate({
            where: {
              name: el.name,
              status: el.status,
              image: el.image,
              // episodes: el.episodes
            }
          });
        });
        
        //! Aca no aparecen los Episodios
        // infoApi = await Character.bulkCreate(infoApi);
        // console.log("infoApi CONVERTIDA:", JSON.parse(JSON.stringify(infoApi)));
        console.log("infoApi:", infoApi.length);
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

// await getAllCharacters();
module.exports = { getAllCharacters }