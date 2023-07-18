const axios = require('axios');
const {Pokemon, Tipo} = require('../db')

const getPokemonID = async (id, source) =>{
    if(source === "API") {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
            Tipos: data.types.map((e)=> ({Nombre: e.type.name})),
            Creado: false,
            
        };
        return pokemon
    } else {
        const pokemonDB = await Pokemon.findByPk(id, {
            include: {
                  model: Tipo,
                  attributes: ["Nombre"],
                  through: {attributes: []},
            }
        })
        return pokemonDB
    }
}

const getPokemonById = async (req, res) => {
    const {id} = req.params;
    const source = isNaN(id)? "DB" : "API";
    try {
        const pokemon = await getPokemonID(id, source)
        res.status(200).json(pokemon)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = getPokemonById