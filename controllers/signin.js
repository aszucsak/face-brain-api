const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("invalid login information");
  }
  db.select("email", "hash")
    .from("login")
    .where({ email })
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db("users")
          .where({ email })
          .then(user => {
            res.json(user[0]);
          })
          .catch(() => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch(() => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleSignin
};
