import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ApiUrl } from '../../store/baseUrl.js';
const cookies=new Cookies();
export const cargarEmpresaById=createAsyncThunk(
    'cargando/empresa/byId',
    async(id,thunkApi)=>{
     const token = cookies.get('token');
    
     const {data,status}=await axios.get(ApiUrl+`/empresa/idEmpresa/${id}`);
     if(status ===200){
         cookies.set('configuracionId', data.configuracion.id, { path: '/' })
         return data;
     }else{
         return thunkApi.rejectWithValue(data);
     }
    } 
 )

export const empresaSlice = createSlice({
    name: 'empresa',
    initialState: {
        empresa: {},
        isSuccess:false,
        isLoading:false,
        isError:false,
        message:''
    },
    reducers:{
        onSelectEmpresa:(state,{payload})=>{
            state.empresa=payload
        }
    },
    extraReducers:{
        [cargarEmpresaById.fulfilled]:(state,{payload})=>{
            state.empresa=payload,
            state.isSuccess=true,
            state.isLoading=false,
            state.isError=false
        },
        [cargarEmpresaById.pending]:(state)=>{
            state.pending=true
        },
        [cargarEmpresaById.rejected]:(state,{payload})=>{
            state.isSuccess=false,
            state.isLoading=false,
            state.isError=true,
            state.message=payload
        }
    }
});
export const {onSelectEmpresa}=empresaSlice.actions