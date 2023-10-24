import { setJustificacion, setListaJustificaciones, setTotalPaginasJustificacion } from ".";
import Cookies from "universal-cookie";
import { generarTokenConRefreshToken } from "../../auth/helpers/keycloakFunctions.js";
import { onLogout } from "../../auth/slices/authSlice";
import { ApiUrl, redirectLoginUrl } from "../../../store/baseUrl.js";
import axios from 'axios';

const cookies = new Cookies();

export const cargarJustificacion = (idAsistencia) => async (dispatch) => {
      if (cookies.get("token")) {
        //si tiene valor el token y el header, osea que si no expiró
  
        let token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments = ApiUrl + `/justificacion`;
        urlGetDocuments = urlGetDocuments + `?idAsistencia=` + idAsistencia;
  
        try {
          // dispatch(isLoading(true))
          const response = await axios.get(urlGetDocuments, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // dispatch(setIsLoading(false))
          const { status } = response;
  
          if (response.status === 200 && response.data) {
            dispatch(setJustificacion(response.data));
            console.log("Respuesta exitosa!");
            return true;
        } else {
            console.log("Respuesta no exitosa:", response.status);
            return false;
        }
        } catch (error) {
          console.log(error);
          return false;
          // dispatch(setError(error.message))
        }
      } else {
        if (cookies.get("refreshToken")) {
  
          await generarTokenConRefreshToken(cookies.get("refreshToken"));
  
          dispatch(cargarJustificacion(filtro));
        } else {
          dispatch(onLogout());
          window.location.href = redirectLoginUrl;
          //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
        }
      }
    };

    export const cargarPaginaFiltradaListaJustificacion =
  (filtro) => async (dispatch) => {
    if (cookies.get("token")) {
      //si tiene valor el token y el header, osea que si no expiró

      let token = cookies.get("token");
      let urlGetDocuments = "";
      urlGetDocuments = ApiUrl + `/traer-justificaciones`;
      urlGetDocuments = urlGetDocuments + `?pageNumber=` + `${filtro.pageNumber}`;
      urlGetDocuments = urlGetDocuments + `&pageSize=` + `${filtro.pageSize}`;

      try {
        // dispatch(isLoading(true))
        const response = await axios.get(urlGetDocuments, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // dispatch(setIsLoading(false))
        const { status } = response;

        if (status === 200 && response.data) {
          dispatch(setListaJustificaciones(response.data.content));
          dispatch(setTotalPaginasJustificacion(response.data.totalPages));
        }
      } catch (error) {
        console.log(error);
        // dispatch(setError(error.message))
      }
    } else {
      if (cookies.get("refreshToken")) {
        await generarTokenConRefreshToken(cookies.get("refreshToken"));

        dispatch(cargarPaginaFiltradaListaJustificacion(filtro));
      } else {
        dispatch(onLogout());
        window.location.href = redirectLoginUrl;
        //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
      }
    }
  };

    export const agregarJustificacion = (filtro) => async (dispatch) => {
      if (cookies.get("token")) {
        //si tiene valor el token y el header, osea que si no expiró
    
        const { descripcion, asistencia, archivo } = filtro;
    
    
        let token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments = ApiUrl + `/agregar-justificacion`;

        const formData = new FormData();
        formData.append("descripcion", descripcion);
        
        // Suponiendo que 'archivo' es un objeto File. Si no, necesitarás obtenerlo.
        if (archivo) {
          formData.append("archivo", archivo);
        }
      
        // Suponiendo que asistencia es un objeto, lo convertimos a JSON string.
        formData.append("asistencia", JSON.stringify(asistencia));
    
        try {
          const response = await fetch(urlGetDocuments, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: formData // Usamos formData como cuerpo
          });
      
          const { status } = response;
      
          if (status === 200) {
            const data = await response.json();
            return data;
          } else {
            return response;
          }
        } catch (error) {
          console.error("Error enviando justificación:", error);
          throw error;
        }
      } else {
        if (cookies.get("refreshToken")) {
          await generarTokenConRefreshToken(cookies.get("refreshToken"));
    
          dispatch(agregarUsuario(filtro));
        } else {
          dispatch(onLogout());
          window.location.href = redirectLoginUrl;
        }
      }
    };
    