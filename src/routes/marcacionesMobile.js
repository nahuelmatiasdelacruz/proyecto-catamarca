const {Router} = require("express");
const { marcacionesMobileController } = require("../controllers/marcacionesMobile");
const { validarJwt } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/",[validarJwt],marcacionesMobileController.getMarcaciones);
router.post("/",[validarJwt],marcacionesMobileController.addMarcacion);

module.exports = router;