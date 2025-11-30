import User from "../models/User.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken({ id: user._id, role: user.role });
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createSupervisor = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const supervisor = await User.create({
      firstName,
      lastName,
      email,
      password: hashed,
      role: "supervisor",
    });

    res
      .status(201)
      .json({
        id: supervisor._id,
        email: supervisor.email,
        firstName: supervisor.firstName,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
