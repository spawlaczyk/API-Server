const Seat = require('../models/seats.models');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const place = await Seat.findById(req.params.id);
    if (!place) res.status(404).json({ message: 'Not found' });
    else res.json(place);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const place = await Seat.findById(req.params.id);
    if(place) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email } });
      res.json(await Seat.find());
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const place = await Seat.findById(req.params.id);
    if(place) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(await Seat.find());
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};