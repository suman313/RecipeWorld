import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doen't exist..." });
    const isPasswordExist = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordExist)
      return res.status(404).json({ message: "Invalid Password" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong.." });
  }
};
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "User already exists..." });
    if (password !== confirmPassword)
      return res
        .status(404)
        .json({ message: "Password and confirmPassword do not match.." });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong.." });
  }
};
