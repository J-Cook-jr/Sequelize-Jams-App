const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');


router.get('/', function (req, res, next) {
    res.render('users.ejs');
});

router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, superSecretPasswordHash) => {
        db.Users.create({
            username,
            email,
            password: superSecretPasswordHash,
        }).then((result) => {
            res.redirect('/');
        });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.Users.findOne({ where: { username } })
        .then(Users => {
            bcrypt.compare(password, Users.password, (err, match) => {
                if (match) {
                    res.send('Logged in!');
                } else {
                    res.send('Incorrect Password');
                };
            });
        })
        .catch(() => {
            res.send('username not found');
        });
});

module.exports = router;