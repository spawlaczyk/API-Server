const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const router = express.Router();

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const concert = db.concerts.find((concert) => concert.id == req.params.id);
  res.json(concert);
});

router.route('/concerts').post((req, res) => {
  const newConcert = {
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: Number(req.body.price),
    day: Number(req.body.day),
    image: req.body.image
  };

  db.concerts.push(newConcert);
  res.json({ message: 'New concert added' });
});

router.route('/concerts/:id').put((req, res) => {
  const concert = db.concerts.find((concert) => concert.id == req.params.id);
  const index = db.concerts.indexOf(concert);
  const editedConcert = {
    ...concert,
    performer: req.body.performer,
    genre: req.body.genre,
    price: Number(req.body.price),
    day: Number(req.body.day),
    image: req.body.image
  };

  db.concerts[index] = editedConcert;
  res.json({ message: 'Concert edited' });
});

router.route('/concerts/:id').delete((req, res) => {
  const concert = db.concerts.find((concert) => concert.id == req.params.id);
  const index = db.concerts.indexOf(concert);
  db.concerts.splice(index, 1);
  res.json({ message: 'Concert deleted' });
});

module.exports = router;