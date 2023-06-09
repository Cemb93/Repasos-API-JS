const { Router } = require("express");
const { characters } = require("../services/Rick_Morty/characters");
const { getAllEpisodes } = require("../controllers/Rick_Morty/getAllEpisodes");
const { postCharacter } = require("../services/Rick_Morty/post_character");

const router = Router();

const CHARACTER = "/repaso/character";
const EPISODE = "/repaso/episode";

router.get(CHARACTER, characters);
router.post(CHARACTER, postCharacter);
// router.put(CHARACTER);
// router.delete(CHARACTER);
router.get(EPISODE, getAllEpisodes);

module.exports = router;