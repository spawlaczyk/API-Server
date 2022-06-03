const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const router = express.Router();

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const seat = db.seats.find((seat) => seat.id == req.params.id);
  res.json(seat);
});

router.route('/seats').post((req, res) => {
  const newSeat = {
    id: uuidv4(),
    day: Number(req.body.day),
    seat: Number(req.body.seat),
    client: req.body.client,
    email: req.body.email
  };

  db.seats.push(newSeat);
  res.json({ message: 'New seat added' });
});

router.route('/seats/:id').put((req, res) => {
  const seat = db.seats.find((seat) => seat.id == req.params.id);
  const index = db.seats.indexOf(seat);
  const editedSeat = {
    ...seat,
    day: Number(req.body.day),
    seat: Number(req.body.seat),
    client: req.body.client,
    email: req.body.email
  };

  db.seats[index] = editedSeat;
  res.json({ message: 'Seat edited' });
});

router.route('/seats/:id').delete((req, res) => {
  const seat = db.seats.find((seat) => seat.id == req.params.id);
  const index = db.seats.indexOf(seat);
  db.seats.splice(index, 1);
  res.json({ message: 'Seat deleted' });
});


module.exports = router;