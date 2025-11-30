import jwt from "jsonwebtoken";

export const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });


// import dotenv from 'dotenv';
// dotenv.config();

// import jwt from 'jsonwebtoken';

// const token = jwt.sign(
//   { userId: "12345" },
//   process.env.JWT_SECRET,
//   { expiresIn: "1h" }
// );


// const decoded = jwt.verify(token, process.env.JWT_SECRET);
// console.log(decoded);
