import { Box, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { selectAuthedUser } from '../../redux/slices/auth-slice.ts';
import {
  fetchQuestions,
  selectQuestionFetchStatus,
  selectQuestionIds
} from '../../redux/slices/questions-slice.ts';
import { QuestionList } from './components/QuestionList.tsx';
import {
  fetchUserAnswered,
  selectGetUserAnsweredStatus,
  selectUserAnswered
} from '../../redux/slices/answers-slice.ts';
import { Loading } from '../../components/Loading.tsx';

const HomePageBody = ({ userId, name }: { userId: string; name: string }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(fetchUserAnswered(userId));
    void dispatch(fetchQuestions());
  }, [dispatch, userId]);

  const questionIds = useAppSelector(selectQuestionIds);
  const userAnswered = useAppSelector(selectUserAnswered);
  const loadQuestionsDone = useAppSelector(selectQuestionFetchStatus);
  const loadUserAnsweredDone = useAppSelector(selectGetUserAnsweredStatus);

  const answeredQuestionIds = questionIds.filter((qid) => userAnswered[qid]).map(String);
  const unAnsweredQuestionIds = questionIds.filter((qid) => !userAnswered[qid]).map(String);

  const [tabValue, setTabValue] = useState<'answered' | 'unanswered'>('unanswered');
  const handleTabValueChange = (
    _event: React.SyntheticEvent,
    newTabValue: 'answered' | 'unanswered'
  ) => {
    setTabValue(newTabValue);
  };

  if (!loadUserAnsweredDone || !loadQuestionsDone) {
    return <Loading loading={true} />;
  }

  return (
    <Box display="flex" justifyContent="center">
      <Stack sx={{ width: '100%' }}>
        <Typography variant="h4" textAlign="center" fontWeight="bolder" mt={5} mb={2}>
          Hello, {name}
        </Typography>

        <Divider />

        <Tabs value={tabValue} onChange={handleTabValueChange} centered sx={{ marginTop: 3 }}>
          <Tab label="New Questions" value="unanswered" />
          <Tab label="Answered Questions" value="answered" />
        </Tabs>

        <div data-testid="unanswered-questions" hidden={tabValue !== 'unanswered'}>
          <QuestionList title="New questions" ids={unAnsweredQuestionIds} />
        </div>

        <div data-testid="answered-questions" hidden={tabValue !== 'answered'}>
          <QuestionList title="Answered questions" ids={answeredQuestionIds} />
        </div>
      </Stack>
    </Box>
  );
};

export const HomePage = () => {
  const auth = useAppSelector(selectAuthedUser);
  if (!auth.id || !auth.name) {
    return <Navigate to={'/login'} />;
  }

  return <HomePageBody userId={auth.id} name={auth.name} />;
};
