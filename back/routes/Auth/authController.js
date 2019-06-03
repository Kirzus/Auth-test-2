// Imports
const express = require("express");
const router = express.Router();
const connection = require('../../helper/db')
const bodyParser = require("body-parser");

// bodyParser config
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Authorization packages
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config");
const VerifyToken = require('./verifyToken');

// Register a new user
// Access: Public
router.post("/register", function(req, res) {
    // Crypting entered password
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // SQL Request
    const sql = "INSERT INTO user (email, password, name, role) VALUES (?,?,?,?)";
    const values = [req.body.email, hashedPassword, req.body.name, req.body.role];
    // Connecting to database
    connection.query(sql, values, (err, user) => {
        if (err) throw res.status(500).send("There was a problem registering the user`.");
    
        // Create a token for user if registered without errors
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
    
        // Response
        res.status(200).send({
            auth: true,
            token: token,
            user
        });
    });
});

// Login a user
// Access: Public
router.post("/login", function(req, res) {
    // SQL Request, getting user via email
    const sql = "SELECT * FROM user WHERE email = ?";
    const values = [req.body.email];
    // Connecting to database
    connection.query(sql, values, (err, user) => {
        // Errors
        if (err) throw res.status(500).send("There was a problem finding the users.");
        // The user (email) is incorrect
        if (!user[0]) return res.status(404).send("No user found. This user doesn't exist");

        // Check password validity
        const passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        // If user is found and password is valid
        // Create a token
        const token = jwt.sign({ id: user[0].id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.header("Access-Control-Expose-Headers", "x-access-token")
        res.set("x-access-token", token)

        res.status(200).send({ auth: true, token: token });
    });
})

// TEST PROTECTED ROUTE
// Access: private
router.get("/protected", VerifyToken, function(req, res, next) {
    // SQL Request, getting user via id
    const sql = "SELECT * FROM user WHERE id = ?";

    connection.query(sql, req.id, (err, user) => {
        if (err)
        return res.status(500).send("There was a problem finding the user.");
        if (!user[0]) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// Log out a user
// Access: ?
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;