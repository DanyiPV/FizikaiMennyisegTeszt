const profileService = require("../services/profileService");

const jwt = require("jsonwebtoken");

require('dotenv').config(); 

exports.getFullUser = async (req, res, next) =>{
    const token = req.headers['token'];
    const id = req.headers['id'];

    const secretKey = process.env.JWT_KEY;
    
    var decoded = null;
    
    if(token){
        decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
    }

    if(decoded && decoded.id == id || id == 0){
        
        const full_user = await profileService.getUserAndCustomization(decoded.id);
    
        try{
    
            if(full_user == null){
                const error = new Error("A felhasználó nem található!");
    
                error.status = 404;
    
                throw error;
            }
    
            res.status(200).send(full_user);
        }
        catch(error){
            next(error);
        }
    }else{
        const else_user = await profileService.getElseUserById(id);
        
        try{
            if(else_user == null){
                const error = new Error("A felhasználó nem található!");

                error.status = 404;

                throw error;
            }

            res.status(200).send(else_user);
        }
        catch(error){
            next(error);
        }
    }
}

exports.profilPicUpload = async (req, res, next) => {
    const { id, type, darkmode } = req.body;
    const blob = req.file ? req.file.buffer : null;
    const mimeType = req.file ? req.file.mimetype : null;
    if (!blob && (type == '1' || type == '2')) {
        return res.status(400).json({ message: 'Fájl nem található!' });
    }

    try {
        // Fájl feltöltésének logikája
        var upload_result;

        console.log(blob);

        if(type == '0' || type == '1' || type == '2'){
            upload_result = await profileService.ProfPicUpload(id, blob, type, mimeType);
        }else if(type == '4'){
            upload_result = await profileService.DarkmodeUpload(id, darkmode);
        }

        // Válasz küldése
        res.status(200).json({ message: 'Profilkép sikeresen feltöltve!', result: upload_result });
    } catch (error) {
        console.error('Hiba a profilkép feltöltésekor:', error);
        res.status(500).json({ message: 'Hiba történt a profil frissítése közben.' });
    }
};