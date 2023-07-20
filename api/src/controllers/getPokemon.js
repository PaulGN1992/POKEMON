const axios = require('axios')
const URL = "https://pokeapi.co/api/v2/pokemon?limit=360"
const {Tipo, Pokemon} = require('../db')
const {Op} = require('sequelize')

const getAllPokemon = async() =>{

  const pokeApi = await axios.get(URL);
  const pokemons = await Promise.all(
    pokeApi.data.results.map(async (p)=> 
  {
    const {data} = await axios.get(p.url);
    return {
        ID: data.id,
        Nombre: data.name,
        Imagen: data.sprites.other.home.front_default,
        Vida: data.stats[0].base_stat,
        Ataque: data.stats[1].base_stat,
        Defensa: data.stats[2].base_stat,
        Velocidad: data.stats[5].base_stat,
        Altura: data.height,
        Peso: data.weight,
        Tipos: data.types.map((e)=> ({Nombre: e.type.name})),
        Creado: false
  
    }
  }))
  const pokemonDB = await Pokemon.findAll({
    include: {
      model: Tipo,
      attributes: ["Nombre"],
      through: {attributes: []},
    },
  })
  
  console.log(pokemonDB)

  return [...pokemons, ...pokemonDB];
}
const getPokemonName = async(name) =>{
    const nameLowerCase = name.toLowerCase()
    
    const pokemonDB = await Pokemon.findOne(
      {where: {
        Nombre: {[Op.iLike]: `%${nameLowerCase}%`}},
      include: {
          model: Tipo,
          attributes: ["Nombre"],
          through: {attributes: []},
      }
      });

      if (!pokemonDB) {
        try {
          const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${nameLowerCase}`
          );
          const pokemon = {
            ID: data.id,
            Nombre: data.name,
            Imagen: data.sprites.other.home.front_default,
            Vida: data.stats[0].base_stat,
            Ataque: data.stats[1].base_stat,
            Defensa: data.stats[2].base_stat,
            Velocidad: data.stats[5].base_stat,
            Altura: data.height,
            Peso: data.weight,
            Creado: false,
            Tipos: data.types.map((e) => ({ Nombre: e.type.name })),
          };
          return pokemon;
        } catch (error) {
          return null;
        }
      } else {
        return pokemonDB;
      }
}

const getPokemon = async (req, res) => {
    const {name} = req.query;
    try {
      const allPokemon = name? await getPokemonName(name) :await getAllPokemon()
      if (allPokemon === null) {
        res.status(404).json({ message: "No existe el nombre del Pokémon" });
      } else {
        res.status(200).json(allPokemon);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  module.exports = getPokemon