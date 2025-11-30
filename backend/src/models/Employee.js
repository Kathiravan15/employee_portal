import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, unique: true, required: true },
    employeeId: { type: String, unique: true, required: true },
    department: String,
    role: String,
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dateOfJoining: Date,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    profilePhotoUrl: String,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
