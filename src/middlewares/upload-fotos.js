const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    try {
      const cuil = req.get("x-cuil");
      console.log(req.headers);
      const destinationFolder = path.join(__dirname, "..", "..", "uploads", cuil);
      if (!fs.existsSync(destinationFolder)) {
        fs.mkdirSync(destinationFolder, { recursive: true });
      }
      callback(null, destinationFolder);
    } catch (error) {
      callback(error, null);
    }
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
  
});

const upload = multer({storage});

module.exports = upload;