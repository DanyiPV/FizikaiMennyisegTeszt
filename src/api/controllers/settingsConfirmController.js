const settingsConfirmService = require("../services/settingsConfirmService")

require("dotenv").config();

const nodemailer = require('nodemailer');

const validator = require("email-validator");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const salt = 10;

exports.sendConfirmCode = async (req, res, next) =>
{
    const { email, user_name, id } = req.query;
    
    try{

        if(email == null){
            const error = new Error("Nincs megadva email cím!");

            error.status = 400;

            throw error;
        }
        
        // Email küldése
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mathsolve597@gmail.com',
                pass: 'awsm uhrf dsrd xqcz',
            },
        });

        const randomSixDigitNumber = () => Math.floor(100000 + Math.random() * 900000); 

        const RandomDigits = randomSixDigitNumber();

        const mailOptions = {
            from: '"Gravitas" <mathsolve597@gmail.com>',
            to: email,
            subject: 'Megerősítő kód',
            html: `
                <div style="
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    font-family: Arial, sans-serif;
                ">
                    <table role="presentation" width="100%" style="position: relative;">
                        <tr>
                            <td style="position: relative; text-align: center;">
                                <img src="https://drive.google.com/uc?export=view&id=1kLXvCwA1hF9wACP8NPjqUsHrzcSDy8Gk" 
                                    alt="Header background image" 
                                    style="width: 100%; height: auto; border-radius: 12px 12px 0 0;">
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                                    <img src="https://drive.google.com/uc?export=view&id=1DVnRCatLIPKwrInPc62RLg89gBR1wJJG" 
                                        alt="Header logo Image" 
                                        style="width: 100px; height: auto;">
                                </div>
                            </td>
                        </tr>
                    </table>
                    <h1 style="color: #333;">Hello ${user_name}!</h1>
                    <p style="font-size: 12px; margin-bottom: 3px; color: red;">A megerősítő kód csak 15 percig érvényes!</p>
                    <div><p style="color: black; font-size: 16px;">Megerősítő kód: </p> <p style="color: black; font-size: 45px;">${RandomDigits}</p> </div>
                </div>`
        };

        const newCode =
        {
            code: RandomDigits,
            user_id: id,
        }

        const code_result = await settingsConfirmService.setConfirmCode(newCode);

        if(!code_result){
            const error = new Error("Hiba törént a kód feltöltése közbe!");

            error.status = 400;

            throw error;
        }

        const email_send = await transporter.sendMail(mailOptions);

        if(!email_send){
            const error = new Error("Hiba törént az email küldése közbe!");

            error.status = 400;

            throw error;
        }

        res.status(201).json({ message: 'Kód sikeresen elküldve'});
        }
    catch(error){
        next(error);
    }
}

exports.setSettings = async (req,res,next) =>{
    const { content, code, id, type } = req.body;

    const code_result = await settingsConfirmService.codeConfirm(code, id);

    try{
        if(!code_result){
            const error = new Error("Nem megfelelő kód lett megadva!");

            error.status = 400;

            throw error;
        }

        var setSettings_result = null;
        if(type == 'profile'){
            setSettings_result = await settingsConfirmService.setNewUsername(id,content[0]);
        }else if(type == 'email'){
            const isValid = validator.validate(content[0]);

            if(!isValid){
                const error = new Error("Nem létezik a megadott email!");
    
                error.status = 404;
    
                throw error;
            }

            setSettings_result = await settingsConfirmService.setNewGmail(id,content[0]);
        }
        else if(type == 'password'){
            if(!await bcrypt.compare(content[0], content[2])){
                const error = new Error("A jelenlegi jelszó nem egyezik!");
    
                error.status = 404;
    
                throw error;
            }

            setSettings_result = await settingsConfirmService.setNewPassword(id,await bcrypt.hash(content[1], salt));
        }

        if(setSettings_result == null){
            const error = new Error("Valami hiba történt a beállítás firssítése közben!");

            error.status = 500;

            throw error;
        }

        res.status(200).send(setSettings_result);
    }
    catch(error){
        next(error);
    }
}

exports.profilPicUpload = async (req, res, next) => {
    const { id } = req.body;
    const blob = req.file ? req.file.buffer : null;
    const mimeType = req.file ? req.file.mimetype : null;
    if (!blob) {
        return res.status(400).json({ message: 'Fájl nem található!' });
    }

    try {
        const upload_result = await settingsConfirmService.ProfPicUpload(id, blob, mimeType);

        if(!upload_result){
            const error = new Error("Nem sikerült feltölteni a profil képet!");

            error.status = 400;

            throw error;
        }

        res.status(200).send('Profilkép sikeresen feltöltve!');
    } catch (error) {
        next(error);
    }
};

exports.getAllUser = async (req,res,next) =>{
    const {name, activated_type, admin, token} = req.query;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");
    
            error.status = 500;
    
            throw error;
        }

        const adminCheck = await settingsConfirmService.getElseUserById(decoded.id);

        if(!adminCheck){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const get_users = await settingsConfirmService.getALlUser(name, activated_type, admin);

        if(!get_users){
            const error = new Error("Valami hiba lépett fel a lekérdezés közben!");
    
            error.status = 400;
    
            throw error;
        }

        res.status(200).send(get_users);
    }
    catch(error){
        next(error)
    }
}

exports.setUserSettings = async (req,res,next) =>{
    const {content, id, type, token} = req.body;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");
    
            error.status = 500;
    
            throw error;
        }

        const adminCheck = await settingsConfirmService.getElseUserById(decoded.id);

        if(!adminCheck){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const setUserSettings = await settingsConfirmService.setUserSettings(content, id, type);

        res.status(200).send(setUserSettings);
    }
    catch(error){
        next(error)
    }
}


exports.setUserRoles = async (req,res,next) =>{
    const {id, type, token} = req.body;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");
    
            error.status = 500;
    
            throw error;
        }

        const adminCheck = await settingsConfirmService.getElseUserById(decoded.id);

        if(!adminCheck){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const setUserRoles = await settingsConfirmService.setUserRoles(id, type);

        res.status(200).send(setUserRoles);
    }
    catch(error){
        next(error)
    }
}

exports.setNewClass = async (req,res,next) =>{
    const {osztaly, id, token} = req.body;

    const secretKey = process.env.JWT_KEY;

    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        }else{
            const error = new Error("Valami hiba történt a felhasználó igazolásában!");
    
            error.status = 500;
    
            throw error;
        }

        const adminCheck = await settingsConfirmService.getElseUserById(decoded.id);

        if(!adminCheck){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const setNewClass = await settingsConfirmService.setNewClass(id, osztaly);

        res.status(200).send(setNewClass);
    }
    catch(error){
        next(error)
    }
}