const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('../../models/Item');

// @route   GET api/items/test
// @desc    Tests item route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Item Works' }));

// @route   GET api/items
// @desc    Get All Items
// @access  Private
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    itemname: req.body.name,
    itemcompany: req.body.company,
    itemcategory: req.body.category,
    itemdiscription: req.body.discription,
    itemsize: req.body.size,
    itemprice: req.body.price
  });

  newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
