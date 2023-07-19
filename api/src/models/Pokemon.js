const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    Nombre:{
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Imagen: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://i.pinimg.com/564x/46/e7/7e/46e77e3db6a6cdce8c63a9de331f31ff.jpg'
    },
    Vida: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 9,
        max: 201
      }
    },
    Ataque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 9,
        max: 201
      }
    },
    Defensa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 9,
        max: 201
      }
    },
    Velocidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 9,
        max: 201
      }
    },
    Altura: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Peso: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Creado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },{timestamps: false});
};
