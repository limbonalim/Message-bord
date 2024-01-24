import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMessages, postMessage } from './messageThunks.ts';
import { RootState } from '../app/store.ts';
import type { IMessage } from '../types';

interface IMessageSlice {
  messages: IMessage[];
  isShowModal: boolean;
  isLoading: boolean;
  isPostLoading: boolean;
}

const initialState: IMessageSlice = {
  messages: [],
  isShowModal: false,
  isLoading: false,
  isPostLoading: false,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isShowModal = true;
    },
    closeModal: (state) => {
      state.isShowModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.isLoading = true;
    }).addCase(getMessages.fulfilled, (state, {payload: messages}: PayloadAction<IMessage[]>) => {
      state.messages = messages;
      state.isLoading = false;
    }).addCase(getMessages.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(postMessage.pending, (state) => {
      state.isPostLoading = true;
    }).addCase(postMessage.fulfilled, (state) => {
      state.isPostLoading = false;
    }).addCase(postMessage.rejected, (state) => {
      state.isPostLoading = false;
    });
  }
});

export const selectMessages = (state: RootState) => state.message.messages;
export const selectIsShowModal = (state: RootState) => state.message.isShowModal;
export const selectIsLoading = (state: RootState) => state.message.isLoading;
export const selectIsPostLoading = (state: RootState) => state.message.isPostLoading;

export const messageReducer = messageSlice.reducer;

export const {openModal, closeModal} = messageSlice.actions;
