require("dotenv").config();
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')
const cors = require("cors");
const { routes } = require("../configs/routes");
const upload = require("../middlewares/upload-fotos");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 80;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.engine("handlebars", exphbs.engine());
        this.app.set("view engine", "handlebars");
        this.app.set('views', path.join(__dirname, '..', 'views'));
        this.app.use(cors());
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(express.static(path.join(__dirname, "..", "client", "build")));
        this.app.use(express.static(path.join(__dirname, "..", "public_images")));
    }
    routes(){
        this.app.use(routes.auth,require("../routes/auth"));
        this.app.use(routes.empleados,require("../routes/empleados"));
        this.app.use(routes.marcaciones,require("../routes/marcaciones"));
        this.app.use(routes.marcacionesMobile,require("../routes/marcacionesMobile"));
        this.app.use(routes.userData,require("../routes/userData"));
    }
    listen(){
        this.app.get("/",(req,res)=>{
            res.sendFile(path.join(__dirname,"..","client","build","index.html"));
        })
        this.app.listen(this.port,()=>{
            console.log("Servidor CATAMARCA - ON! | Puerto: " + this.port);
        })
    }
}

module.exports = Server;