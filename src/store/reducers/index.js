import { combineReducers } from "@reduxjs/toolkit";
import raceFormReducer from "./raceForm";

const rootReducer = combineReducers({
  raceForm: raceFormReducer,
});

export default rootReducer;
