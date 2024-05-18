import { Typography } from '@mui/material'
import { AnswerId } from '../api/api-response.ts';
import { QuestionResultDetail } from './QuestionResultDetail.tsx'

export const QuestionResult = (props: {
  optionOneText: string
  optionTwoText: string
  optionOneTotalVotes: number
  optionTwoTotalVotes: number
  votedOption: AnswerId
}) => {
  const totalVotes = props.optionOneTotalVotes + props.optionTwoTotalVotes;
  return (
    <>
      <Typography variant="h4" fontWeight="bold" m={3}>
        Poll result
      </Typography>
      <QuestionResultDetail
        text={props.optionOneText}
        numberOfVotes={props.optionOneTotalVotes}
        totalVotes={totalVotes}
        voted={props.votedOption === "optionOne"}
      />
      <QuestionResultDetail
        text={props.optionTwoText}
        numberOfVotes={props.optionTwoTotalVotes}
        totalVotes={totalVotes}
        voted={props.votedOption === "optionTwo"}
      />
    </>
  );
};
