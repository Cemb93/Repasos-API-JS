const { Op } = require("sequelize");
const { getAllCharacters } = require("../../controllers/Rick_Morty/getAllCharacters");
const { Character, Episode } = require("../../db");

//? Paginado y Filtrado con Sequelize
const characters = async (req, res) => {
  const { name, filterStatus, page, order } = req.query;

  try {
    await getAllCharacters();
    if (name) {
      const nameCharacters = await Character.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          }
        },
        include: {
          model: Episode,
          attributes: ["name"],
          through: { attributes: [], },
        }
      });

      return res.json(nameCharacters);
    } else if (filterStatus) {
      const filterCharacters = await Character.findAll({
        where: {
          //* Se filtra por status
          //! Se pueden filtros combinados, pero no pueden ser opcionales
          status: filterStatus,
        },
        //! Paginado hecho desde el back-end
        offset: page,//* Inicial de paginado
        limit: 6,//* Trae los personajes del 1 - 6
        //! Paginado hecho desde el back-end
        order: [["name", order]],//* ASC - DESC
        include: {
          model: Episode,
          attributes: ["name"],
          through: { attributes: [], },
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

const characterDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const characterId = await Character.findByPk(id, {
      include: {
        model: Episode,
        attributes: ["name"],
        through: { attributes: [], },
      }
    });

    return res.json(characterId);
  } catch (error) {
    return res.json({ error: "Error en characterDetail por:", error });
  }
}

module.exports = { characters, characterDetail }