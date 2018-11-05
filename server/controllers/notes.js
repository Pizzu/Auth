const Joi = require('joi');
const db = require('../db/connection');

const notes = db.get('notes');

const schema = Joi.object().keys({
  title: Joi.string().trim().max(100).required(),
  note: Joi.string().trim().required()
});

function getAllNotes(req, res, next) {
  notes
    .find({author_id: req.user._id})
    .then(notes => {
      res.json(notes);
    })
    .catch(err => next(err))
}

function createNote(req, res, next) {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    notes
      .insert({...req.body, author_id: req.user._id})
      .then(note => {
        res.json(note);
      })
      .catch(err => next(err))
  } else {
    res.status(422);
    next(result.error);
  }
}


module.exports = {
  createNote,
  getAllNotes
}