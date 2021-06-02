const multer = require("multer");

const fileStorageEengine = multer.diskStorage({
    destination: (req, file, next)=>{
        next(null,"./avatars")
    },
    filename: (req, file, next)=>{
        next(null,file.originalname)
    }
})

const upload = multer({storage: fileStorageEengine});

module.exports = upload;