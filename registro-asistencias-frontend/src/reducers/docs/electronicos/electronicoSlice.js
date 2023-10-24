import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { ApiUrl, redirectLoginUrl } from "../../../store/baseUrl.js";
import { generarTokenConRefreshToken } from "../../auth/helpers/keycloakFunctions.js";
import { onLogout } from "../../auth/slices/authSlice";



const cookies = new Cookies();

export const cargarPagina = createAsyncThunk(
  "electronico/add",
  async (empresaId, {dispatch}) => {
    if (cookies.get("token")) {
      //si tiene valor el token y el header, osea que si no expiró

      try {
        const token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments =
          ApiUrl + `/documentos-electronicos-empresa/0/4/${empresaId}`;
        const response = await axios.get(urlGetDocuments, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { status } = response;
        if (status === 200) {
          return response;
        } else {
          return thunkApi.rejectWithValue(response.data);
        }
      } catch (error) {
        thunkApi.rejectWithValue(error.response.data);
      }
    } else {

      if (cookies.get("refreshToken")) {

        //si todavia no expiro el refreshToken

        //se hace el request al backend para obtener nuevos tokens


        await generarTokenConRefreshToken(cookies.get("refreshToken"));
       
        dispatch(cargarPagina(empresaId));
      } else {
        //cierra sesion
        dispatch(onLogout())
        window.location.href=redirectLoginUrl
        //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
      }
    }
  }
);

export const cargarPaginaEmpresaSeleccionada = createAsyncThunk(
  "electronico/select",
  async (empresa, {dispatch}) => {
    if (cookies.get("token")) {
      //si tiene valor el token y el header, osea que si no expiró

      try {
        const token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments =
          ApiUrl + `/documentos-electronicos-empresa/0/50/${empresa.id}`;
        const response = await axios.get(urlGetDocuments, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { status } = response;
        if (status === 200) {
          return response;
        } 
      } catch (error) {
        console.log(error)
      }
    } else {
      if (cookies.get("refreshToken")) {

        await generarTokenConRefreshToken(cookies.get("refreshToken"));
        // response = await axios.get(urlGetDocuments, {
        //   headers: { Authorization: `Bearer ${token.accesToken}` },
        // });
        dispatch(cargarPaginaEmpresaSeleccionada(empresa));
      } else {
        //cierra sesion
        dispatch(onLogout())
        window.location.href=redirectLoginUrl
        //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
      }
    }
  }
);
export const cargarPaginaFiltrada = createAsyncThunk(
  "electronico/filtrado",
  async (filtro, {dispatch}) => {
    if (cookies.get("token")) {
      //si tiene valor el token y el header, osea que si no expiró
      let token = cookies.get("token");
      let urlGetDocuments = "";
      let { tipoDocumento, empresaRuc, startFecha, endFecha, empresaId } = filtro;
      urlGetDocuments =
        ApiUrl +
        `/documentos-electronicos-filtro-paginado/${filtro.page}/${filtro.size}`;
      if (tipoDocumento != "" && tipoDocumento !== undefined) {
        urlGetDocuments =
          urlGetDocuments + `?tipoDocumento=` + `${filtro.tipoDocumento}`;
      }
      if (empresaRuc !== "" && empresaRuc !== undefined) {
        urlGetDocuments =
          urlGetDocuments + `&empresaRuc=` + `${filtro.empresaRuc}`;
      }
      if (empresaId !== "" && empresaId !== undefined && empresaRuc === "999") {
        urlGetDocuments =
          urlGetDocuments + `&empresaId=` + `${filtro.empresaId}`;
      }
      if (startFecha !== "" && startFecha !== undefined) {
        urlGetDocuments =
          urlGetDocuments + `&startFecha=` + `${filtro.startFecha}`;
      }
      if (endFecha !== "" && endFecha !== undefined) {
        urlGetDocuments = urlGetDocuments + `&endFecha=` + `${filtro.endFecha}`;
      }

      try {
        const response = await axios.get(urlGetDocuments, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { status } = response;

        if (status === 200 && response.data) {
          return response.data;
        } 
      } catch (error) {
        console.log(error)
      }
    } else {
      if (cookies.get("refreshToken")) {

        await generarTokenConRefreshToken(cookies.get("refreshToken"));

        dispatch(cargarPaginaFiltrada(filtro));
      } else {
        //cierra sesion
        dispatch(onLogout())
        window.location.href=redirectLoginUrl
        //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
      }
    }
  }
);

export const electronicoSlice = createSlice({
  name: "electronico",
  initialState: {
    pageNumber: null,
    pageSize: null,
    electronicos: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
    totalPaginas: 1,
  },
  reducers: {
    clearStateElectronicos: (state) => {
      (state.isSuccess = false),
        (state.isError = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.electronicos = []),
        (state.pageNumber = null),
        (state.pageSize = null);
    },
  },
  extraReducers: {
    [cargarPagina.fulfilled]: (state, { payload }) => {
      state.pageNumber = 0;
      state.pageSize = 50;
      state.electronicos = payload.content;
      (state.isSuccess = true),
        (state.isLoading = false),
        (state.isError = false),
        (totalPaginas = payload.data.totalPages);
    },
    [cargarPagina.pending]: (state) => {
      state.isLoading = true;
    },
    [cargarPagina.rejected]: (state, { payload }) => {
      (state.isSuccess = false),
        (state.isLoading = false),
        (state.isError = true),
        (state.message = payload);
    },
    [cargarPaginaEmpresaSeleccionada.fulfilled]: (state, { payload }) => {
      state.pageNumber = 0;
      state.pageSize = 50;
      state.electronicos = payload.content;
      (state.isSuccess = true),
        (state.isLoading = false),
        (state.isError = false);
    },
    [cargarPaginaEmpresaSeleccionada.pending]: (state) => {
      state.isLoading = true;
    },
    [cargarPaginaEmpresaSeleccionada.rejected]: (state, { payload }) => {
      (state.isSuccess = false),
        (state.isLoading = false),
        (state.isError = true),
        (state.message = payload);
    },
    [cargarPaginaFiltrada.fulfilled]: (state, { payload }) => {
      state.pageNumber = 0;
      state.pageSize = 50;
      state.electronicos = payload.content;
      (state.isSuccess = true),
        (state.isLoading = false),
        (state.isError = false),
        (state.totalPaginas = payload.totalPages);
    },
    [cargarPaginaFiltrada.pending]: (state) => {
      state.isLoading = true;
    },
    [cargarPaginaFiltrada.rejected]: (state, { payload }) => {
      (state.isSuccess = false),
        (state.isLoading = false),
        (state.isError = true),
        (state.message = payload);
    },
  },
});
export const { clearStateElectronicos } = electronicoSlice.actions;
