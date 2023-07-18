const axios = require('axios')
const URL = "https://pokeapi.co/api/v2/type"
const {Tipo} = require('../db')


const getTypes = async (req, res) => {
  
  try {
    const {data} = await axios(URL)
        const types = [];
        data.results.map((e) => types.push(e.name))
        
        for ( let name of types ) {
        await Tipo.findOrCreate({where: {Nombre: name }})
        }

        const allTypes = await Tipo.findAll()
      types
        ? res.status(200).json(allTypes)
        : res.status(404).send("No encontrado");
    } catch (error) {
    res.status(500).json({message: error.message});
  }
};


module.exports = getTypes