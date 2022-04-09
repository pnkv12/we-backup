const User = require("../models/User");
const Department = require("../models/Department");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const {
  registerValidation,
  loginValidation,
} = require("../../middleware/validation");
class UserController {
  // [POST] /register
  async registerUser(req, res, next) {
    try {
      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      // Create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        fullname: req.body.fullname,
        password: hashedPassword,
        role_id: req.body.roleId,
        department_id: req.body.departId,
      });

      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  }
    // [POST] /login
    async loginUser(req, res, next) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username: username});

            user.role_name = (await Role.findById(user.role_id)).name;
            user.department_name = (await Department.findById(user.department_id)).name;

            if (!user) {
                return res.status(401).json("Username or password is incorrect");
            }

            const hashedPassword = user.password;
            const check = bcrypt.compareSync(password, hashedPassword);

            if (check) {
                req.session.logged = user["_id"];
                req.session.userId = user["_id"];
                req.session.username = user["username"];
                // req.session.userName = user["fullname"];
                // req.session.role = user["role_id"];
                return res.status(200).json({
                    status: "Login Successfully",
                    fullname: user["fullname"],
                    email: user["email"],
                    role: user["role_id"],
                    department : user["department_id"],
                    roleName: user.role_name,
                    departmentName: user.department_name,
                    uid: user["_id"],
                });
            } else {
                return res.status(400).json("Username or password is incorrect");
            }
        } catch (error) {
            res.status(500).json(error);
        }

  }


  // [POST] /logout
  async logout(req, res, next) {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(400).json("Unable to log out");
        }
        return res.status(200).json("Logout Successfully");
      });
    } else {
      res.end();
    }
  }

  // [PATCH] /user/:id
  async updateUser(req, res, next) {
    try {
      let updatedUser = {};
      if (req.body.password === undefined) {
        updatedUser = {
          // username: req.body.username,
          email: req.body.email,
          fullname: req.body.fullname,
          role_id: req.body.roleId,
          department_id: req.body.departId,
        };
      } else {
        //? Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        updatedUser = {
          // username: req.body.username,
          email: req.body.email,
          fullname: req.body.fullname,
          password: hashedPassword,
          role_id: req.body.roleId,
          department_id: req.body.departId,
        };
      }

      if (updatedUser !== null) {
        const user = await User.findById(req.params.id);
        await user.updateOne({ $set: updatedUser });
      }
      const user = await User.findById(req.params.id);
      res.status(200).json({
        message: "The user is updated",
        user: user,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [DELETE] /user/:id
  async deleteUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      await user.deleteOne();
      res.status(200).json({
        message: "The user has been deleted.",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [GET] /user/:id
  async getAUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      user.role_name =  (await Role.findById(user.role_id)).name;
      user.department_name =  (await Department.findById(user.department_id)).name;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [GET] /users
  async getAllUser(req, res, next) {
    try {
      const users = await User.find({});
      let newUsers = [];

      for( const user of users ) {
        user.role_name = (await Role.findById(user.role_id)).name;
        user.department_name = (await Department.findById(user.department_id)).name;
        newUsers.push(user);
      }
                            
      res.status(200).json(newUsers);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new UserController();
