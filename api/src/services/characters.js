const { Op } = require("sequelize");
const { getAllCharacters } = require("../controllers/getAllCharacters");
const { Character, Episode } = require("../db");

const characters = async (req, res) => {
  const { name, filterStatus, page, order } = req.query;

  try {
    await getAllCharacters();
    if (name) {
      const nameCharacters = await Character.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}`,
          }
        },
        include: {
          model: Episode,
          attributes: ["name"],
          through: { attributes: [], },
        }
      });
      console.log("NOMBRES:", nameCharacters.length)

      return res.json(nameCharacters);
    } else if (filterStatus) {
      const filterCharacters = await Character.findAll({
        where: {
          //* Se filtra por status
          status: filterStatus,
        },
        //! Paginado hecho desde el back-end
        offset: page,//* Inicial de paginado
        limit: 6,//* Trae los personajes del 1 - 6
        //! Paginado hecho desde el back-end
        order: [["name", order]],//* ASC - DESC
        include: {
          model: Episode,
          // attributes: ["name"],
          // through: { attributes: [], },
        }
      });
      
      return res.json(filterCharacters);
    } else {
      const allCharacters = await Character.findAll({
        //! Paginado hecho desde el back-end
        offset: page,//* Inicial de paginado
        limit: 6,//* Final paginado
        //! Paginado hecho desde el back-end
        // order: [["name", order]],//* ASC - DESC
        include: {
          model: Episode,
          attributes: ["name"],
          through: { attributes: [], },
        }
      });

      return res.json(allCharacters);
    }
  } catch (error) {
    console.log("Error en la ruta principal por: ", error)
  }
}

module.exports = { characters }