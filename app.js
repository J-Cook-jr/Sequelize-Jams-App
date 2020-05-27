const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');


app.get('/', (req, res) => {
    db.Artist.findAll()
        .then((results) => {
            res.json(results)
        })
});

app.get('/artists', (req, res) => {
    db.Artist.findAll()
        .then((results) => {
            res.json(results)
        })
});

app.post('/artists', (req, res) => {
    db.Artist.create({
        Artist_Name: req.body.name
    })
        .then((result) => {
            res.send(result);
        })
});

app.put('/artists/:id', (req, res) => {
    db.Artist.update({
        Artist_Name: req.body.name
    },
        { where: { id: req.params.id } })
        .then(() => {
            db.Artist.findByPk(req.params.id)
                .then((result) => {
                    res.json(result)
                })
        })
});

app.delete('/artists/:id', (req, res) => {
    db.Artist.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            db.Artist.findAll()
                .then((results) => {
                    res.json(results)
                })
        })
});

app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`));