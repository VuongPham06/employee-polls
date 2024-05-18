import { Stack, Typography } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store.ts';
import { selectQuestionById } from '../../redux/slices/questions-slice.ts';
import { selectUserById } from '../../redux/slices/users-slice.ts';
import { selectAuthedUser } from '../../redux/slices/auth-slice.ts';
import { AnswerId } from '../../api/api-response.ts';
import { QuestionVoting } from '../../components/QuestionVoting.tsx';
import { QuestionResult } from '../../components/QuestionResult.tsx';

export const VotingPage = () => {
  const { id } = useParams();

  const question = useAppSelector((state) => selectQuestionById(state, id!));
  const author = useAppSelector((state) => {
    if (question) {
      return selectUserById(state, question.author);
    }
  });

  const { id: userId } = useAppSelector(selectAuthedUser);

  let votedOption: AnswerId | null = null;
  if (question && userId) {
    if (question.optionOne.votes.includes(userId)) {
      votedOption = 'optionOne';
    } else if (question.optionTwo.votes.includes(userId)) {
      votedOption = 'optionTwo';
    }
  }

  if (!author || !userId || !question) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      <Stack alignItems="center" justifyContent="center">
        <Typography variant="h5" fontWeight="bolder" m={5}>
          Poll by {author.id === userId ? 'You' : author.name}
        </Typography>
        <img
          src={author.avatarURL ?? ''}
          alt="user avatar"
          style={{
            borderRadius: '100%',
            height: 300,
            width: 300,
            margin: 'auto'
          }}
        />

        {votedOption === null ? (
          <QuestionVoting
            questionId={question.id}
            userId={userId}
            optionOneText={question.optionOne.text}
            optionTwoText={question.optionTwo.text}
            voted={votedOption}
          />
        ) : (
          <QuestionResult
            optionOneText={question.optionOne.text}
            optionTwoText={question.optionTwo.text}
            optionOneTotalVotes={question.optionOne.votes.length}
            optionTwoTotalVotes={question.optionTwo.votes.length}
            votedOption={votedOption}
          />
        )}
      </Stack>
    </>
  );
};
