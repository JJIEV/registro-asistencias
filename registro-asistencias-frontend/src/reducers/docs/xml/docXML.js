import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { ApiUrl } from "../../../store/baseUrl.js";
import { getKude } from "../kude/kudeActions.js";
import { getXml } from "./xmlActions.js";
const cookie = new Cookies();
export const cargarDocXml = createAsyncThunk(
  "docXml/add/xml",
  async (id, thunkApi) => {
    try {
      let urlGetDocuments = "";
      urlGetDocuments =
        ApiUrl + `/documentos-electronicos-xml/deId/FIRMADO/${id}`;

      await axios
        .get(urlGetDocuments, {
          responseType: "blob",
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob.data);
          const pdfWindow = window.open();
          pdfWindow.location.href = url;
          a.click();
          window.URL.revokeObjectURL(url);
        });
    } catch (error) {
      return error;
    }
  }
);
export const cargarDocXmlAndKuDE = createAsyncThunk(
  "docXml/add/KuDE",
  async (id, thunkApi) => {
    try {
      let urlGetDocuments = "";
      urlGetDocuments = ApiUrl + `/documentos-electronicos-xml/deId/PDF/${id}`;

      await axios
        .get(urlGetDocuments, {
          responseType: "blob",
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob.data);
          const pdfWindow = window.open();
          pdfWindow.location.href = url;
          a.click();
          window.URL.revokeObjectURL(url);
        });
    } catch (error) {
      return error;
    }
  }
);
export const docXmlSlice = createSlice({
  name: "docXml",
  initialState: {
    docsXml: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    clearState: (state) => {
      (state.isSuccess = false),
        (state.isError = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.docsXml = []);
    },
  },
  extraReducers: {
    [cargarDocXml.fulfilled]: (state, { payload }) => {
      state.docsXml = payload;
      (state.isSuccess = true),
        (state.isLoading = false),
        (state.isError = false);
    },
    [cargarDocXml.pending]: (state) => {
      state.isLoading = true;
    },
    [cargarDocXml.rejected]: (state, { payload }) => {
      (state.isSuccess = false),
        (state.isLoading = false),
        (state.isError = true),
        (state.message = payload);
    },
  },
});

export const { clearState } = docXmlSlice.actions;
