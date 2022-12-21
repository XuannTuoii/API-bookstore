const Users = require("../model/Users");
const { multipleMongooseToObject } = require("../../util/mongoose");

class userController {
  //[GET] /get all user in DB
  index(req, res, next) {
    Users.find({}, (err, user) => {
      if (err) {
        res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(200).json(user);
    });
  }
  login(req, res, next) {
    const { email, password } = req.body;
    try {
      Users.find({ email: email }, async (err, user) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
        if (user.length == 0) {
          return res.status(404).json({ message: "User not found" });
        }

        if (user[0].password != password) {
          return res.status(401).json({ message: "Wrong password" });
        }
        return res.status(200).json(user);
      });
    } catch (error) {}
  }
  register(req, res, next) {
    const { email, password, username } = req.body;

    try {
      Users.find({}, async (err, users) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
        //lặp qua mảng users, nếu có email trùng thì return
        for (let i = 0; i < users.length; i++) {
          if (users[i].email === email) {
            return res.status(400).json({ message: "Email already exists" });
          }
        }
        for (let i = 0; i < users.length; i++) {
          if (users[i].username === username) {
            return res.status(400).json({ message: "Username already exists" });
          }
        }

        const newUser = new Users({
          email,
          password,
          username,
          role: "client",
        });
        await newUser.save();
        return res.status(200).json(newUser);
      });
    } catch (error) {}
  }
}

module.exports = new userController();
