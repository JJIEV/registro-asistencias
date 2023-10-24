import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ApiUrl } from '../../../store/baseUrl.js';
const cookie=new Cookies();
export const cargarFirma=createAsyncThunk(
    'firma/add',
    async(id,thunkApi)=>{
        try {
            const token=cookie.get('token');
            const {data, status}=await axios.get(ApiUrl+`/documento-electronico/${id}/FIRMADO`,{headers: {"Authorization" : `Bearer ${token}`}});
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
export const firmaSlice = createSlice({
    name: 'firma',
    initialState: {
        firma:[],
        isSuccess:false,
        isLoading:false,
        isError:false,
        message:''        
    },
    reducers: {
        clearState:(state)=>{
            state.isSuccess=false,
            state.isError=false,
            state.isLoading=false,
            state.message='',
            state.firma=[]
            // state.pageSize=10      
        },
    },
    extraReducers:{
        [cargarFirma.fulfilled]:(state,{payload})=>{
            // state.pageNumber=payload.page,
            // state.pageSize=payload.pageSize
            state.firma=payload
            state.isSuccess=true,
            state.isLoading=false,
            state.isError=false
        },
        [cargarFirma.pending]:(state)=>{
            state.isLoading=true
        },
        [cargarFirma.rejected]:(state,{payload})=>{
            state.isSuccess=false,
            state.isLoading=false,
            state.isError=true,
            state.message=payload
        }    
    }
});
export const { clearState } = firmaSlice.actions;