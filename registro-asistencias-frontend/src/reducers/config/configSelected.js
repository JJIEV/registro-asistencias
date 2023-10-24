import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ApiUrl } from '../../store/baseUrl.js';
const cookies=new Cookies()
export const cargarConfiguracionSeleccionada=createAsyncThunk(
    'configuracion/seleccionada',
    async (id,thunkApi)=>{
        try {
            const response=await axios.get(ApiUrl+'/configuracion/1');
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
export const cargarConfiguracionConsulta=createAsyncThunk(
    'configuracion/consulta',
    async ()=>{
        try{
            const response=await axios.get(ApiUrl+'/configuracion-consulta?consultaConfig=1')
            const{data, status} = response;
            if(status === 200){
                return (data)
            }else{
                return console.log(error);
            }
        }catch (error) {
            console.log(error);
            throw error;

          }

    }
)
export const cargarConfiguracionEmpresa=createAsyncThunk(
    'configuracion/empresa/seleccionada',
    async (id,thunkApi)=>{
        try {
            const response=await axios.get(ApiUrl+`/configuracion/${id}`);
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
export const configSelectedSlice = createSlice({
    name: 'configuracion',
    initialState: {
        settingSelected:{},
        isSuccess:false,
        isError:false,
        isLoading:false,
        message:''
    },

    reducers:{
        onSelectConfig:(state,{payload})=>{
            state.settingSelected=payload
        }
    },
    extraReducers:{
        [cargarConfiguracionSeleccionada.fulfilled]:(state,{payload})=>{
            state.settingSelected=payload,
            state.isSuccess=true,
            state.isLoading=false,
            state.isError=false
        },
        [cargarConfiguracionConsulta.fulfilled]:(state,{payload})=>{
            state.settingSelected=payload,
            state.isSuccess=true,
            state.isLoading=false,
            state.isError=false
        },
        [cargarConfiguracionSeleccionada.pending]:(state)=>{
            state.isLoading=true
        },
        [cargarConfiguracionSeleccionada.rejected]:(state,{payload})=>{
            state.isSuccess=false,
            state.isLoading=false,
            state.isError=true,
            state.message=payload
        },
        [cargarConfiguracionEmpresa.fulfilled]:(state,{payload})=>{
            state.settingSelected=payload,
            state.isSuccess=true,
            state.isLoading=false,
            state.isError=false
        },
        [cargarConfiguracionEmpresa.pending]:(state)=>{
            state.isLoading=true
        },
        [cargarConfiguracionEmpresa.rejected]:(state,{payload})=>{
            state.isSuccess=false,
            state.isLoading=false,
            state.isError=true,
            state.message=payload
        }      
    }

});
export const {onSelectConfig}=configSelectedSlice.actions