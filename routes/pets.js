
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/files');
const { v4: uuidv4 } = require('uuid');
const csv = require('csvtojson');
const Joi = require('joi');
const petSchema = require("../validators/petValidator");

//Adding Pet Details
router.post('/pet', async (req, res, next) => {
      const { error } = petSchema.petSchema.validate(req.body);
      if (error) {
            return next(error);
      }
      const { name, breed, age, type } = req.body;
      let document;
      try {
            document = await File.create({
                  uuid: uuidv4(),
                  name,
                  breed,
                  age,
                  type,
            });
      } catch (err) {
            return next(err);
      }
      res.status(201).json(document);
});

//Updating 
router.patch('/pet/:id', async (req, res, next) => {
      const { error } = petSchema.updateSchema.validate(req.body);
      if (error) {
            return next(error);
      }
      const { name, breed, age, type } = req.body;
      let document;
      try {
            document = await File.findOneAndUpdate({ _id: req.params.id }, {
                  name,
                  breed,
                  age,
                  type,
                  ...(req.body)
            });
      } catch (err) {
            return next(err);
      }
      res.status(201).json(document);
});
// Get all the Pets in the DataBase:

router.get('/pet', async (req, res,) => {
      let documents;
      try {
            documents = await File.find()
                  .select('-updatedAt -__v')
                  .sort({ _id: -1 });
      } catch (err) {
            return next(CustomErrorHandler.serverError());
            // console.log(err);
      }
      return res.json(documents);
});

//Get pets by id
router.get("/pet/:id", async (req, res) => {
      let document;
      try {
            document = await File.findOne({ _id: req.params.id }).select(
                  '-updatedAt -__v'
            );
      } catch (err) {
            console.log(err);
            return next(CustomErrorHandler.serverError());
      }
      return res.json(document);
});

// Delete by id 
router.delete('/pet/:id', async (req, res, next) => {
      const document = await File.findOneAndDelete({ _id: req.params.id });
      if (!document) {
            return next(new Error('Nothing to delete'));
      }
      return res.json(document);
});

module.exports = router;