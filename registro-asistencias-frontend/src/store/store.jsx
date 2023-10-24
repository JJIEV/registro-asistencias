import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {authSlice} from '../reducers/auth/slices/authSlice.js'
import { configSlice } from '../reducers/config/configSlice.js'
import { configSelectedSlice } from '../reducers/config/configSelected.js'
import { electronicoSlice } from '../reducers/docs/electronicos/electronicoSlice.js'
import { firmaSlice } from '../reducers/docs/electronicos/firmaSlice.js'
import { representacionSlice } from '../reducers/docs/electronicos/representacionSlice.js'
import { KuDESlice } from '../reducers/docs/kude/docKude.js'
import { docXmlSlice } from '../reducers/docs/xml/docXML.js'
import { empresasSlice } from '../reducers/users/cargarDatos.js'
import { empresaSlice } from '../reducers/users/empresaSlice.js'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore'
import { configsEmpresaSlice } from '../reducers/config/configsEmpresa.js'
import {captchaSlice} from '../reducers/config/captchaKeyFunction.js'
import empresas from '../reducers/docs/empresas'
import usuarios from '../reducers/docs/usuarios'
import alumnos from '../reducers/docs/alumnos'
import aulaMateria from '../reducers/docs/aulaMateria'
import asistencias from '../reducers/docs/asistencias'
import aulas from '../reducers/docs/aulas'
import especialidades from '../reducers/docs/especialidades'
import justificacion from '../reducers/docs/justificacion'


const persistConfig = {
    key: 'root',
    storage,
    whitelist:[ 'empresa', 'configuracion','auth', 'configuracionesEmpresa']
  }
  const userPersistConfig = {
    key: 'usuario',
    storage,
    whitelist: ['empresas']
  }
  const electronicoPersistConfig = {
    key: 'electronico',
    storage,
    whitelist: ['electronicos']
  }

  const rootReducer = combineReducers({
    auth: authSlice.reducer,
    electronico: persistReducer(electronicoPersistConfig, electronicoSlice.reducer),
    electronicoXml: docXmlSlice.reducer,
    firmaXml: firmaSlice.reducer,
    kude: KuDESlice.reducer,
    usuario: persistReducer(userPersistConfig, empresasSlice.reducer),
    configuraciones: configSlice.reducer,
    configuracion: configSelectedSlice.reducer,
    empresa: empresaSlice.reducer,
    verFactura: representacionSlice.reducer,
    configuracionesEmpresa: configsEmpresaSlice.reducer,
    captcha: captchaSlice.reducer, 
    representacion: representacionSlice.reducer,
    empresasPaginadas: empresas,
    usuariosPaginados: usuarios, 
    alumnos: alumnos,
    aulaMateriaList: aulaMateria,
    asistencias: asistencias,
    aulas: aulas,
    especialidades: especialidades,
    justificacion: justificacion
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'electronico/add/fulfilled',
            'persist/PERSIST',
            'electronico/select/fulfilled',
            'configuraciones/nuevoParametro/pending',
            'configuraciones/nuevoParametro/fulfilled',
          ],
          ignoredActionPaths: ['payload.config.adapter', 'payload.config.transformRequest.0'],
        },
      }),
  });
  
export const persistor=persistStore(store);
