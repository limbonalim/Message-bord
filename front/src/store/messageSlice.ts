import { IMessage } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMessages } from './messageThunks.ts';
import { RootState } from '../app/store.ts';

interface IMessageSlice {
  messages: IMessage[];
}

const initialState: IMessageSlice = {
  messages: []
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      console.log('getMessages.pending' + state);
    }).addCase(getMessages.fulfilled, (state, {payload: messages}: PayloadAction<IMessage[]>) => {
      state.messages = messages;
    }).addCase(getMessages.rejected, (state) => {
      console.log('getMessages.rejected' + state);
    });
  }
});

export const selectMessages = (state: RootState) => state.message.messages;

export const messageReducer = messageSlice.reducer;
