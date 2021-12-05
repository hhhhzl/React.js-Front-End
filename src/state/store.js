import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import usersReducer from "./slices/users";
import orgsReducer from "./slices/orgs";
import projectsReducer from "./slices/projs";
import questionAnsweringReducer from "./slices/question-answering";
import questionEditReducer from "./slices/question-edit";
import indicatorEditReducer from "./slices/indicator-edit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    orgs: orgsReducer,
    projs: projectsReducer,
    questionAnswering: questionAnsweringReducer,
    questionEdit: questionEditReducer,
    indicatorEdit: indicatorEditReducer,
  },
});

export default store;

// re-fetch list when `> threshold` amount of time has been elapsed since the last fetch
const REFETCH_THRESHOLD = 300 * 10; // 300s
export const shouldRefetchList = (lastUpdatedAt) =>
  !lastUpdatedAt || Date.now() - lastUpdatedAt > REFETCH_THRESHOLD;
