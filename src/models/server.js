require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const { routes } = require("../configs/routes");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static(path.join(__dirname,"..","client","build")));
    }
    routes(){
        this.app.use(routes.auth,require("../routes/auth"));
        this.app.use(routes.marcaciones,require("../routes/marcaciones"));
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