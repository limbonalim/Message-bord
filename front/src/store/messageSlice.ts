import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMessages, postMessage } from './messageThunks.ts';
import { RootState } from '../app/store.ts';
import type { IMessage } from '../types';

interface IMessageSlice {
  messages: IMessage[];
  isShowModal: boolean;
  isLoading: boolean;
  isPostLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState: IMessageSlice = {
  messages: [],
  isShowModal: false,
  isLoading: false,
  isPostLoading: false,
  isError: false,
  errorMessage: '',
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
    clearError: (state) => {
      state.isError = false;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.isLoading = true;
    }).addCase(getMessages.fulfilled, (state, {payload: messages}: PayloadAction<IMessage[]>) => {
      state.messages = messages;
      state.isLoading = false;
    }).addCase(getMessages.rejected, (state, {error}) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = error.message? error.message : '';
    });
    builder.addCase(postMessage.pending, (state) => {
      state.isPostLoading = true;
    }).addCase(postMessage.fulfilled, (state) => {
      state.isPostLoading = false;
    }).addCase(postMessage.rejected, (state, {error}) => {
      state.isPostLoading = false;
      state.isError = true;
      state.errorMessage = error.message? error.message : '';
    });
  }
});

export const selectMessages = (state: RootState) => state.message.messages;
export const selectIsShowModal = (state: RootState) => state.message.isShowModal;
export const selectIsLoading = (state: RootState) => state.message.isLoading;
export const selectIsPostLoading = (state: RootState) => state.message.isPostLoading;
export const selectIsError = (state: RootState) => state.message.isError;
export const selectErrorMessage = (state: RootState) => state.message.errorMessage;

export const messageReducer = messageSlice.reducer;

export const {openModal, closeModal, clearError} = messageSlice.actions;
