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
  handleImageSubmit
};
