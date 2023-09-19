const {Router} = require("express");
const { userDataController } = require("../controllers/userData");
const { validarJwt } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/photo/:id",[validarJwt],userDataController.getUserPhoto);
router.get("/data/:id",[validarJwt],userDataController.getUserData);

module.exports = router;