const { Op } = require("sequelize");
const { getAllCharacters } = require("../controllers/getAllCharacters");
const { Character, Episode } = require("../db");

const characters = async (req, res) => {
  const { name, filter, page, order } = req.query;

  try {
    // const allCharacters = await getAllCharacters();
    if (name) {
      let nameCharacters = await Character.findAll({
        where: {
          name: {
            // [Op.iLike]: '%' + name + '%',
            [Op.iLike]: `%${name}`,
          }
        },
      });
      console.log("NOMBRES:", nameCharacters.length)

      return res.json(nameCharacters);
    } else if (filter) {
      const filterCharacters = await Character.findAll({
        where: {
          //* Se filtra por status
          status: filter,
        },
        //! Paginado hecho desde el back-end
        limit: 6,//* Trae los personajes del 1 - 6
        offset: page,//* Inicial de paginado
        //! Paginado hecho desde el back-end
        order: [["name", order]],//* ASC - DESC
        include: {
          model: Episode,
        }
      });
      
      return res.json(filterCharacters);
    } else {
      const allCharacters = await Character.findAll({
        //! Paginado hecho desde el back-end
        offset: page,//* Inicial de paginado
        limit: 6,//* Final paginado
        //! Paginado hecho desde el back-end
        order: [["name", order]],//* ASC - DESC
        includes: {
          model: Episode,
        }
      });

      return res.json(allCharacters);
    }
    // return res.json(allCharacters);
  } catch (error) {
    console.log("Error en la ruta principal por: ", error)
  }
}

module.exports = { characters }