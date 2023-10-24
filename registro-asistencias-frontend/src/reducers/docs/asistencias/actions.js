import { setAsistencias, setTotalPaginasAsistencias } from ".";
import Cookies from "universal-cookie";
import { generarTokenConRefreshToken } from "../../auth/helpers/keycloakFunctions.js";
import { onLogout } from "../../auth/slices/authSlice";
import { ApiUrl, redirectLoginUrl } from "../../../store/baseUrl.js";
import axios from 'axios';

const cookies = new Cookies();

export const cargarAsistenciasPorCurso = (filtro) => async (dispatch) => {
      if (cookies.get("token")) {
  

        const { aulaId, especialidadId, pageNumber, pageSize } = filtro;

        let token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments = ApiUrl + `/asistencias-por-curso`;

        urlGetDocuments = urlGetDocuments + `?pageNumber=` + `${pageNumber}`;
        urlGetDocuments = urlGetDocuments + `&pageSize=` + `${pageSize}`;

        urlGetDocuments = urlGetDocuments + `&aulaId=` + `${aulaId}`;
        urlGetDocuments = urlGetDocuments + `&especialidadId=` + `${especialidadId}`;
  
        try {
          // dispatch(isLoading(true))
          const response = await axios.get(urlGetDocuments, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // dispatch(setIsLoading(false))
          const { status } = response;
  
          if (status === 200 && response.data) {
            console.log("Alumnos: ", response.data)
            dispatch(setAsistencias(response.data.content));
            dispatch(setTotalPaginasAsistencias(response.data.totalPages))
          }
        } catch (error) {
          console.log(error);
          // dispatch(setError(error.message))
        }
      } else {
        if (cookies.get("refreshToken")) {
  
          await generarTokenConRefreshToken(cookies.get("refreshToken"));
  
          dispatch(cargarAsistenciasPorCurso(filtro));
        } else {
          dispatch(onLogout());
          window.location.href = redirectLoginUrl;
          //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
        }
      }
    };