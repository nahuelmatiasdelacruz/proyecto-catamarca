const {Router} = require("express");
const { marcacionesController } = require("../controllers/marcaciones");
const router = Router();

router.get("/",marcacionesController.getMarcaciones);
router.post("/",marcacionesController.addMarcacion);

module.exports = router;