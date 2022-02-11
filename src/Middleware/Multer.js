const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    console.log("asdfasdf");
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    const id = uuidv4();
    cb(null, `aasdfasdfa.jpg`);
  },
});

const upload = multer({ storage });

module.exports = upload;
