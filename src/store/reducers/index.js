import { combineReducers } from "@reduxjs/toolkit";
import raceFormReducer from "./raceForm";
import userReducer from "./user";

const rootReducer = combineReducers({
  raceForm: raceFormReducer,
  user: userReducer,
});

export default rootReducer;
