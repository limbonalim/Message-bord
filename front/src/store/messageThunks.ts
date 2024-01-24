import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFormMessage, IMessage } from '../types';
import axiosApi from '../axiosApi.ts';

export const getMessages = createAsyncThunk<IMessage[]>(
  'message/getMessages',
  async () => {
    const response = await axiosApi.get<IMessage[]>('/');
    return response.data;
  }
);

export const postMessage = createAsyncThunk<void, IFormMessage>(
  'message/postMessage',
  async (message) => {
    const data = new FormData();
    if (message.author) {
      data.append('author', message.author);
    }
    if (message.image) {
      data.append('image', message.image);
    }
    data.append('message', message.message);

    await axiosApi.post('/', data);
  }
);