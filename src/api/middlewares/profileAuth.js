const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) =>
{
    var token = req.headers["token"];
    var id = req.headers["id"];

    if(token == undefined && id == undefined)
    {
        res.status(403).send("Access denied");

        return;
    }

    if(token != undefined){
        jwt.verify(token, process.env.JWT_KEY, function(error, decoded)
        {
            if(!decoded)
            {
                res.status(400).send("Invalid token");
    
                return;
            }
        });
    }

    next();
}