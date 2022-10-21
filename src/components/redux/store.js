import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import users from "./users";


export const store = configureStore({
  reducer: {
    users: users,
    user : user
  },
} );
