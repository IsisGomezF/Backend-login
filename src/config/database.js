const{ Sequelize } = require ("sequelize");//importacion libreria https://ed.team/blog/agiliza-tu-desarrollo-en-nodejs-con-el-orm-sequelize

const sequelize = new Sequelize({ //creacion una nueva sequelize con los detalles 
    dialect: 'mysql',
    username: 'root',
    host: 'localhost',
    database: 'dblogin', // revisar localhost/phpmyadmin para crear la db
    password: '',
    port: 3306
});

sequelize.authenticate()//a la constante se le realiza autenticacion

.then(() =>{
    console.log('Conectado a la base de datos')
})
.catch((err) =>{
    console.log('Error a la hora de conectar a la base de datos')
    process.exit(1);
})

module.exports = {sequelize} //exportar conexion