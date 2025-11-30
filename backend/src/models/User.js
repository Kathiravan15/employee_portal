import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "supervisor"],
      default: "supervisor",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
