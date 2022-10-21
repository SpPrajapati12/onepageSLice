import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllUsersById = createAsyncThunk("user/getUserById", async (id) => {
  const response = await axios.get(`http://localhost:8000/users/${id}`);
  return response.data;
});
const initialState = {
  user: []
}

const users = createSlice({
  name: "user",
  initialState,
  reducers : {
    changeMode(state,action) {
      state.mode = action.payload
    }
  },
  extraReducers: {
    [getAllUsersById.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsersById.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.loading = false;
      state.user = action.payload
    },
    [getAllUsersById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default users.reducer


