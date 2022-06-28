const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: '404 not found...' });
});

const NODE_ENV = process.env.NODE_ENV;
let dbURI = '';

if(NODE_ENV === 'production') dbURI = 'mongodb+srv://spawlaczyk:HewraMo88yN@cluster0.pm9de.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
else if(NODE_ENV === 'test') dbURI = 'mongodb://localhost:27017/NewWaveDBtest';
else dbURI = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
});

module.exports = server;