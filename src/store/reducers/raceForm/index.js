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
      const parts = field.split(".");
      let current = state;

      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!(part in current)) {
          throw new Error(`Path not found: ${path}`);
        }
        current = current[part];
      }

      const lastKey = parts[parts.length - 1];
      current[lastKey] = value;
    },
    insertStrategicInitiativesAndActions: (state, action) => {
      const { field, value } = action.payload;
      state[field].push(value);
    },
  },
});

export default raceFormSlice.reducer;
export const { resetForm, setForm, updateField } = raceFormSlice.actions;
