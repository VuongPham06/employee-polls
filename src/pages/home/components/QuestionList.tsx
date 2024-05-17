import { Box, Paper, Stack, Typography } from '@mui/material';
import { QuestionCard } from './QuestionCard';
import { QuestionId } from '../../../api/api-response.ts';

export const QuestionList = (props: { title: string; ids: QuestionId[] }) => {
  const questionCards = props.ids.map((id) => <QuestionCard key={id} id={id} />);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" my={5}>
      <Paper elevation={5} sx={{ width: '80%' }}>
        <Stack display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h5" textAlign="center" fontWeight="bold" my={2}>
            {props.title}
          </Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {questionCards}
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
