require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./model/user');
const jwt = require('jsonwebtoken');
const app = express();

const { verifyToken } = './middleware/auth.js'

app.use(express.json());

app.post('/welcome', verifyToken, (req, res) => {
    res.status(200).send('Welcome 😃 !')
})

app.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("Bad request");
        }
        
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(409).send("user already exists");
        }
    
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name, 
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY, 
            { 
                expiresIn: '2h'
            }
        )
        user.token = token;
        res.status(201).json(user);

    } catch (error) {
        res.status(500).send('Error when registering a user' + error);
    }

})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email) {
            res.send(404).send('Bad request not email provided');
        }
        if(!password) {
             res.send(404).send('Bad request not password provided');
        }
        
        const user = await User.findOne({ email })
        
        if(user && await bcrypt.compare(password, user.password)) {
            const userOptions = { user_id: user._id, email };
            const tokenKey = process.env.TOKEN_KEY;
            const jwtOptions = { expiresIn: "2h" };
            const token = jwt.sign(userOptions, tokenKey, jwtOptions);
            user.token = token;
            res.status(200).json(user);
        } else  {
            res.status(400).send("Invalid Credentials");
        }

    } catch (error) {
        console.log("Error when login", error)
    }
})

module.exports = app;