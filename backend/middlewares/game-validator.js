const Ajv = require('ajv');

const ajv = new Ajv();

const taskPostSchema = {
  type: 'object',
  properties: {
    player_1: { type: 'string' },
    player_2: { type: 'string' },
    player_3: { type: 'string' },
  },
  required: ['player_1', 'player_2', 'player_3'],
  additionalProperties: false
}

const postValidator = ajv.compile(taskPostSchema);

const gamePostValidator = async( req, res, next ) => {
  const valid = await postValidator( req.body );
  if (!valid) return res.status(400).send(postValidator.errors), console.log('bad');

  return next();
}

module.exports = {
  gamePostValidator,
}
