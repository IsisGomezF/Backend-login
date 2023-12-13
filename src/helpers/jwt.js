const jwt = require ("jsonwebtoken");// Se importa librerias para crear tokens https://www.npmjs.com/package/jsonwebtoken  m 
const { isBefore, addDays } = require ("date-fns"); // Importa libreria para manejar fechas..addDays es propia de la libreria
//Isbefore es para autenticaciones 
const secret = "holaMundo"; //Llave secreta para firmar el webtoken, generalmente se envia a enviroments

exports.createToken = (user) => {//funcion createToken toma un objeto de usuario como argumento
    const payLoad = { //construye un payload, contiena la informacion del usuario que se enviará en el token, vigencia del token y verifica las propiedades especificadas
        sub: user._id,
        nombres: user._nombres,
        apellidos: user._apellidos,
        email: user._email,
        rol: user._rol,
        iat: Date.now() / 1000,
        exp: addDays(Date.now(), 7) / 1000
    }
    return jwt.sign(payLoad,secret) //sign..funcion propia de libreria para firmar..firma el payLoad con una clave secreta para generar el token JWT
}
