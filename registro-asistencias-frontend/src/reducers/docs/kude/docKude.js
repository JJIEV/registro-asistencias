import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { ApiUrl } from '../../../store/baseUrl.js';

const cookie=new Cookies();
export const existKuDE=createAsyncThunk(
    'KuDE/add',
    async(id,thunkApi)=>{
        try {
            const token=cookie.get('token');
            const {status}=await axios.get(ApiUrl+`/documento-electronico/${id}/PDF`,{
                headers: {"Authorization" : `Bearer ${token}`},
                responseType: 'blob'});
            console.log(data);
            if(status ===200){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            thunkApi.rejectWithValue(error.data);
        }
    }
)
export const KuDESlice = createSlice({
    name: 'KuDE',
    initialState: {
        kude:false,
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
            state.kude=false
            // state.pageSize=10      
        },
    },
    extraReducers:{
        [existKuDE.fulfilled]:(state,{payload})=>{
            state.kude=payload,
            state.isSuccess=true,
            state.isLoading=false,
            state.isError=false
        },
        [existKuDE.pending]:(state)=>{
            state.isLoading=true
        },
        [existKuDE.rejected]:(state,{payload})=>{
            state.isSuccess=false,
            state.isLoading=false,
            state.isError=true,
            state.message=payload
        }        
    }
});
export const { clearState } = KuDESlice.actions;