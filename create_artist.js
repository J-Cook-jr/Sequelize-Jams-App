const express = require('express');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const app = express();
const db = require('./models');

let name = readline.question('Artist name? ');

console.log(db.Artist)
db.Artist.create({
    Artist_Name: name
})
    .then(function (artist) {
        // console.log(`Created artist with ID ${artist.id}.`)
        console.log(artist)
    })