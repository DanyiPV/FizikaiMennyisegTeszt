const logregServices = require("../services/logregService");
require("dotenv").config();

const bcrypt = require("bcrypt");

const salt = 10;

const jwt = require("jsonwebtoken");

//const nodemailer = require('nodemailer'); ?? kérdéses hogy ez legyen-e

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
        activated: 0,
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

        
        try{
            const result = await logregServices.registerUser(newUser);
            
            /*if(result && result.id != null)
            {
                // token generálás
                const token = jwt.sign(
                    { email: email },
                    process.env.JWT_KEY,
                    { expiresIn: '1h' }
                );
                // Verifikációs token
                const newToken =
                {
                    token: token,
                    type: "regisztrálás",
                    user_id: result.id,
                }

                const token_result = await logregServices.uploadToken(newToken);
                
                // Verifikációs link
                const verificationLink = `http://localhost:5173/success-register?token=${token_result.token}`;
        
                // Email küldése
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'mathsolve597@gmail.com',
                        pass: 'awsm uhrf dsrd xqcz',
                    },
                });

                const mailOptions = {
                    from: '"Math Solve" <mathsolve597@gmail.com>',
                    to: email,
                    subject: 'Email megerősítés',
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
                            <p style="color: #555; font-size: 16px;">Az alábbi gombra kattintva jóváhagyhatja a fiókja regisztrálását:</p>
                            
                            <a href="${verificationLink}" style="
                                display: inline-block;
                                background-color: #007BFF;
                                color: white;
                                padding: 12px 24px;
                                border-radius: 8px;
                                font-size: 16px;
                                text-decoration: none;
                                font-weight: bold;
                                margin-top: 10px;
                                transition: background 0.3s;
                            " onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007BFF'">
                                Megerősítés
                            </a>
                        </div>`
                };

                //console.log("Email küldésére kész:", mailOptions);
            const email_send = await transporter.sendMail(mailOptions);
                            
            if(!email_send){
                const error = new Error("Hiba törént az email küldése közbe!");

                error.status = 400;
    
                throw error;
            }*/

            res.status(201).json(result);
        }
        catch(error){
            next(error);
        }
    }
    catch(error){
        next(error);
    }
}

exports.successRegister = async (req,res,next) =>{
    const { token } = req.body;

    token_result = token != 'null' ? await logregServices.getToken(token) : null;

    try{
        if(token_result == null){
            const error = new Error("Nem megfelelő a token vagy már nem létezik!");
            
            error.status = 404;

            throw error;
        }

        const user = await logregServices.getUser(null,token_result.user_id);

        if(user.activated == 1){
            const error = new Error("A felhasználó már aktiválva lett!");
            
            error.status = 400;
            
            throw error;
        }

        const user_activated = await logregServices.activateUser(token_result.user_id);

        
        if(user_activated == false){
            const error = new Error("Nem lehetett a felhasználót aktiválni!");
            
            error.status = 500;
            
            throw error;
        }

        res.status(200).send("A felhasználó sikeresen aktiválva lett!");
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

        if(user != null && user.activated == 0)
        {
            const error = new Error("A profil nincs aktiválva!");

            error.status = 400;

            throw error;
        }

        const user_activated = await logregServices.activateUser(user.id);

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_KEY,
            rememberMe ? {} : { expiresIn: '1d' }
        );

        res.status(200).send(token);
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
            token: token,
            type: 1,
            user_id: user.id,
        }

        const token_result = await logregServices.uploadToken(newToken);
        
        // Verifikációs link
        const verificationLink = `http://localhost:5173/set-new-password?token=${token_result.token}`;
        
        // Email küldése
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mathsolve597@gmail.com',
                pass: 'awsm uhrf dsrd xqcz',
            },
            // UTF-8 támogatás biztosítása
            tls: {
                ciphers: 'SSLv3',
            },
        });

        
        // Email megjelenése
        const mailOptions = {
            from: '"Math Solve" <mathsolve597@gmail.com>',
            to: email,
            subject: 'Email Verification',
            html: `
            <h1>Hello ${user.user_name},</h1>
            <p>Az alábbi linkre kattintva tudod módosítani a jelszavadat:</p>
            <a href="${verificationLink}">${verificationLink}</a>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(201).json({ message: 'User registered and verification email sent.'});
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('User registered, but failed to send verification email.');
        }
    }
    catch(error){
        next(error);
    }
}
    
exports.setNewPassword = async (req, res, next) =>{
    const { token, password } = req.body;

    const token_result = await logregServices.getUseridThroughToken(token);

    try
    {
        if(token == 'null')
        {
            const error = new Error("Rossz az elérési útvonal!");

            error.status = 400;

            throw error;
        }

        if(token_result.user_id == null)
        {
            const error = new Error("A felhasználó nem létezik!");

            error.status = 400;

            throw error;
        }

        if(token_result.type != 1)
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