import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ApiUrl } from '../../store/baseUrl.js';
import { cargarConfiguracionEmpresa } from '../config/configSelected.js';
import { cargarConfiguracionesEmpresa } from '../config/configsEmpresa.js';
import { onSelectEmpresa } from './empresaSlice.js';
import { onLogin } from "../../reducers/auth/slices/authSlice";
const cookies=new Cookies();
export const cargarEmpresas=createAsyncThunk(
    'empresas/add',
    async(nombre,thunkApi)=>{
        try {
            const token=cookies.get('token');
            const {data, status}=await axios.get(ApiUrl+`/usuario-username/${nombre}`,{headers: {"Authorization" : `Bearer ${token}`}});
            cookies.set('empresaId', data[0].empresas[0].id, { path: '/' })
            cookies.set('empresaRuc', data[0].empresas[0].ruc, { path: '/' })
            if(status ===200){
                return (data[0].empresas)
            }else{
                return thunkApi.rejectWithValue(data);
            }
        } catch (error) {
            thunkApi.rejectWithValue(error.data);
        }
    }
)

export const agregarEmpresa = createAsyncThunk(
    "empresa/agregada",
    async (filtro, { dispatch }) => {
      if (cookies.get("token")) {
        //si tiene valor el token y el header, osea que si no expiró
  
        const { nombre, ruc} = filtro;
  
  
        const empresa = {
          nombre,
          ruc
        };
  
        let token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments = ApiUrl + `/agregar-empresa`;
  
        
  
        try {
          const response = await fetch(urlGetDocuments, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(empresa),
            });
  
          const { status } = response;
  
          if (status === 200 && response.data) {
            return response.data;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        if (cookies.get("refreshToken")) {
  
          await generarTokenConRefreshToken(cookies.get("refreshToken"));
  
          dispatch(agregarEmpresa(filtro));
        } else {
          dispatch(onLogout());
          window.location.href = redirectLoginUrl;
        }
      }
    }
  );

  export const cargarPaginaFiltradaEmpresa = createAsyncThunk(
    "empresa/paginada",
    async (filtro, { dispatch }) => {
      if (cookies.get("token")) {
        //si tiene valor el token y el header, osea que si no expiró
  
        let token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments = ApiUrl + `/traer-empresa`;
        urlGetDocuments = urlGetDocuments + `?pageNumber=` + `${filtro.page}`;
  
        urlGetDocuments = urlGetDocuments + `&pageSize=` + `${filtro.size}`;
  
        try {
          const response = await axios.get(urlGetDocuments, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { status } = response;
  
          if (status === 200 && response.data) {
            return response.data;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        if (cookies.get("refreshToken")) {

          await generarTokenConRefreshToken(cookies.get("refreshToken"));
  
          dispatch(cargarPaginaFiltrada(filtro));
        } else {
          //cierra sesion
          dispatch(onLogout());
          window.location.href = redirectLoginUrl;
          //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
        }
      }
    }
  );

export const cargarEmpresasAndPagina=createAsyncThunk(
    'empresas/pagina',
    async(username,{dispatch})=>{
        try {

            const token=cookies.get('token');
            const {data, status}=await axios.get(ApiUrl+`/usuario-username/${username}`,{headers: {"Authorization" : `Bearer ${token}`}});
            // await dispatch(cargarEmpresas(nombre))
            cookies.set('empresaId', data.empresas[0].id)
            cookies.set('empresaRuc', data.empresas[0].ruc)
            // await dispatch(cargarConfiguracionEmpresa(data[0].empresas[0].configuracion.id))
            // await dispatch(cargarConfiguracionesEmpresa(data[0].empresas[0].id))
            dispatch(onSelectEmpresa(data.empresas[0]))
            // cookies.set('empresaId', data.empresas[0].id)
            // cookies.set('empresaRuc', data.empresas[0].ruc)
            if(status ===200){
                console.log("Data: ", data.empresas[0])
                return (data.empresas)
            }else{
                return thunkApi.rejectWithValue(data);
            }
        } catch (error) {
            thunkApi.rejectWithValue(error.data);
        }
    }
)
export const empresasSlice = createSlice({
    name: 'empresas',
    initialState: {
        pageNumber: null,
        pageSize: null,
        empresas:[],
        listaEmpresasTotal: [],
        isSuccess:false,
        isLoading:false,
        isError:false,
        message:'',
        totalPaginas: 1,         
    },    
    reducers: {
        clearStateEmpresa:(state)=>{
          (state.isSuccess = false),
          (state.isError = false),
          (state.isLoading = false),
          (state.message = ""),
          (state.empresas = []),
          (state.pageNumber = null),
          (state.pageSize = null);
        },
    },
    extraReducers:{
        [cargarEmpresas.fulfilled]:(state,{payload})=>{
            state.empresas=payload
            state.isSuccess=true,
            state.isLoading=false,
            state.isError=false
        },
        [cargarEmpresas.pending]:(state)=>{
            state.isLoading=true
        },
        [cargarEmpresas.rejected]:(state,{payload})=>{
            state.isSuccess=false,
            state.isLoading=false,
            state.isError=true,
            state.message=payload
        },[cargarEmpresasAndPagina.fulfilled]:(state,{payload})=>{
          state.empresas=payload
          state.isSuccess=true,
          state.isLoading=false,
          state.isError=false
      },
      [cargarEmpresasAndPagina.pending]:(state)=>{
          state.isLoading=true
      },
      [cargarEmpresasAndPagina.rejected]:(state,{payload})=>{
          state.isSuccess=false,
          state.isLoading=false,
          state.isError=true,
          state.message=payload
      },

    }
});
export const { clearStateEmpresa } = empresasSlice.actions;

