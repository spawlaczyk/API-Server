const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const router = express.Router();

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  let randomObj = db.testimonials[Math.floor(db.testimonials.length * Math.random(req.params.id))]
  res.json(randomObj)
});

router.route('/testimonials/:id').get((req, res) => {
  const testimonial = db.testimonials.filter((testimonial) => testimonial.id == req.params.id);
  res.json(testimonial);
});

router.route('/testimonials').post((req, res) => {
  const newTestimonial = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  };

  db.testimonials.push(newTestimonial);
  res.json({ message: 'New testimonial sent' });
});

router.route('/testimonials/:id').put((req, res) => {
  const testimonial = db.testimonials.find((testimonial) => testimonial.id == req.params.id);
  const index = db.testimonials.indexOf(testimonial);
  const editedTestimonial = {
    ...testimonial,
    author: req.body.author,
    text: req.body.text,
  };
  
  db.testimonials[index] = editedTestimonial;
  res.json({ message: 'Testimonial edited' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const testimonial = db.testimonials.find((testimonial) => testimonial.id == req.params.id);
  const index = db.testimonials.indexOf(testimonial);
  db.testimonials.splice(index, 1);
  res.json({ message: 'Testimonial deleted' });
});

module.exports = router;