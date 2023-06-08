const { Episode } = require("../db");
const fetch = require("node-fetch");
require('dotenv').config()
const { URL_EPISODE } = process.env;

const getAllEpisodes = async (_, res) => {
  const episodeDb = await Episode.findAll();

  try {
    if (!episodeDb.length) {
      const resEpisodes = await fetch(URL_EPISODE);
      const { results } = await resEpisodes.json();

      let episodesApi = results.map(ep => {
        return {
          id: ep.id,
          name: ep.name,
        }
      });
      episodesApi = await Episode.bulkCreate(episodesApi);

      return res.json(episodesApi);
    } else {
      return res.json(episodeDb);
    }
  } catch (error) {
    return res.json({ error: "Error en API-EPISODE por:", error});
  }
}

module.exports = { getAllEpisodes }