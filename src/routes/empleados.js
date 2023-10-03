const {Router} = require("express");
const router = new Router();
const {empleadosController} = require("../controllers/empleados");

router.get("/",empleadosController.getEmpleados);
router.get("/byquery/",empleadosController.getEmpleadosByQuery);

module.exports = router;