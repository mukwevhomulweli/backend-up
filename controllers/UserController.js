const db = require("../models");
const config = require('../config/db_config')
const User = db.user;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = config.saltRounds;
let jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'langu.maluks@gmail.com',
        pass: 'ulcbjnnzcjifeypm'
    }
});


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!(req.body.username && req.body.email && req.body.password && req.body.currency)) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        currency: req.body.currency

    });
    User.findOne({ email: req.body.email }).then((userData) => {
        if (!userData) {

            user.save(user)
                .then((data) => {
                    res.send('succesfully posted');
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Tutorial.",
                    });
                });
        }
        else {
            res.status(409).send({
                message: "User already exists"
            })

        }

    })

};


// Signing in with jwt and Bycrypt
exports.signInOTP = (req, res) => {
    // Find one user by using their email
    User.findOne({
        email: req.body.email,
    })
        .then((user) => {
            // Pass the user password to a variable called dbPass
            let dbPass = user.password;
            // If that user cant be found throw in an error
            if (!user) {
                return res.status(404).send({ message: "Bad Credentials" });
            }
            // Password validation Function
            let pass = bcrypt.compareSync(req.body.password, dbPass);

            // If the password entered is not equal to the user of that email password,
            // throw in this
            if (!pass) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid password",
                });
            }

            let token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400,
            });
            //Generate a random number based using Math.random
            let number = Math.floor(1000 + Math.random() * 9000);

            const mailConfigurations = {
                from: "langu.maluks@gmail.com",
                to: req.body.email,
                subject: "Sign in OTP",
                // This would be the text of email body
                html:
                    "<h1>Your OTP(One-time-pin) is : </h1><br/>" +
                    req.body.email +
                    `<p>Your OTP is: <strong>${number}</strong><br/><br/>
                               Made with ❤️ By Mulweli</p>`,
            };
            // Send the mail upon everything above correct
            transporter.sendMail(mailConfigurations, function (error, info) {
                if (error) throw Error(error);
                console.log(info)
            });


            res.status(200).send({
                otp: number,
                accessToken: token,
                email: req.body.email
            });
        })
        .catch((err) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }
        });
};
exports.resendOTP = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (!user) {
            res.status(409).send({
                message: 'User does not exist'
            })
        }


        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400,
        });
        let number = Math.floor(1000 + Math.random() * 9000);
        const mailConfigurations = {
            from: "langu.maluks@gmail.com",
            to: req.body.email,
            subject: "Sign in OTP",
            // This would be the text of email body
            html:
                "<h1>Your OTP(One-time-pin) is : </h1><br/>" +
                req.body.email +
                `<p>Your OTP is: <strong>${number}</strong><br/><br/>
                           Made with ❤️ By Mulweli</p>`,
        };
        // Send the mail upon everything above correct
        transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) throw Error(error);
            console.log(info)
        });


        res.status(200).send({
            otp: number,
            accessToken: token,
            email: req.body.email
        });

    })
}