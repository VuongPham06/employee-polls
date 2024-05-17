import { Backdrop, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../redux/store.ts';
import { AnswerId, QuestionId, UserId, Status } from '../api/api-response.ts';
import { pickAnswer } from '../redux/slices/answers-slice.ts';
import { VotingOption } from './VotingOption.tsx';

export const QuestionVoting = (props: {
  questionId: QuestionId;
  userId: UserId;
  optionOneText: string;
  optionTwoText: string;
  voted: string | null;
}) => {
  const dispatch = useAppDispatch();

  const [votingStatus, setVotingStatus] = useState<Status>(Status.IDLE);

  const loading = votingStatus === Status.LOADING;
  const canVote = !props.voted && (votingStatus === Status.IDLE || votingStatus === Status.FAILED);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const selectAnswer = (answerId: AnswerId) => {
    return async () => {
      if (votingStatus === Status.SUCCESS) {
        return;
      }
      setVotingStatus(Status.LOADING);
      const response = await dispatch(
        pickAnswer({
          userId: props.userId,
          questionId: props.questionId,
          answerId
        })
      ).unwrap();
      setVotingStatus(response.ok ? Status.SUCCESS : Status.FAILED);
      if (response.error) {
        setErrorMessage(response.error);
      }
    };
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" data-testid="answer-loading" />
      </Backdrop>

      <Typography variant="h4" fontWeight="bold" m={3}>
        Would you rather
      </Typography>

      <Grid container>
        <Grid item xs={6} px={1}>
          <Box display="flex" justifyContent="flex-end">
            <VotingOption
              text={props.optionOneText}
              select={selectAnswer('optionOne')}
              canVote={canVote}
              voted={props.voted === 'optionOne'}
            />
          </Box>
        </Grid>
        <Grid item xs={6} px={1}>
          <Box display="flex" justifyContent="flex-start">
            <VotingOption
              text={props.optionTwoText}
              select={selectAnswer('optionTwo')}
              canVote={canVote}
              voted={props.voted === 'optionTwo'}
            />
          </Box>
        </Grid>
      </Grid>

      {errorMessage && (
        <Typography variant="h6" fontWeight="bold" m={3}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
};
