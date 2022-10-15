const Game = require("../models/game");
const Player = require("../models/player");

const getARandomNumber = require("../helpers/get-random-number");

const checkGameExists = async(req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findById(id);
    const player_1 = await Player.findById( game.gamers[0] );
    const player_2 = await Player.findById( game.gamers[1] );
    const player_3 = await Player.findById( game.gamers[2] );

    game.winner = player_1;
    await game.save();

    res.json({
        error: false,
        player_1: player_1.name,
        player_2: player_2.name,
        player_3: player_3.name,
      }
    );
  } catch (error) {
    res.json({
      error: true,
      message: error.message
    });
  }
}

const getGamePage = async(req, res) => {
  const { id } = req.params;

  try {
    const game = await Game.findById(id);
    const player_1 = await Player.findById( game.gamers[0] );
    const player_2 = await Player.findById( game.gamers[1] );
    const player_3 = await Player.findById( game.gamers[2] );

    game.winner = player_1;
    await game.save();
    
    res.render('winner', {
        player_1: player_1.name,
        player_2: player_2.name,
        player_3: player_3.name,
        winner: game.winner.name
      }
    );
  } catch (error) {
    console.log(error)
    return res.send({
        message: error.message
      }
    )
  }
}

const createGame = async(req, res) => {
  const { player_1, player_2, player_3 } = req.body;
  try {
    const playerOne = new Player({ name: player_1 });
    const playerTwo = new Player({ name: player_2 });
    const playerThree = new Player({ name: player_3 });
    
    await playerOne.save();
    await playerTwo.save();
    await playerThree.save();
    
    const modelData = {
      gamers: [
        playerOne, 
        playerTwo, 
        playerThree 
      ]
    }
    const game = new Game(modelData);
    await game.save();

    return res.json(game);    
  } catch (error) {
    res.send({
      message: error.message
    });
  }
}

const makeBets = async(req, res) => {
  const { id } = req.params;
  const { player_1, player_2, player_3 } = req.body;
  const diceRoll = getARandomNumber();

  try {
    const game = await Game.findById(id);

    const player_model_1 = await Player.findById( game.gamers[0] );
    const player_model_2 = await Player.findById( game.gamers[1] );
    const player_model_3 = await Player.findById( game.gamers[2] );

    player_model_1.bet = player_1;
    player_model_2.bet = player_2;
    player_model_3.bet = player_3;

    await player_model_1.save();
    await player_model_2.save();

    switch (diceRoll) {
      case player_1:
        game.winner = player_model_1;
        game.save();
        break;
      case player_2:
        game.winner = player_model_2;
        game.save();
        break;
      case player_3:
        game.winner = player_model_3;
        game.save();
        break;
      default:
        console.log(player_1, player_2, player_3);
        game.winner = null;
        game.save();
        break;
    }

    res.json(game);
  } catch (error) {
    res.json({
      error: true,
      message: error.message
    });
  }
}

module.exports = { 
  createGame,
  getGamePage,
  checkGameExists,
  makeBets
}
