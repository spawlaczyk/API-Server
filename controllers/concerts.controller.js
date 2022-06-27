const Concert = require('../models/concerts.models');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}; 

exports.getByPerfomer = async (req, res) => {
  try {
    const { performer } = req.params;
    const con = await Concert.findOne({ performer: performer });
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const con = await Concert.find({ genre: genre });
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.params;
    const con = await Concert.find({ price: { $gte: minPrice, $lte: maxPrice }});
    if(!con) res.status(404).json({ message: 'Not found' });
    else if(con.length === 0) res.json({ message: 'No concerts in this price range' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const { day } = req.params;
    const con = await Concert.find({ day: day });
    if(!con) res.status(404).json({ message: 'Not found' });
    else if(con.length === 0) res.json({ message: 'No concerts today' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const con = await Concert.findById(req.params.id);
    if(con) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image } });
      res.json(await Concert.find());
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if(con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(await Concert.find());
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};