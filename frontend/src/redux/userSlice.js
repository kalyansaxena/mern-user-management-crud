import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  users: [],
  isLoading: false,
  isRegisterSuccess: false,
  isRegisterError: false,
  isGetUsersSuccess: false,
  isGetUsersError: false,
  isEditUserSuccess: false,
  isEditUserError: false,
  isDeleteUserSuccess: false,
  isDeleteUserError: false,
  message: "",
};

const errorMessageHandler = (error) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return message;
};

// Register User
export const register = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      return await userService.register(user);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Users
export const getUsers = createAsyncThunk("user/getUsers", async (thunkAPI) => {
  try {
    return await userService.getUsers();
  } catch (error) {
    const message = errorMessageHandler(error);
    return thunkAPI.rejectWithValue(message);
  }
});

// Edit User
export const editUser = createAsyncThunk(
  "user/editUser",
  async (user, thunkAPI) => {
    try {
      return await userService.editUser(user);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, thunkAPI) => {
    try {
      return await userService.deleteUser(userId);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isRegisterSuccess = false;
      state.isRegisterError = false;
      state.isGetUsersSuccess = false;
      state.isGetUsersError = false;
      state.isEditUserSuccess = false;
      state.isEditUserError = false;
      state.isDeleteUserSuccess = false;
      state.isDeleteUserError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isRegisterSuccess = true;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isRegisterError = true;
      state.message = action.payload;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isGetUsersSuccess = true;
      state.users = [...action.payload];
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isGetUsersError = true;
      state.message = action.payload;
    });

    builder.addCase(editUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(editUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isEditUserSuccess = true;
      state.message = action.payload;
    });

    builder.addCase(editUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isEditUserError = true;
      state.message = action.payload;
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isDeleteUserSuccess = true;
      state.message = action.payload;
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isDeleteUserError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
