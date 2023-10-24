import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../../store/baseUrl.js";


export const cargarRepresentacion = createAsyncThunk(
  "representacion/add",
  async (obj) => {
    try {
      let urlGetDocuments = "";
      const { cdcValue, pin } = obj;
      urlGetDocuments =
        ApiUrl +
        `/documentos-electronicos-numero-documento/PDF?cdc=${cdcValue}&pin=${pin}`;

        const response = await axios
        .get(urlGetDocuments, {
          responseType: "blob",
        })
        if(response.status === 200) {
          const url = window.URL.createObjectURL(response.data);
          const pdfWindow = window.open();
          pdfWindow.location.href = url;
     
          window.URL.revokeObjectURL(url);
          return response.data.size;
        }
        else{
          return thunkApi.rejectWithValue(response);
        }
    } catch (error) {
      console.log("Error response: ",error)
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const cargarRepresentacionRuc = createAsyncThunk(
  "representacion/add",
  async (obj) => {
    try {
      let urlGetDocuments = "";
      const { codigo, pin } = obj;
      urlGetDocuments =
        ApiUrl +
        `/documentos-electronicos-numero-documento/PDF?idPortal=${codigo}&pin=${pin}`;

        const response = await axios
        .get(urlGetDocuments, {
          responseType: "blob",
        })
        if(response.status === 200) {
          const url = window.URL.createObjectURL(response.data);
          const pdfWindow = window.open();
          pdfWindow.location.href = url;
     
          window.URL.revokeObjectURL(url);
          return response.data.size;
        }
        else{
          return thunkApi.rejectWithValue(response);
        }
    } catch (error) {
      console.log("Error response: ",error)
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const cargarRepresentacionAndXml = createAsyncThunk(
  "representacion/cdc/xml",
  async (obj, thunkApi) => {
    try {
      let urlGetDocuments = "";
      const { cdcValue, pin } = obj;
      urlGetDocuments =
        ApiUrl +
        `/documentos-electronicos-numero-documento/FIRMADO?cdc=${cdcValue}&pin=${pin}`;

      const response = await axios
        .get(urlGetDocuments, {
          responseType: "blob",
        })
        if(response.status === 200) {
          const url = window.URL.createObjectURL(response.data);
          const pdfWindow = window.open();
          pdfWindow.location.href = url;
     
          window.URL.revokeObjectURL(url);
          return response.data.size;
        }
        else{
          return thunkApi.rejectWithValue(response);
        }
    } catch (error) {
      console.log("Error response: ",error)
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const cargarRepresentacionXmlNumeros = createAsyncThunk(
  "representacion/numeros/xml",
  async (obj) => {
    try {
      let urlGetDocuments = "";
      const { pexp, est, num, pin } = obj;
      urlGetDocuments =
        ApiUrl +
        `/documentos-electronicos-numero-documento/FIRMADO?puntoExpedicion=${pexp}&establecimiento=${est}&numero=${num}&pin=${pin}`;

        const response = await axios
        .get(urlGetDocuments, {
          responseType: "blob",
        })
        if(response.status === 200) {
          const url = window.URL.createObjectURL(response.data);
          const pdfWindow = window.open();
          pdfWindow.location.href = url;
     
          window.URL.revokeObjectURL(url);
          return response.data.size;
        }
        else{
          return thunkApi.rejectWithValue(response);
        }
    } catch (error) {
      console.log("Error response: ",error)
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const cargarRepresentacionXmlRuc = createAsyncThunk(
  "representacion/ruc/xml",
  async (obj) => {
    try {
      let urlGetDocuments = "";
      const { codigo, pin } = obj;
      urlGetDocuments =
        ApiUrl +
        `/documentos-electronicos-numero-documento/FIRMADO?idPortal=${codigo}&pin=${pin}`;

        const response = await axios
        .get(urlGetDocuments, {
          responseType: "blob",
        })
        if(response.status === 200) {
          const url = window.URL.createObjectURL(response.data);
          const pdfWindow = window.open();
          pdfWindow.location.href = url;
     
          window.URL.revokeObjectURL(url);
          return response.data.size;
        }
        else{
          return thunkApi.rejectWithValue(response);
        }
    } catch (error) {
      console.log("Error response: ",error)
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const cargarRepresentacionPorNumeros = createAsyncThunk(
  "representacion/add2",
  async (obj) => {
    try {
      let urlGetDocuments = "";
      const { pexp, est, num, pin } = obj;
      urlGetDocuments =
        ApiUrl +
        `/documentos-electronicos-numero-documento/PDF?puntoExpedicion=${pexp}&establecimiento=${est}&numero=${num}&pin=${pin}`;

        const response = await axios
        .get(urlGetDocuments, {
          responseType: "blob",
        })
        if(response.status === 200) {
          const url = window.URL.createObjectURL(response.data);
          const pdfWindow = window.open();
          pdfWindow.location.href = url;
     
          window.URL.revokeObjectURL(url);
          return response.data.size;
        }
        else{
          return thunkApi.rejectWithValue(response);
        }
    } catch (error) {
      console.log("Error response: ",error)
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const representacionSlice = createSlice({
  name: "representacion",
  initialState: {
    representaciones: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    clearStateRepresentaciones: (state) => {
      (state.isSuccess = false),
        (state.isError = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.representaciones = []);
    },
  },
  extraReducers: {
    [cargarRepresentacion.fulfilled]: (state, { payload }) => {
      state.representaciones = payload;
      (state.isSuccess = true),
        (state.isLoading = false),
        (state.isError = false);
    },
    [cargarRepresentacion.pending]: (state) => {
      state.isLoading = true;
    },
    [cargarRepresentacion.rejected]: (state, { payload }) => {
      (state.isSuccess = false),
        (state.isLoading = false),
        (state.isError = true),
        (state.message = payload);
    },
    [cargarRepresentacionPorNumeros.fulfilled]: (state, { payload }) => {
      state.representaciones = payload;
      (state.isSuccess = true),
        (state.isLoading = false),
        (state.isError = false);
    },
    [cargarRepresentacionPorNumeros.pending]: (state) => {
      state.isLoading = true;
    },
    [cargarRepresentacionPorNumeros.rejected]: (state, { payload }) => {
      (state.isSuccess = false),
        (state.isLoading = false),
        (state.isError = true),
        (state.message = payload);
    },
    [cargarRepresentacionXmlRuc.fulfilled]:(state, { payload }) => {
      state.representaciones = payload;
      (state.isSuccess = true),
        (state.isLoading = false),
        (state.isError = false);
    },
    [cargarRepresentacionXmlRuc.pending]: (state) => {
      state.isLoading = true;
    },
    [cargarRepresentacionXmlRuc.rejected]: (state, { payload }) => {
      (state.isSuccess = false),
        (state.isLoading = false),
        (state.isError = true),
        (state.message = payload);
    },
    [cargarRepresentacionRuc.fulfilled]: (state, {payload})=> {
      state.representaciones = payload;
      (state.isSuccess = true),
        (state.isLoading = false),
        (state.isError = false);
    },
    [cargarRepresentacionRuc.pending]: (state) => {
      state.isLoading = true;
    },
    [cargarRepresentacionRuc.rejected]: (state, { payload }) => {
      (state.isSuccess = false),
        (state.isLoading = false),
        (state.isError = true),
        (state.message = payload);
    },
    [cargarRepresentacionAndXml.fulfilled]:(state, {payload})=> {
      (state.isSuccess = true),
        (state.isLoading = false),
        (state.isError = false);
    },
    [cargarRepresentacionAndXml.pending]: (state) => {
      state.isLoading = true;
    },
    [cargarRepresentacionAndXml.rejected]: (state, { payload }) => {
      (state.isSuccess = false),
        (state.isLoading = false),
        (state.isError = true),
        (state.message = payload);
    },
    [cargarRepresentacionXmlNumeros.fulfilled]:(state, {payload})=> {
      state.representaciones = payload;
      (state.isSuccess = true),
        (state.isLoading = false),
        (state.isError = false);
    },
    [cargarRepresentacionXmlNumeros.pending]: (state) => {
      state.isLoading = true;
    },
    [cargarRepresentacionXmlNumeros.rejected]: (state, { payload }) => {
      (state.isSuccess = false),
        (state.isLoading = false),
        (state.isError = true),
        (state.message = payload);
    },
  },
});
export const { clearStateRepresentaciones } = representacionSlice.actions;
