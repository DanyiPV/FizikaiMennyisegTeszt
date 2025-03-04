const express = require("express");

const route = express.Router();

const profileControllers = require("../controllers/profileController");

const profileAuth = require("../middlewares/profileAuth");

route.get("/profile", [ profileAuth.verifyToken ], profileControllers.getFullUser);

const multer = require('multer');

const storage = multer.memoryStorage();

const MAX_SIZE = 25 * 1024 * 1024;  // Maximum 10MB

const upload = multer({
    storage,
    limits: { fileSize: MAX_SIZE }, // Maximum fájlméret
    fileFilter: (req, file, cb) => {
        if(file != null){
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
            // Ellenőrzés

            console.log(file.mimetype);
            
            if (allowedMimeTypes.includes(file.mimetype)) {
                return cb(null, true); // Elfogadott fájl
            } else {
                return cb(new Error('Csak JPEG, JPG, PNG és GIF fájlok engedélyezettek.'));
            }
        }
    }
});

route.patch("/profile", upload.single('blob'), profileControllers.profilPicUpload);

module.exports = route;