import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthenticatedUser, Status } from '../../api/api-response.ts';
import { API } from '../../api/index.ts';
import { RootState } from '../store.ts';

interface ValidatingUser {
  id: string;
  password: string;
}

const initialState: AuthenticatedUser | null = {
  id: null,
  name: null,
  avatarURL: null,
  password: null,
  status: Status.IDLE
};

export const validateUser = createAsyncThunk(
  'auth/validate',
  async ({ id, password }: ValidatingUser) => {
    const user = await API.getUser(id);
    if (!user || user.password !== password) {
      throw new Error('Invalid user or password');
    }
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateUser.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(validateUser.fulfilled, (_state, action) => {
        const { id, name, password, avatarURL } = action.payload;
        return { id, name, password, avatarURL, status: Status.SUCCESS };
      })
      .addCase(validateUser.rejected, (state) => {
        state.status = Status.FAILED;
      });
  }
});

export const { logoutUser } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectAuthedUser = (state: RootState) => state.auth;
