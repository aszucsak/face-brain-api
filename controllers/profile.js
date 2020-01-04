const handleProfile = db => (req, res) => {
  const { id } = req.params;
  db("users")
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        throw Error;
      }
    })
    .catch(() => res.status(400).json("user not found"));
};

module.exports = {
  handleProfile
};
