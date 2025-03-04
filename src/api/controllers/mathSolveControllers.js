const mathSolveServices = require("../services/mathSolveServices");

const bcrypt = require("bcrypt");

const salt = 10;

const jwt = require("jsonwebtoken");

const nodemailer = require('nodemailer');

const multer = require("multer");

// Set up multer storage to store file in memory (as a buffer)
const storage = multer.memoryStorage();  // Use diskStorage if you want to save to disk
const upload = multer({ storage: storage });

exports.getUsers = async (req, res, next) =>
{
    res.status(200).send(await mathSolveServices.getUsers());
}
