const { Character, Episode } = require("../db");

const postCharacter = async (req, res) => {
  const character = req.body;
  console.log("RELATION EPISODES:", character.episodes);

  try {
    let newCharacter = await Character.create({
      name: character.name,
      status: character.status,
      // species: character.species,
      // type: character.type,
      // gender: character.gender,
      // origin: character.origin,
      // location: character.location,
      image: character.image || "https://qph.cf2.quoracdn.net/main-qimg-3fcc332d13420c84874c24ed925fbc47.webp",
      mine: character.mine,
    });
    // console.log("newCharacter:", newCharacter.__proto__);
    
    let episode = await Episode.findAll({
      where: {
        name: character.episodes,
      }
    });
    
    newCharacter.addEpisode(episode);
    // console.log("CREADO:", newCharacter);
    return res.json({ mesage: `El Personaje: (${character.name.toUpperCase()}), se creo exitosamente` });
  } catch (error) {
    return res.json({ error: "Error en POST por:", error });
  }
}

module.exports = { postCharacter }