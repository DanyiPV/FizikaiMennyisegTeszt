const profileService = require("../services/profileService");
require("dotenv").config();

const jwt = require("jsonwebtoken");

exports.changeDarkmode = async (req,res,next) =>{
    const token = req.headers.token;
    const { type } = req.body;

    console.log(type);

    try{
        var decoded = null;
    
        if(token){
            decoded = jwt.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] });
        }else{
            const error = new Error('Nem található user!');

            error.status = 404;

            throw error;
        }

        const darkmode_change = await profileService.changeDarkmode(decoded.id,type);
    
        if(!darkmode_change){
            const error = new Error('Nem sikerült a sötét mód megváltoztatása!');

            error.status = 400;

            throw error;
        }

        res.status(200).send('Megváltozott a sötétmód értéke!')
    }catch(error){
        next(error);
    }
}

exports.getDarkmode = async (req,res,next) =>{
    const token = req.headers.token;

    try{
        var decoded = null;
    
        if(token){
            decoded = jwt.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] });
        }else{
            const error = new Error('Nem található user!');

            error.status = 404;

            throw error;
        }

        const darkmode_get = await profileService.getDarkmode(decoded.id);
    
        if(!darkmode_get){
            const error = new Error('Nem sikerült a sötét mód megváltoztatása!');

            error.status = 400;

            throw error;
        }

        res.status(200).send(darkmode_get);
    }catch(error){
        next(error);
    }    
}