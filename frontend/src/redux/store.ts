import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import employeeReducer from "./slices/employeeSlice"; // ✅ ADD THIS

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer  // ✅ ADD THIS
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
