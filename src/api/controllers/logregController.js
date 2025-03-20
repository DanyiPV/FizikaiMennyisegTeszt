const logregServices = require("../services/logregService");
require("dotenv").config();

const bcrypt = require("bcrypt");

const salt = 10;

const jwt = require("jsonwebtoken");

const validator = require("email-validator");

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