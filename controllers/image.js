require("dotenv").config();
const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: process.env.API_KEY
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(() => res.status(400).json("unable to connect to API"));
};

const handleImageSubmit = db => (req, res) => {
  const { id } = req.body;
  db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      if (entries.length) {
        res.json(entries[0]);
      } else {
        throw Error;
      }
    })
    .catch(() => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImageSubmit,
  handleApiCall
};
