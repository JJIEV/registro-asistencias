import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiUrl } from '../../store/baseUrl.js';
export const cargarConfiguracionesEmpresa=createAsyncThunk(
    'configuraciones/empresa/cargar',
    async (id,thunkApi)=>{
        try {
            const response=await axios.get(ApiUrl+`/configuracion/empresaId/${id}`);
            const {data,status}=response;
            if(status ===200){
                return (data)
            }else{
                return thunkApi.rejectWithValue(data);
            }             
        } catch (error) {
            thunkApi.rejectWithValue(error.data);
        }
      
    }
)

export const aplicarConfiguracionEmpresa=createAsyncThunk(
    'configuraciones/empresa/aplicar',
    async (idEmpresa,thunkApi)=>{
        try {
            const response=await axios.put(ApiUrl+`/configuracion/${idEmpresa}`);
            const {data,status}=response;
            if(status !==200){
                return thunkApi.rejectWithValue(status);
            }             
        } catch (error) {
            thunkApi.rejectWithValue(error.data);
        }
      
    }
)
export const configsEmpresaSlice = createSlice({
    name: 'configsEmpresa',
    initialState: {
        configuraciones:[],
        isSuccess:false,
        isError:false,
        isLoading:false,
        message:''
    },
    reducers: {
        clearStateConfigsEmpresa: (state ) => {
            configuraciones=[],
            isSuccess=false,
            isError=false,
            isLoading=false,
            message=''
        },
    },
    extraReducers:{
        [cargarConfiguracionesEmpresa.fulfilled]:(state,{payload})=>{
            state.configuraciones=[payload],
            state.isSuccess=true,
            state.isLoading=false,
            state.isError=false
        },
        [cargarConfiguracionesEmpresa.pending]:(state)=>{
            state.isLoading=true
        },
        [cargarConfiguracionesEmpresa.rejected]:(state,{payload})=>{
            state.isSuccess=false,
            state.isLoading=false,
            state.isError=true,
            state.message=payload
        }  
    }
});
export const { clearStateConfigsEmpresa } = configsEmpresaSlice.actions;