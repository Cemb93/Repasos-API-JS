const { Op } = require("sequelize");
const { allCharacters } = require("../controllers/getAllCharacters");
const { Character, Episode } = require("../db");

const characters = async (req, res) => {
  const { name, filterStatus, page, order } = req.query;

  try {
    const allCharacter = await allCharacters();
    if (name) {
      const filterName = allCharacter.filter(el => {
        return el.name.toLowerCase().includes(name.toLowerCase());
      });
      
      let firstName = [];
      if (filterName.length) {
        for (let i = 0; i < filterName.length; i++) {
          firstName.push(filterName[i]);
          if (firstName.length === 3) {
            console.log("firstname:", firstName.length);
            return res.json(firstName);
          }
        }
      } else {
        return res.json({ mesage: `El personaje ${name.toUpperCase()} no existe` });
      }
    } else if (page) {
      let firstCharacter = [];
      for (let i = 0; i < allCharacter.length; i++) {
        firstCharacter.push(allCharacter[i]);
        console.log("firstCharacter:", firstCharacter.length);
        if (firstCharacter.length >= page && firstCharacter.length === 3) {
          return res.json(firstCharacter);
        }
      }
      // return res.json(allCharacter);
    }
  } catch (error) {
    return res.json({ error: "Error en la ruta principal por: ", error });
  }
}

module.exports = { characters }

//? Paginado y Filtrado con Sequelize
// const characters = async (req, res) => {
//   const { name, filterStatus, page, order } = req.query;

//   try {
//     await getAllCharacters();
//     if (name) {
//       const nameCharacters = await Character.findAll({
//         where: {
//           name: {
//             [Op.iLike]: `%${name}`,
//           }
//         },
//         include: {
//           model: Episode,
//           attributes: ["name"],
//           through: { attributes: [], },
//         }
//       });
//       console.log("NOMBRES:", nameCharacters.length)

//       return res.json(nameCharacters);
//     } else if (filterStatus) {
//       const filterCharacters = await Character.findAll({
//         where: {
//           //* Se filtra por status
//           status: filterStatus,
//         },
//         //! Paginado hecho desde el back-end
//         offset: page,//* Inicial de paginado
//         limit: 6,//* Trae los personajes del 1 - 6
//         //! Paginado hecho desde el back-end
//         order: [["name", order]],//* ASC - DESC
//         include: {
//           model: Episode,
//           attributes: ["name"],
//           through: { attributes: [], },
//         }
//       });
      
//       return res.json(filterCharacters);
//     } else {
//       const allCharacters = await Character.findAll({
//         //! Paginado hecho desde el back-end
//         offset: page,//* Inicial de paginado
//         limit: 6,//* Final paginado
//         //! Paginado hecho desde el back-end
//         // order: [["name", order]],//* ASC - DESC
//         include: {
//           model: Episode,
//           attributes: ["name"],
//           through: { attributes: [], },
//         }
//       });

//       return res.json(allCharacters);
//     }
//   } catch (error) {
//     console.log("Error en la ruta principal por: ", error)
//   }
// }

// module.exports = { characters }