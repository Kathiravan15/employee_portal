import Employee from "../models/Employee.js";

/**
 * Create employee
 */
export const createEmployee = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.user.role === "supervisor") {
      payload.managerId = req.user._id; // enforce manager
    }

    if (!payload.firstName || !payload.email || !payload.employeeId) {
      return res
        .status(400)
        .json({ message: "firstName, email and employeeId are required" });
    }

    const existing = await Employee.findOne({
      $or: [{ email: payload.email }, { employeeId: payload.employeeId }],
    });
    if (existing)
      return res
        .status(409)
        .json({ message: "Employee email or ID already exists" });

    const emp = await Employee.create(payload);
    res.status(201).json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * List employees with pagination + search
 */
// export const listEmployees = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search } = req.query;
//     const q = {};
//     if (search) {
//       q.$or = [
//         { firstName: { $regex: search, $options: "i" } },
//         { lastName: { $regex: search, $options: "i" } },
//         { email: { $regex: search, $options: "i" } },
//         { employeeId: { $regex: search, $options: "i" } },
//       ];
//     }

//     if (req.user.role === "supervisor") {
//       q.managerId = req.user._id; // restrict supervisors
//     }

//     const skip = (Number(page) - 1) * Number(limit);
//     const [items, total] = await Promise.all([
//       Employee.find(q).skip(skip).limit(Number(limit)).lean(),
//       Employee.countDocuments(q),
//     ]);
//     res.json({ items, total, page: Number(page), limit: Number(limit) });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const listEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const q = {};

    if (search) {
      q.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Employee.find(q).skip(skip).limit(Number(limit)).lean(),
      Employee.countDocuments(q)
    ]);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get single employee
 */
export const getEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Not found" });

    // Previously we blocked supervisors here; now allow GET for all authenticated roles.
    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update employee
 */
export const updateEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Not found" });

    if (
      req.user.role === "supervisor" &&
      String(emp.managerId) !== String(req.user._id)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (req.user.role === "supervisor") {
      req.body.managerId = req.user._id; // prevent changing managerId
    }

    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete employee
 * Keep admin-only by default
 */
export const deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Not found" });

    // extra safety: if route later allows supervisors, keep check
    if (
      req.user.role === "supervisor" &&
      String(emp.managerId) !== String(req.user._id)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
