import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from '../../api';
import { AnswerId, Question, QuestionId, UserId } from '../../api/api-response.ts';
import { RootState } from '../store.ts';
import { addQuestionAnswer } from './questions-slice.ts';
import { addUserAnswer } from './users-slice.ts';

const answersAdapter = createEntityAdapter<Question>({
  sortComparer: (a, b) => b.timestamp - a.timestamp
});

const initialState = answersAdapter.getInitialState<{
  userAnswered: Record<QuestionId, AnswerId>;
  loadUserAnsweredDone: boolean;
}>({
  userAnswered: {},
  loadUserAnsweredDone: false
});

export const fetchUserAnswered = createAsyncThunk(
  'answers/fetchUserAnswered',
  async (userId: string) => {
    return await API.getUserAnswered(userId);
  }
);

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAnswered.pending, (state) => {
        state.loadUserAnsweredDone = false;
      })
      .addCase(fetchUserAnswered.fulfilled, (state, payload) => {
        state.userAnswered = payload.payload;
        state.loadUserAnsweredDone = true;
      })
      .addCase(fetchUserAnswered.rejected, (_state, payload) => {
        console.log(`fetch user answered fail: ${payload.error.message}`);
      });
  }
});

export const pickAnswer = createAsyncThunk(
  'answers.pickAnswer',
  async (
    option: { userId: UserId; questionId: QuestionId; answerId: AnswerId },
    { dispatch }
  ): Promise<{ ok: boolean; error?: string }> => {
    const { userId, questionId, answerId } = option;

    try {
      await API.saveQuestionAnswer({
        authedUser: userId,
        qid: questionId,
        answerId
      });
      dispatch(addQuestionAnswer({ userId, questionId, answerId }));
      dispatch(addUserAnswer({ userId, questionId, answerId }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e as string };
    }
  }
);

export const selectAnswered = (state: RootState) => ({
  userAnswered: state.answers.userAnswered,
  loadUserAnsweredDone: state.answers.loadUserAnsweredDone
});

export const selectGetUserAnsweredStatus = (state: RootState) => state.answers.loadUserAnsweredDone;
export const selectUserAnswered = (state: RootState) => state.answers.userAnswered;

export const answersReducer = answersSlice.reducer;
