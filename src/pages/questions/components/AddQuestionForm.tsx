import { Button, CircularProgress, FormControl, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/store.ts';
import { selectAuthedUser } from '../../../redux/slices/auth-slice.ts';
import { createNewQuestion } from '../../../redux/slices/questions-slice.ts';
import { Status } from '../../../api/api-response.ts';

export const AddQuestionForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector(selectAuthedUser);

  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');

  const [addStatus, setAddStatus] = useState<Status>(Status.IDLE);

  const loading = addStatus === Status.LOADING;
  const buttonEnabled = Boolean(
    !loading && optionOneText && optionTwoText && optionOneText !== optionTwoText
  );

  const sameOptionsErrorMassage =
    optionOneText && optionTwoText && optionOneText === optionTwoText
      ? 'Two options should be different'
      : '';

  const [submitErrorMessage, setSubmitErrorMessage] = useState('');

  const handleAddQuestion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddStatus(Status.LOADING);
    const response = await dispatch(
      createNewQuestion({
        optionOneText,
        optionTwoText,
        author: auth.id!
      })
    ).unwrap();
    if (response.ok && response.qid) {
      navigate(`/voting/${response.qid}`);
    } else {
      setSubmitErrorMessage(response.error ?? '');
    }
  };

  return (
    <>
      <FormControl>
        <TextField
          value={optionOneText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOptionOneText(e.target.value.trim())
          }
          label="First option"
          disabled={loading}
        />
      </FormControl>

      <FormControl>
        <TextField
          value={optionTwoText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOptionTwoText(e.target.value.trim())
          }
          label="Second option"
          disabled={loading}
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        onClick={handleAddQuestion}
        disabled={!buttonEnabled}>
        {loading ? <CircularProgress data-testid="add-question-loading" /> : 'Submit'}
      </Button>

      {(sameOptionsErrorMassage || submitErrorMessage) && (
        <Typography fontSize={13} color="red">
          {sameOptionsErrorMassage || submitErrorMessage}
        </Typography>
      )}
    </>
  );
};
