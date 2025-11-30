import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axios";

interface Employee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  status: string;
  notes?: string;
  dateOfJoining?: string;
}

interface EmployeeState {
  items: Employee[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  items: [],
  total: 0,
  loading: false,
  error: null
};

export const fetchEmployees = createAsyncThunk<
  { items: Employee[]; total: number },
  any,
  { rejectValue: string }
>("employee/fetch", async (params, { rejectWithValue }) => {
  try {
    const res = await api.get("/employees", { params });
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch employees");
  }
});

export const createEmployee = createAsyncThunk<
  Employee,
  Partial<Employee>,
  { rejectValue: string }
>("employee/create", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/employees", payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to create employee");
  }
});

export const updateEmployee = createAsyncThunk<
  Employee,
  { id: string; data: Partial<Employee> },
  { rejectValue: string }
>("employee/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/employees/${id}`, data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to update employee");
  }
});

export const deleteEmployee = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>("employee/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/employees/${id}`);
    return { id };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to delete employee");
  }
});

const slice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.items = state.items.map((it) =>
          it._id === action.payload._id ? action.payload : it
        );
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.items = state.items.filter((it) => it._id !== action.payload.id);
      });
  }
});

export default slice.reducer;
