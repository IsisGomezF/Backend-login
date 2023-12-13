const {Usuario} = require("../models/usuario");
const jwt = require("../helpers/jwt");//crea encriptacion para autenticar usuario
const bcrypt = require("bcrypt");

const regitro_usuario = async(req, res) =>{//peticion al modelo
    try {
        const data = req.body;//estamos en controlador, data es mensejero y se valida en base de datos
        console.log(data);
        const usuarioExistente = await Usuario.findOne({
            where: { email: data.email }
        }) 
        if(usuarioExistente){//pruebas de validacion de la info
            return res.status(409).send({mensage:"El usuario ya existe en la base de datos", data:undefined})
        }
        if(!data.password){
            return res.status(400).send({mensage:"No hay contraseña", data:undefined})
        }
        const usuarioNuevo = {//registra el usuario
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            password: await bcrypt.hash(data.password, 10)
        }
        if(data.telefonos){
            usuarioNuevo.telefonos=data.telefonos
        }
        if(data.tipo){
            usuarioNuevo.tipo=data.tipo
        }
        if(data.dni){
            usuarioNuevo.dni=data.dni
        }
        await Usuario.create(usuarioNuevo)
        res.status(200).send({mensage:"Se registró el usuario", data:true})
    } catch (error) {
        console.log(error);
        res.status(500).send({mensage:"Error en el servidor", data:undefined})
    }
}

const login_usuario=async(req, res) =>{
    try {
        const data = req.body;
        console.log(data);
        if(!data.email || data.email.trim()===""){
        return res.status(400).send({mensage:"El campo email está vacio", data:undefined})
        }
        const usuario = await Usuario.findOne({
            where: { email: data.email }
        }) 
        if(!usuario){
            return res.status(409).send({mensage:"El usuario ya existe en la base de datos", data:undefined})
        }
        const passwordMatch = await bcrypt.compare(data.password , usuario.password)
        if(!passwordMatch){
            return res.status(401).send({mensage:"Contraseña incorrecta", data:undefined})
        }
        const token = jwt.createToken(usuario);
        res.status(200).send({mensage:"Inicio de sesión exitoso", data:{usuario, token}})
    } catch (error) {
        console.log(error);
        res.status(500).send({mensage:"Error en el servidor", data:undefined})
    }
}

module.exports = {
    regitro_usuario, 
    login_usuario
}