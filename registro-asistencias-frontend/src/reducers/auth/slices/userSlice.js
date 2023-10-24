// import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// export const cargarEmpresa=createAsyncThunk(
//     'empresa/add',
//     async(page,thunkApi)=>{
//         try {
//             const token=cookie.get('token');
//             const {data, status}=await axios.get(+`/documentos-electronicos/${page}/${20}`,{headers: {"Authorization" : `Bearer ${token}`}});
//             console.log(data.content);
//             if(status ===200){
//                 return (data.content)
//             }else{
//                 return thunkApi.rejectWithValue(data);
//             }
//         } catch (error) {
//             thunkApi.rejectWithValue(error.data);
//         }
//     }
// )
// export const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         counter: 10
//     },
//     reducers: {
//         clearState: (state, /* action */ ) => {
            
//         },
//     }
// });
// export const { increment } = userSlice.actions;