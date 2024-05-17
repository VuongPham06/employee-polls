import { Box, Stack, Typography } from '@mui/material';
import { AddQuestionForm } from './components/AddQuestionForm.tsx';

export const AddNewQuestionPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Stack spacing={3} width={500}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Would you rather
        </Typography>

        <Typography variant="h6" textAlign="center" fontWeight="bold" color="#888">
          Create your own poll
        </Typography>

        <AddQuestionForm />
      </Stack>
    </Box>
  );
};
