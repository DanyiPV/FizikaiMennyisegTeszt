const express = require("express");
const route = express.Router();

const settingsConfirmController = require('../controllers/settingsConfirmController');

const profileAuth = require('../middlewares/profileAuth');

route.get('/get-confirm-code', settingsConfirmController.sendConfirmCode);

route.patch('/set-settings', settingsConfirmController.setSettings);

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

route.patch("/set-profilpic", upload.single('blob'), settingsConfirmController.profilPicUpload);

route.get('/get-all-users', [ profileAuth.verifyToken ],  settingsConfirmController.getAllUser);

route.patch('/set-user-settings', [ profileAuth.verifyToken ],  settingsConfirmController.setUserSettings);

route.patch('/set-user-roles', [ profileAuth.verifyToken ],  settingsConfirmController.setUserRoles);

route.patch('/set-new-class', [ profileAuth.verifyToken ],  settingsConfirmController.setNewClass);

module.exports = route;