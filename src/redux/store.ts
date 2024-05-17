import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth-slice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { usersReducer } from './slices/users-slice.ts';
import { questionsReducer } from './slices/questions-slice.ts';
import { answersReducer } from './slices/answers-slice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    questions: questionsReducer,
    answers: answersReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
