const {Pokemon, Tipo} = require('../db');
const postPokemon = async ( req, res) => {
try {
    const {Nombre, Vida, Ataque, Defensa, Velocidad, Altura, Peso, Tipos} = req.body;
    if(!Nombre || !Vida || !Ataque || !Defensa || !Velocidad || !Altura || !Peso || !Tipos) {
        return res.status(401).send("Faltan datos")
    } else {
        const pokemonDB = await Pokemon.findOne({where: {Nombre}})
        if(!pokemonDB) {
            const createPokemon = await Pokemon.create({
                Nombre, Vida, Ataque, Defensa, Velocidad, Altura, Peso
            });
            const typePokemon = await Tipo.findAll({
                where: { Nombre: Tipos},
            });
    
        if (typePokemon.length > 0) {
            createPokemon.addTipo(typePokemon);
            return res.status(200).json(createPokemon);
            } else {
            await createPokemon.destroy(); 
            return res.status(400).send("El tipo o tipos de Pokémon ingresado no existe");
            }
        } else {
            return res.status(402).send('Ya existe el pokemon')
        }
    }
} catch (error) {
    res.status(500).json({message: error.message});
}
}

module.exports= postPokemon