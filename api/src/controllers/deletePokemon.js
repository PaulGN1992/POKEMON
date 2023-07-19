const {Pokemon} = require('../db')

const deletePokemon = async (req, res) => {
    try {
        const {id} = req.params;
        await Pokemon.destroy({where: {ID: id}})

        res.status(200).send('eliminado correctamente')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = deletePokemon