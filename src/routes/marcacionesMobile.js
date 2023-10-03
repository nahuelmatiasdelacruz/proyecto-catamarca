const {Router} = require("express");
const { marcacionesMobileController } = require("../controllers/marcacionesMobile");
const { validarJwt } = require("../middlewares/validar-jwt");
const { inputValidators } = require("../middlewares/validar-inputs");
const router = Router();

router.get("/",[validarJwt],marcacionesMobileController.getMarcacionesById);
router.post("/",[validarJwt,inputValidators.nuevaMarcacion],marcacionesMobileController.addMarcacion);

module.exports = router;