import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js";
import nodemailer from "nodemailer"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Signup logic
export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Login logic
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Forgot password
const EMAIL_USER = process.env.EMAIL;
const EMAIL_PASS = process.env.PASSWORD;
export const forgotPassword=async(req,res)=>{
    const {email} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.send({Status: "User not existed"})
        } 
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "1d"})
        const resetLink = `http://localhost:5173/reset-password?token=${token}`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: EMAIL_USER,
              pass: EMAIL_PASS
            }
          });
          
          var mailOptions = {
            from: EMAIL_USER,
            to: `${email}`,
            subject: 'Reset Password Link',
            text: `Click on the following link to reset your password: ${resetLink}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
}
//reset
// Reset Password Logic
export const resetPassword = async (req, res) => {
    const { token, password } = req.body;
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({ message: "Reset link has expired" });
      }
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };
  