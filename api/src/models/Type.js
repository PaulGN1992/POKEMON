const { DataTypes, INTEGER } = require('sequelize');
module.exports = (sequelize) => {
sequelize.define('Tipo', {
    ID:{
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre:{
      type: DataTypes.STRING(50),
      allowNull: false
    },
},{timestamps: false});
};