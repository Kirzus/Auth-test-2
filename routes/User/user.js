const express = require("express")
const connection = require('../../helper/db')
const router = express.Router();
// const bodyParser = require('body-parser');

const path = require('path')

router.get("/", (req, res) => {
    res.send("I'm on GET '/user' ")
})

module.exports = router;