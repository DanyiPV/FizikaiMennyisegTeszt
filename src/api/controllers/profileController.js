const profileService = require("../services/profileService");
require("dotenv").config();

const jwt = require("jsonwebtoken");

exports.changeDarkmode = async (req,res,next) =>{
    const token = req.headers.token;
    const { type } = req.body;

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

exports.getUser = async (req,res,next) =>{
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

        const get_user = await profileService.getUser(decoded.id);
    
        if(!get_user){
            const error = new Error('Nem sikerült lekérni a felhasználó adatait!');

            error.status = 400;

            throw error;
        }

        res.status(200).send(get_user);
    }catch(error){
        next(error);
    }    
}