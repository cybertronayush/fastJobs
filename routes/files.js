
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/files');
const { v4: uuidv4 } = require('uuid');
const csv = require('csvtojson');

let storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'uploads/'),
      filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
            cb(null, uniqueName)
      },
});

let upload = multer({ storage, limits: { fileSize: 1000000 * 100 }, }).single('myfile'); //100mb


router.post('/files', (req, res) => {
      const arr = new Array;
      upload(req, res, async (err) => {
            if (err) {
                  return res.status(500).send({ error: err.message });
            }
            const data = csv()
                  .fromFile(req.file.path)
                  .then(async (response) => {
                        response.map((e) => {
                              const file = new File({
                                    uuid: uuidv4(),
                                    name: e.Name,
                                    breed: e.Breed,
                                    age: e.Age,
                                    type: e.Type
                              });
                              arr.push(file);


                        })
                        console.log(arr);
                        const doc = await File.bulkSave(arr);
                        res.json("All Data Successfully Added!");
                  })
      });
});

module.exports = router;



