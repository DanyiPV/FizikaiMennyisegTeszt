const notifService = require("../services/notifService");
const settingsConfirmService = require("../services/settingsConfirmService")

require("dotenv").config();

const bcrypt = require("bcrypt");

const salt = 10;

const jwt = require("jsonwebtoken");

const validator = require("email-validator");

exports.getNotifications = async (req,res,next) =>{
    const osztaly = req.query.osztaly;

    const token = req.cookies.token;

    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] });
        }else{
            const error = new Error('Nem található user!');

            error.status = 404;

            throw error;
        }
    
        
        const notifications = await notifService.getNotifs(osztaly, decoded.id);

        res.status(200).send(notifications);
    }catch(error){
        next(error);
    }
}

exports.shownNotification = async (req,res,next) => {
    const {id} = req.body;

    const token = req.cookies.token;

    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] });
        }else{
            const error = new Error('Nem található user!');

            error.status = 404;

            throw error;
        }
    
        const shownNotif = await notifService.shownNotification(id,decoded.id)
    
        res.status(201).send('OK');
    }catch(error){
        next(error);
    }
}

exports.unreadNotification = async (req,res,next) =>{
    const token = req.cookies.token;

    const osztaly = req.query.osztaly;
    
    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] });
        }else{
            const error = new Error('Nem található user!');

            error.status = 404;

            throw error;
        }
    
        const unreadNotifs = await notifService.unreadNotification(decoded.id, osztaly)
    
        res.status(200).json(unreadNotifs);
    }catch(error){
        next(error);
    }
}

exports.allNotification = async (req,res,next) =>{
    const token = req.cookies.token;

    const osztaly = req.query.osztaly;

    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] });
        }else{
            const error = new Error('Nem található user!');

            error.status = 404;

            throw error;
        }
    
        const allNotifs = await notifService.allNotification(osztaly);

        const readAllNotifs = await notifService.readAllNotifs(decoded.id);
    
        res.status(200).json(allNotifs);
    }catch(error){
        next(error);
    }
}

exports.sendReport = async (req,res,next) =>{
    const token = req.cookies.token;

    const {message, extra} = req.body;

    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] });
        }else{
            const error = new Error('Nem található user!');

            error.status = 404;

            throw error;
        }
    
        const sendReport = await notifService.sendReport({message, extra, type: 1, osztaly: 'A', user_id: decoded.id});
    
        res.status(200).json(sendReport);
    }catch(error){
        next(error);
    }
}

exports.getReports = async (req,res,next) =>{
    const token = req.cookies.token;

    try{
        var decoded = null;
        
        if(token){
            decoded = jwt.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] });
        }else{
            const error = new Error('Nem található user!');

            error.status = 404;

            throw error;
        }

         const adminCheck = await settingsConfirmService.getElseUserById(decoded.id);
        
        if(!adminCheck){
            const error = new Error("A felhasználónak nincs ehhez joga!");
    
            error.status = 400;
    
            throw error;
        }

        const getReports = await notifService.getReports();

        const readAllAdminNotifs = await notifService.readAllAdminNotifs(decoded.id);
    
        res.status(200).json(getReports);
    }catch(error){
        next(error);
    }
}