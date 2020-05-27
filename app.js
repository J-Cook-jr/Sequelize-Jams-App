const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const albumsRouter = require('./routes/albums');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/albums', albumsRouter);


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to the music repo!</h1>`)
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