import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/store.ts';
import { selectQuestionById } from '../../../redux/slices/questions-slice.ts';

export const QuestionCard = (props: { id: string }) => {
  const navigate = useNavigate();

  const question = useAppSelector((state) => selectQuestionById(state, props.id));
  const createdDate = question ? new Date(question.timestamp).toDateString() : '';

  const handleShowClick = () => {
    navigate(`/voting/${props.id}`);
  };

  if (!question) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      <Card elevation={3} sx={{ width: 300, margin: 5 }}>
        <Stack alignItems="center" textAlign="center">
          <CardContent>
            <Typography gutterBottom variant="h5" fontWeight="bold">
              {question.author}
            </Typography>
            <Typography variant="body1" color="gray" aria-label="question-created-date">
              {createdDate}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="large" variant="contained" onClick={handleShowClick}>
              Show
            </Button>
          </CardActions>
        </Stack>
      </Card>
    </>
  );
};
