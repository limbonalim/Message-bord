import {Grid} from '@mui/material';
import {CircularProgress} from '@mui/material';
import {JSX, useEffect} from 'react';
import Message from './components/message/Message.tsx';
import {useAppDispatch, useAppSelector} from './app/hooks.ts';
import {selectIsLoading, selectMessages} from './store/messageSlice.ts';
import {getMessages} from './store/messageThunks.ts';
import MessageForm from './components/messageForm/MessageForm.tsx';
import FormModal from './components/UI/modal/FormModal.tsx';


const App = () => {
  const messages = useAppSelector(selectMessages);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  let content: JSX.Element | JSX.Element[] = (<CircularProgress/>)

  if (!isLoading) {
    content = (messages.map((message) => (
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
    )))
  }

  return (
    <>
      <FormModal>
        <MessageForm/>
      </FormModal>
      <Grid
        container
        spacing={2}
      >
        {content}
      </Grid>
    </>
  );
};

export default App;
