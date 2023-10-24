import { createSlice } from '@reduxjs/toolkit';
const initialState={
    username:null,
    logged:false,
    roles:[]
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onLogout: (state) => {
            state.username=null;
            state.logged=false;
            state.roles=[]
        },
        onLogin:(state,{payload})=>{
            state.username=payload.username;
            state.logged=true;
            state.roles=payload.roles
        }
    }

});
export const { onLogin,onLogout } = authSlice.actions;
