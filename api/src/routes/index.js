const { Router } = require("express");
const { characters } = require("../services/characters");

const router = Router();

const CHARACTER = "/repaso/character";
const EPISODE = "/repaso/episode";

router.get(CHARACTER, characters);
// router.post(CHARACTER);
// router.put(CHARACTER);
// router.delete(CHARACTER);
// router.get(EPISODE);

module.exports = router;