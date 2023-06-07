const { Character, Episode } = require("../db");

const postCharacter = async (req, res) => {
  const character = req.body;

  try {
    let newCharacter = await Character.create({
      name: character.name,
      status: character.status,
      // species: character.species,
      // type: character.type,
      // gender: character.gender,
      // origin: character.origin,
      // location: character.location,
      image: character.image || "",
    });

    let episode = await Episode.findAll({
      where: {
        name: character.episodes,
      }
    });

    newCharacter.addEpisode(episode);
    return res.json({ mesage: `El Personaje: ${character.name}, se creo exitosamente` });
  } catch (error) {
    return res.json({ error: "Error en POST por:", error });
  }
}

module.exports = { postCharacter }