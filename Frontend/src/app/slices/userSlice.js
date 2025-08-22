import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, fetchAllUsers, getUsers } from '../actions/user';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: (JSON.parse(localStorage.getItem("user")) || null),
    loading: false,
    error: null,
    allUsers: [],
    allUsersLoading: false,
    allUsersError: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.setItem("user", null);

    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        localStorage.setItem("user", JSON.stringify(action.payload));


      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Handle register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.allUsersLoading = true;
        state.allUsersError = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsersLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.allUsersLoading = false;
        state.allUsersError = action.payload;
      })


      // get single user
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.user = null;
      })

      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null
      })

      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;