const {Router} = require("express");
const usuarioController = require ("../controlers/UsuarioController");

const router = Router();

router.post("/regitro_usuario", usuarioController.regitro_usuario);
router.post("/login_usuario", usuarioController.login_usuario);


module.exports = router
