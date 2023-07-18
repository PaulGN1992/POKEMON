const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getTypes = require('../controllers/getTypes')
const getPokemon = require('../controllers/getPokemon')
const getPokemonById = require('../controllers/getPokemonId')
const postPokemon = require('../controllers/postPokemon')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokemon)
router.get('/types', getTypes)
router.post('/pokemons', postPokemon)
router.get('/pokemons/:id', getPokemonById)


module.exports = router;
