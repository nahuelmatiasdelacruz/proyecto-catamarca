const {Router} = require("express");
const { loginController } = require("../controllers/auth");

const router = Router();

router.get("/",loginController.login);

module.exports = router;