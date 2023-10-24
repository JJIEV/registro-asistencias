import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiUrl } from '../../store/baseUrl.js';

export const getCaptchaKey = createAsyncThunk(
  'captcha/key',
  async () => {
    try {
      const response = await axios.get(ApiUrl + '/parametro-captcha?nombre=captcha_key');
      const { data, status } = response;
      if (status === 200) {
        return data.valor;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const captchaSlice = createSlice({
  name: 'captcha',
  initialState: {
    key: "",
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCaptchaKey.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(getCaptchaKey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.key = action.payload;
      })
      .addCase(getCaptchaKey.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export default captchaSlice.reducer;
