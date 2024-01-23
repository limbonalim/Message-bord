import {IMessage} from '../types';
import {createSlice} from "@reduxjs/toolkit";

interface IMessageSlice {
  messages: IMessage[]
}

const initialState: IMessageSlice = {
  messages: []
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {}
});

export const messageReducer = messageSlice.reducer;

export const {} = messageSlice.actions;