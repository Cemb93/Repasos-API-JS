const { Router } = require("express");
const { characters } = require("../services/characters");
const { getAllEpisodes } = require("../controllers/getAllEpisodes");
const { postCharacter } = require("../services/post_character");

const router = Router();

const CHARACTER = "/repaso/character";
const EPISODE = "/repaso/episode";

router.get(CHARACTER, characters);
router.post(CHARACTER, postCharacter);
// router.put(CHARACTER);
// router.delete(CHARACTER);
router.get(EPISODE, getAllEpisodes);

module.exports = router;