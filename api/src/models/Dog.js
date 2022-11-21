const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type:DataTypes.STRING,
    },
    // temperament: {
    //   type: DataTypes.TEXT,
    // },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://assets.puzzlefactory.pl/puzzle/376/321/original.jpg'
    }
  }, {timestamps: false});
};
