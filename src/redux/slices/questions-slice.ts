import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { API } from '../../api';
import { AnswerId, Question, QuestionId, UserId } from '../../api/api-response.ts';
import { RootState } from '../store.ts';
import { addQuestionToUser } from './users-slice.ts';

const questionsAdapter = createEntityAdapter<Question>({
  sortComparer: (a, b) => b.timestamp - a.timestamp
});

const initialState = questionsAdapter.getInitialState<{ loadQuestionsDone: boolean }>({
  loadQuestionsDone: false
});

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  return await API.getQuestions();
});

export const createNewQuestion = createAsyncThunk(
  'addQuestion',
  async (
    option: { optionOneText: string; optionTwoText: string; author: UserId },
    { dispatch }
  ) => {
    try {
      const question = await API.saveQuestion(option);
      dispatch(addQuestionToUser({ userId: option.author, questionId: question.id }));
      dispatch(addQuestion(question));
      return { ok: true, qid: question.id };
    } catch (e) {
      return { ok: false, error: e as string };
    }
  }
);

const questionsSlice = createSlice({
  name: 'questions',
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
      const question = state.entities[questionId];
      if (question) {
        question[answerId].votes.push(userId);
      }
    },
    addQuestion: (state, payload) => questionsAdapter.addOne(state, payload)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loadQuestionsDone = false;
      })
      .addCase(fetchQuestions.fulfilled, (state, payload) => {
        questionsAdapter.setAll(state, payload);
        state.loadQuestionsDone = true;
      });
  }
});

export const { addAnswer: addQuestionAnswer, addQuestion } = questionsSlice.actions;

export const { selectIds: selectQuestionIds, selectById: selectQuestionById } =
  questionsAdapter.getSelectors<RootState>((state) => state.questions);

export const selectQuestionFetchStatus = (state: RootState) => state.questions.loadQuestionsDone;

export const questionsReducer = questionsSlice.reducer;
