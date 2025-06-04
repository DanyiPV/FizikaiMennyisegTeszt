const logregServices = require("../services/logregService");
require("dotenv").config();

const bcrypt = require("bcrypt");

const salt = 10;

const jwt = require("jsonwebtoken");

const validator = require("email-validator");

const nodemailer = require('nodemailer');

exports.registerUser = async (req, res, next) =>
{
    const { email, user_name, password, osztaly } = req.body;

    const newUser =
    {
        id: null,
        email: email,
        password: await bcrypt.hash(password, salt),
        user_name: user_name,
        user_role: "student",
        osztaly: osztaly,
        admin: false,
        activated: true,
    }

    const user_check = await logregServices.checkUser(email, user_name);
    
    try{

        if(user_check != null){
            if(user_check.email == email){ 
                const error = new Error("Már van regisztrálva ilyen felhasználó ezzel az email-el!");

                error.status = 400;
    
                throw error;
            }else{
                const error = new Error("Már van ilyen felhasználó ezzel felhasználó névvel!");

                error.status = 400;
    
                throw error;
            }
        }

        const isValid = validator.validate(email);
        
        if(!isValid){
            const error = new Error("Ilyen email cím nem található!");

            error.status = 404;

            throw error;
        }
        
        const result = await logregServices.registerUser(newUser);


        res.status(201).json(result);
    }
    catch(error){
        next(error);
    }
}

exports.loginUser = async (req, res, next) =>
{
    const { email, password, rememberMe } = req.body;
    
    const user = await logregServices.getUser(email,null);

    try
    {
        if(user == null || await bcrypt.compare(password, user.password) == false)
        {
            const error = new Error("Nem sikerült a bejelentkezés!");

            error.status = 400;

            throw error;
        }

        if(user != null && user.activated == 2)
        {
            const error = new Error("A felhasználó ki lett tíltva az oldalról!");

            error.status = 400;

            throw error;
        }

        console.log(await bcrypt.hash('admin', salt))

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_KEY,
            rememberMe ? {} : { expiresIn: '1d' }
        );

        const cookieOptions = {
            httpOnly: true,
            secure: false,          // fejlesztés alatt false, HTTPS nélkül
            sameSite: 'Lax',        // fejlesztéshez ajánlott
            path: '/',
        };

        if (!rememberMe) {
            cookieOptions.maxAge = 24 * 60 * 60 * 1000;
        }
        res.cookie('token', token, cookieOptions);

        res.status(200).send({ success: true });
    }
    catch(error)
    {
        next(error);
    }
}

exports.forgetPassword = async (req, res, next) =>{
    const { email } = req.body;

    const user = await logregServices.getUser(email, null);
    try{
        if(user == null){
            const error = new Error("Ilyen felhasználó nem létezik!");

            error.status = 404;

            throw error;
        }


        // token generálás
        const token = jwt.sign(
            { email: email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );

        // Verifikációs token
        const newToken =
        {
            code: token,
            type: 0,
            user_id: user.id,
        }        

        const token_result = await logregServices.uploadToken(newToken);
        
        // Verifikációs link
        const verificationLink = `${req.headers.origin}/set-new-password?token=${token_result.code}`;
        
        // Email küldése
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gravitasnoreply@gmail.com',
                pass: 'vwuy eckc shar hlgm',
            },
            // UTF-8 támogatás biztosítása
            tls: {
                ciphers: 'SSLv3',
            },
        });

        
        // Email megjelenése
        const mailOptions = {
            from: '"Gravitas" <mathsolve597@gmail.com>',
            to: email,
            subject: 'Email Verification',
            html: `
            <h1>Hello ${user.user_name},</h1>
            <p>Az alábbi linkre kattintva tudod módosítani a jelszavadat:</p>
            <a href="${verificationLink}">${verificationLink}</a>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Új jelszó kérelem el lett küldve a emailre!');
    }
    catch(error){
        next(error);
    }
}
    
exports.setNewPassword = async (req, res, next) =>{
    const { token, password } = req.body;

    try
    {
        if(token == 'null' || token == null)
        {
            const error = new Error("Rossz az elérési útvonal!");
            
            error.status = 400;
            
            throw error;
        }
        
        const token_result = await logregServices.getUseridThroughToken(token);

        if(token_result.user_id == null)
        {
            const error = new Error("A felhasználó nem létezik!");

            error.status = 400;

            throw error;
        }

        if(token_result.type != 0)
        {
            const error = new Error("Rossz token lett használva!");

            error.status = 400;

            throw error;
        }

        const hashed_password = await bcrypt.hash(password, salt);

        const password_change_result = await logregServices.SetNewPassword(token_result.user_id, hashed_password);
        if(password_change_result.success){
            res.status(200).send(password_change_result.message)
        }else{
            res.status(400).send(password_change_result.message)
        }
    }
    catch(error)
    {
        next(error);
    }
}