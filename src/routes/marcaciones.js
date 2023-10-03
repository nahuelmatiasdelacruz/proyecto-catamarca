const {Router} = require("express");
const { marcacionesController } = require("../controllers/marcaciones");
const { validarJwt } = require("../middlewares/validar-jwt");
const router = Router();

// router.get("/",[validarJwt],marcacionesController.getMarcaciones);
router.get("/",marcacionesController.getMarcaciones);
router.post("/",[validarJwt],marcacionesController.addMarcacion);
router.put("/:id",[validarJwt],marcacionesController.editarMarcacion);
router.delete("/:id",[validarJwt],marcacionesController.borrarMarcacion);

module.exports = router;