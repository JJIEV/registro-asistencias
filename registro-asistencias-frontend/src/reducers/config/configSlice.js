import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ApiUrl } from '../../store/baseUrl.js';
import { cargarEmpresaById } from '../users/empresaSlice.js';
import { aplicarConfiguracionEmpresa, cargarConfiguracionesEmpresa } from './configsEmpresa.js';

const cookies = new Cookies();
export const cargarConfiguracion = createAsyncThunk(
    'configuraciones/add',
    async (id, thunkApi) => {
        try {
            const response = await axios.get(ApiUrl + `/configuracion`);
            const { data, status } = response;
            if (status === 200) {
                return (data)
            } else {
                return thunkApi.rejectWithValue(data);
            }
        } catch (error) {
            thunkApi.rejectWithValue(error.data);
        }

    }
)
export const cargarNuevoParametro = createAsyncThunk(
    'configuraciones/nuevoParametro',
    async (obj, { dispatch }) => {
        // const empresaSeleccionada=useSelector((state)=> {return state.empresa.empresa})
        try {

            const formData = new FormData();
            formData.append("logo", obj.logo);
            formData.append("imagen", obj.imagen);
            formData.append("color1", obj.color1);
            formData.append("color2", obj.color2);
            formData.append("idEmpresa", obj.idEmpresa);
            formData.append("defecto", obj.defecto);
            return await axios({
                method: "post",
                url: ApiUrl + "/configuracion/crear-parametro",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(res => {
                dispatch(aplicarConfiguracionEmpresa(cookies.get('empresaId')))
                dispatch(cargarConfiguracionesEmpresa(cookies.get('empresaId')))
                dispatch(cargarEmpresaById(cookies.get('empresaId')))
                // dispatch(cargarConfiguracionEmpresa(cookies.get('configuracionId')))
                // dispatch(onSelectConfig(obj))
                dispatch(cargarConfiguracion(999))
            })

        } catch (error) {
            thunkApi.rejectWithValue(error.data);
        }

    }
)
export const editarConfiguracionEmpresa=createAsyncThunk(
    'configuraciones/empresa/editar',
    async (data)=>{
        const { idEmpresa, defecto, logo, imagen, color1, color2 } = data;
        try {
            let url = ApiUrl + `/configuracion/editar-parametro`;
            if (idEmpresa != "" && idEmpresa !== undefined) {
                url = url + `?idEmpresa=` + `${idEmpresa}`;
            }
            if (defecto != "" && defecto !== undefined) {
                url = url + `&defecto=` + `${defecto}`;
            }else{
                url = url + `&defecto=` + `${false}`;
            }
            
            const formData = new FormData();

            if(logo != "" && logo !== undefined) {
                formData.append("logo", logo);
            }
            if(imagen != "" && imagen !== undefined) {
                formData.append("imagen", imagen);
            }
            if(color1 != "" && color1 !== undefined && color1 != "#ffffff") {
                formData.append("color1", color1);
            }
            if(color2 != "" && color2 !== undefined) {
                formData.append("color2", color2);
            }
      
            const config = {
              headers: {
                'content-type': 'multipart/form-data',
              },
            };

            const response = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' }});

            
          } catch (error) {
            console.error('Error al actualizar los datos:', error);
          }
      
    }
)
export const configSlice = createSlice({
    name: 'configuraciones',
    initialState: {
        settings: [],
        isSuccess: false,
        isLoading: false,
        isError: false,
        message: ''
    },
    reducers: {
        clearState: (state) => {
            state.isSuccess = false,
                state.isError = false,
                state.isLoading = false,
                state.message = '',
                state.settings = []
        },
    },
    extraReducers: {
        [cargarConfiguracion.fulfilled]: (state, { payload }) => {
            state.settings = payload,
                state.isSuccess = true,
                state.isLoading = false,
                state.isError = false
        },
        [cargarConfiguracion.pending]: (state) => {
            state.isLoading = true
        },
        [cargarConfiguracion.rejected]: (state, { payload }) => {
            state.isSuccess = false,
                state.isLoading = false,
                state.isError = true,
                state.message = payload
        }
    }
});
export const { clearState } = configSlice.actions;