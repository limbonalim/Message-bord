import Message from './components/message/Message.tsx';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { selectMessages } from './store/messageSlice.ts';
import { useEffect } from 'react';
import { getMessages } from './store/messageThunks.ts';


const App = () => {
  const messages = useAppSelector(selectMessages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMessages());
  });

  return (
    <>
      <Grid
        container
        spacing={2}
      >
        {messages.map((message) => (
          <Grid
            item
            key={message.id}
          >
            <Message
              message={message.message}
              dateTime={message.dateTime}
              author={message.author}
              image={message.image}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default App;
