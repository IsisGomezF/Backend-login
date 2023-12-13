const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Usuario = sequelize.define("usuario", {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },telefonos: {
        type: DataTypes.STRING(20),
        allowNull: true
    },tipo: {
        type: DataTypes.STRING(20),
        allowNull: true
    },dni: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
})

sequelize.sync()
    .then(()=>{
        console.log("La tabla usuarios ha sido sincronizada a la base de datos");
    })
    .catch((err) =>{
        console.log("Error al sincronizar la tabla usuario", err);
    })

module.exports = {Usuario}
