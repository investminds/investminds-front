import { createSlice } from "@reduxjs/toolkit";
import initialState from "./utils/state.js";

const raceFormSlice = createSlice({
  name: "raceForm",
  initialState,
  reducers: {
    resetForm: () => initialState,
    setForm: (_, action) => action.payload.raceForm,
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    insertStrategicInitiativesAndActions: (state, action) => {
      const { field, value } = action.payload;
      state[field].push(value);
    },
  },
});

export default raceFormSlice.reducer;
export const { resetForm, setForm, updateField } = raceFormSlice.actions;
