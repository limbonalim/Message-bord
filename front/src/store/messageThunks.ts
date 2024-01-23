import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMessage } from '../types';
import axiosApi from '../axiosApi.ts';

export const getMessages = createAsyncThunk<IMessage[]>(
  'message/getMessages',
  async () => {
    const response = await axiosApi.get<IMessage[]>('/');
    return response.data;
  }
);