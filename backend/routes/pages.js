const { Router } = require('express');
const { getGamePage } = require('../controllers/game');

const router = Router();

router.get('/winner/:id', getGamePage);

module.exports = router;
