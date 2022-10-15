const { Router } = require('express');

const { createGame, checkGameExists, makeBets } = require('../controllers/game');
const { gamePostValidator } = require('../middlewares/game-validator');

const router = Router();

router.get('/:id', checkGameExists);
router.post('/createGame', gamePostValidator, createGame);
router.put('/:id', makeBets);

module.exports = router;
