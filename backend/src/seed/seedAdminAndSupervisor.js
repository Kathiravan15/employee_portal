import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const run = async () => {
  await connectDB(process.env.MONGO_URI);

  const adminEmail = "admin123@gmail.com";
  const supEmail = "supervisor456@gmail.com";

  // Admin
  const adminExists = await User.findOne({ email: adminEmail });
  if (!adminExists) {
    const pw = await bcrypt.hash("Admin@123", 10);
    await User.create({
      firstName: "Admin",
      lastName: "User",
      email: adminEmail,
      password: pw,
      role: "admin",
    });
    console.log(`Admin created -> ${adminEmail} / Admin@123`);
  } else {
    console.log("Admin already exists");
  }

  // Supervisor
  const supExists = await User.findOne({ email: supEmail });
  if (!supExists) {
    const pw2 = await bcrypt.hash("Sup@456", 10);
    await User.create({
      firstName: "Supervisor",
      lastName: "User",
      email: supEmail,
      password: pw2,
      role: "supervisor",
    });
    console.log(`Supervisor created -> ${supEmail} / Sup@1234`);
  } else {
    console.log("Supervisor already exists");
  }

  process.exit(0);
};

run();
