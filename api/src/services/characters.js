const { getAllCharacters } = require("../controllers/getAllCharacters")

const characters = async (req, res) => {
  try {
    const allCharacters = await getAllCharacters();
    return res.json(allCharacters);
  } catch (error) {
    console.log("Error en la ruta principal por: ", error)
  }
}

module.exports = { characters }