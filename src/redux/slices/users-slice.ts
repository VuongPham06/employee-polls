import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { API } from '../../api';
import { RootState } from '../store.ts';
import { AnswerId, QuestionId, User, UserId } from '../../api/api-response.ts';
import { AppError } from '../../errors/AppError.ts';

const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState<{ me: User | null }>({ me: null });

export const fetchUser = createAsyncThunk('users/fetchUser', async (id: string) => {
  return await API.getUser(id);
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await API.getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addAnswer: (
      state,
      action: PayloadAction<{
        userId: UserId;
        questionId: QuestionId;
        answerId: AnswerId;
      }>
    ) => {
      const { userId, questionId, answerId } = action.payload;
      const user = state.entities[userId];
      if (!user) {
        throw new AppError('The user not found.');
      }
      user.answers[questionId] = answerId;
      return state;
    },
    addQuestion: (state, action: PayloadAction<{ userId: UserId; questionId: QuestionId }>) => {
      const { userId, questionId } = action.payload;
      const user = state.entities[userId];
      if (!user) {
        throw new AppError(`The user not found.`);
      }
      if (user.questions.includes(questionId)) {
        throw new AppError(`The question already belong to the user`);
      }
      user.questions.push(questionId);
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, payload) => {
        state.me = payload.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, payload) => {
        usersAdapter.setAll(state, payload);
      });
  }
});

export const usersReducer = usersSlice.reducer;

export const { selectById: selectUserById, selectAll: selectAllUsers } =
  usersAdapter.getSelectors<RootState>((state) => state.users);

export const { addAnswer: addUserAnswer, addQuestion: addQuestionToUser } = usersSlice.actions;

export const selectLeaderboardUsers = createSelector([selectAllUsers], (users): User[] =>
  users.slice().sort((user1, user2) => {
    const user1Score = Object.keys(user1.answers).length + user1.questions.length;
    const user2Score = Object.keys(user2.answers).length + user2.questions.length;
    return user2Score - user1Score;
  })
);
