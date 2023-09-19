const {Router} = require("express");
const { loginController } = require("../controllers/auth");

const router = Router();

router.get("/confirmation",loginController.servirConfirmarRegistro);
router.post("/",loginController.login);
router.post("/primeringreso",loginController.agregarPrimerIngreso);
router.post("/mobile",loginController.mobileAuth);

module.exports = router;