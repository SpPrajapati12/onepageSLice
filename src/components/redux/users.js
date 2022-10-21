import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllUsers = createAsyncThunk("users/get_all_users", async () => {
  const response = await axios.get(`http://localhost:8000/users`);
  return response.data;
});
export const deleteUser = createAsyncThunk("user/delete_By_Id", async (id) => {
  const response = await axios.delete(`http://localhost:8000/users/${id}`);
  return response.data;
});
export const addUser = createAsyncThunk("user/add_By_Id", async (state) => {
  const response = await axios.post(`http://localhost:8000/users`, state);
  return response.data;
});
export const updateUser = createAsyncThunk("user/update_By_Id", async ({id, userName,phone,email}) => {
  const response = await axios.patch(`http://localhost:8000/users/${id}`, {userName,phone,email});
  return response.data;
});

const initialState = {
  users: [],
  hide : false
}

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    hideshow (state,action) {
      state.hide = action.payload
    }
  },
  extraReducers: {
    // [getAllUsers.pending]: (state) => {
    //   state.loading = true;
    // },
    [getAllUsers.fulfilled]: (state, action) => {
      return { ...state, users: action.payload };
    },
    // [getAllUsers.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // [deleteUser.pending]: (state) => {
    //   state.loading = true;
    // },
    [deleteUser.fulfilled]: (state, action) => {
      console.log("delete Successfully!");
      // let index = state.users.findIndex(({ id }) => id === action.payload.id);
      // state.users.splice(index, 1);
      state.user = state.users.filter((i) => i.id !== action.payload.id)
    },
    // [deleteUser.rejected]: (state, action) => {
    //   state.loading = false;
    // },

    [addUser.fulfilled]: (state, action) => {
      state.users.push(action.payload);
    },
    // [addUser.rejected]: (state) => {
    //   state.loading = false;
    // },
    // [updateUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.users.findIndex(tutorial => tutorial.id === action.payload.id);
      state.users[index] = {
        ...state.users[index],
        ...action.payload,
      };
    },
    // [updateUser.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  },
});
export const {hideshow} = users.actions
export default users.reducer