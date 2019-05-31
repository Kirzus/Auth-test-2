const express = require("express")
const connection = require('../../helper/db')
const router = express.Router();

// const bodyParser = require('body-parser');

// router.use(bodyParser.urlencoded({ extended: false }));

router.post("/", (req, res) => {
    console.log("req BODY", req.body)
    const sql = "INSERT INTO user (email, password, name, role) VALUES (?,?,?,?)"
    const values = [
        req.body.email,
        req.body.password,
        req.body.name,
        req.body.role
    ]
    connection.query(sql, values, (err, result) => {
        if (err)
          throw res
            .status(500)
            .send("There was a problem adding the information to the database.");
        return res.status(200).send(result)
    })
});

// Returns all the users in the database
router.get("/", (req, res) => {
    const sql = "SELECT * FROM user"
    connection.query(sql, (err, result) => {
        if (err)
          throw res
            .status(500)
            .send("There was a problem finding the users.");
        return res.status(200).send(result)
    })
})

// Gets a single user in the database
router.get("/:id", (req, res) => {
    const sql = "SELECT * FROM user WHERE id = ?"
    const values = [req.params.id];
    connection.query(sql, values, (err, user) => {
        console.log(user)
        if (err)
          throw res
            .status(500)
            .send("There was a problem finding the users.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    })
})


// Deletes a single user in the database
router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM user WHERE id = ?";
    const userId = [req.params.id];
    connection.query(sql, userId, (err, user) => {
        if (err)
          return res
            .status(500)
            .send("There was a problem deleting the user.");
        if (user.affectedRows === 0) return res.status(404).send(`No user found for id = ${userId}`)
        res.status(200).send("The user has been deleted: " + user.affectedRows)
      });
})

// UPDATES A SINGLE USER IN THE DATABASE
// [TODO] Add VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    const sql = "UPDATE user SET email = ?, password = ?, name = ?, role = ? WHERE id = ?";
    const values = [
      // Data to update
      req.body.email,
      req.body.password,
      req.body.name,
      req.body.role,
      // Row to select
      req.param.id
    ];
    connection.query(sql, values, (err, result) => {
        if (err) throw err;
        return res.sendStatus(200).send(result.affectedRows);
    });
});

module.exports = router;