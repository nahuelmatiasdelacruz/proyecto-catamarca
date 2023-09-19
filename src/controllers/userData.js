const {knex} = require("../configs/db");

const getUserData = (req,res) => {
    res.json({});
}

const getUserPhoto = (req,res) => {
    res.json({});
}

const getUserPdf = (req,res) => {
    res.json({});
}

const userDataController = {
    getUserData,
    getUserPhoto
}

module.exports = {userDataController};