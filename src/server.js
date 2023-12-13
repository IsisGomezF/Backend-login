const express = require('express')
const cors = require('cors')

const {sequelize} = require('./config/database')//importacion conexion a la db

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.routesUsuario = "/api";

        this.dbConexion();

        this.middleware();

        this.routers();
    }
    dbConexion(){//que se active todo lo que se importa de database
        sequelize; 
    }
    middleware(){
        this.app.use(cors());
        this.app.use(express.json());
    }
    routers(){
        this.app.use(this.routesUsuario, require("./routes/usuario"))
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor corriendo en el puerto:" , this.port);
        });
    }
}

module.exports = {
    Server,
}