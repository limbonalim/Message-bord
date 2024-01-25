import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import type { IFormMessage } from '../../types';
import FileInput from '../UI/FileInput/FileInput.tsx';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {getMessages, postMessage} from '../../store/messageThunks.ts';
import {closeModal, selectIsPostLoading} from '../../store/messageSlice.ts';


interface Props {

}

const MessageForm: React.FC<Props> = () => {
  const [message, setMessage] = useState<IFormMessage>({
    author: '',
    message: '',
    image: null
  });
  const isLoading = useAppSelector(selectIsPostLoading);
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setMessage((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(prev => ({
      ...prev,
      image: e.target.files ? e.target.files[0] : null
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(postMessage(message));
    await dispatch(getMessages());
    dispatch(closeModal());
  };

  return (
    <form
      onSubmit={onSubmit}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            sx={{
              width: '100%'
            }}
            onChange={onChange}
            value={message.author}
            name="author"
            label="Author"
            type="text"
          />
        </Grid>
        <Grid item>
          <TextField
            sx={{
              width: '100%'
            }}
            onChange={onChange}
            value={message.message}
            multiline
            rows={3}
            name="message"
            label="Message"
            type="text"
            required
          />
        </Grid>
        <Grid item>
          <FileInput
            name="image"
            onChange={onChangeFileInput}
            label="Add imeage"
          />
        </Grid>
        <Grid item>
          <LoadingButton type="submit" disabled={isLoading} loading={isLoading} variant='outlined'>Submit</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageForm;