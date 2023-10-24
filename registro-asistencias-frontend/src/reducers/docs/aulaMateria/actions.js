import { setAulaMateriaList, clearStateAulaMateriaList } from ".";
import Cookies from "universal-cookie";
import { generarTokenConRefreshToken } from "../../auth/helpers/keycloakFunctions.js";
import { onLogout } from "../../auth/slices/authSlice";
import { ApiUrl, redirectLoginUrl } from "../../../store/baseUrl.js";
import axios from 'axios';

const cookies = new Cookies();

export const cargarAulaMateriaList = (filtro) => async (dispatch) => {
      if (cookies.get("token")) {
        //si tiene valor el token y el header, osea que si no expiró
  
        let token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments = ApiUrl + `/aula-materia`;
  
        try {
          // dispatch(isLoading(true))
          const response = await axios.get(urlGetDocuments, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // dispatch(setIsLoading(false))
          const { status } = response;
  
          if (status === 200 && response.data) {

            dispatch(setAulaMateriaList(response.data));
          }
        } catch (error) {
          console.log(error);
          // dispatch(setError(error.message))
        }
      } else {
        if (cookies.get("refreshToken")) {
  
          await generarTokenConRefreshToken(cookies.get("refreshToken"));
  
          dispatch(cargarAulaMateriaList(filtro));
        } else {
          dispatch(onLogout());
          window.location.href = redirectLoginUrl;
          //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
        }
      }
    };
    export const agregarRegistroAsistencia = (filtro) => async (dispatch) => {
      if (cookies.get("token")) {
        //si tiene valor el token y el header, osea que si no expiró
    
        const { aulaMateria, alumno, fecha, asistencia, presenteTodos} = filtro;

        const objetoConjunto = { aulaMateria, alumno, fecha, asistencia };
    
        let token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments = ApiUrl + `/agregar-registro-asistencia?presenteTodos=${presenteTodos}`;


    
        try {
          const response = await fetch(urlGetDocuments, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(objetoConjunto),
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
    
          dispatch(modificarUsuarioEmpresa(filtro));
        } else {
          dispatch(onLogout());
          window.location.href = redirectLoginUrl;
        }
      }
    };