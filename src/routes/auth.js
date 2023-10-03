const { Router } = require("express");
const { loginController } = require("../controllers/auth");
const { inputValidators } = require("../middlewares/validar-inputs");
const router = Router();
const upload = require("../middlewares/upload-fotos");


router.get("/confirmarregistro", loginController.servirConfirmarRegistro);
router.post("/", loginController.login);
router.post("/confirmar-password",loginController.confirmarPassword);
router.post("/primeringreso",[inputValidators.primerIngreso], loginController.agregarPrimerIngreso);
router.post("/primeringreso/fotos",upload.array("fotos",3),(req,res)=>{
    res.json({msg: "Archivos subidos correctamente"});
});
router.post("/mobile", loginController.mobileAuth);

module.exports = router;
