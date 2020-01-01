const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

const database = {
  users: [
    {
      id: 123,
      name: "John",
      email: "john@example.com",
      password: "banana",
      entries: 0,
      joined: new Date()
    },
    {
      id: 124,
      name: "Sally",
      email: "sally@example.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  const user = database.users.find(user => user.email === req.body.email);
  if (user && user.password === req.body.password) {
    res.json(user);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: 125,
    name,
    email,
    password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = database.users.find(user => user.id === +id);
  if (foundUser) {
    res.json(foundUser);
  } else {
    res.status(400).json({ error: "no such user" });
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  const foundIdx = database.users.findIndex(user => user.id === +id);
  const foundUser = database.users[foundIdx];
  if (foundIdx >= 0) {
    foundUser.entries += 1;
    res.json(foundUser.entries);
  } else {
    res.status(400).json("no such user");
  }
});

app.listen(3001, () => console.log("app is running on port 3001"));
