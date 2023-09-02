import bcrypt from "bcrypt";
import userData from "../model/userModel.js";
import jwt from "jsonwebtoken";

const userControl = {
  homepage: (req, res) => {
    res.json({ message: "Homepage" });
  },

  signup: async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
      const existingUser = await userData.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
      const newUser = new userData({
        name,
        email,
        phone,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Registration failed" });
      console.log(error.message);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userData.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      if (user.isAdmin === 0) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.status(200).json({
          name: user.name,
          email,
          phone: user.phone,
          token,
          login: true,
          image: user.image,
        });
      } else {
        return res.status(401).json({ message: "Authorization restricted" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
      console.log(error.message);
    }
  },

  updateProfile: async (req, res) => {
    try {
      if (req.file) {
        const updatedata = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          image: req.file.filename,
        };
        const userdata = await userData.updateOne(
          { email: req.body.email },
          { $set: updatedata }
        );
        return res.json({
          Status: "success",
          ...updatedata,
          token: req.body.token,
        });
      } else {
        const user = await userData.findOne({ email: req.body.email });

        const updatedata = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          image: user.image,
        };

        const userdata = await userData.updateOne(
          { email: req.body.email },
          { $set: updatedata }
        );

        return res.json({
          Status: "success",
          ...updatedata,
          token: req.body.token,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default userControl;
