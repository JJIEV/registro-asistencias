import { setEmpresasPaginadas, setTotalPaginasEmpresas } from ".";
import Cookies from "universal-cookie";
import { generarTokenConRefreshToken } from "../../auth/helpers/keycloakFunctions.js";
import { onLogout } from "../../auth/slices/authSlice";
import { ApiUrl, redirectLoginUrl } from "../../../store/baseUrl.js";
import axios from 'axios';

const cookies = new Cookies();

export const cargarPaginaFiltradaListaEmpresas = (filtro) => async (dispatch) => {
      if (cookies.get("token")) {
        //si tiene valor el token y el header, osea que si no expiró
  
        let token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments = ApiUrl + `/traer-empresa`;
        urlGetDocuments = urlGetDocuments + `?pageNumber=` + `${filtro.page}`;
        urlGetDocuments = urlGetDocuments + `&pageSize=` + `${filtro.size}`;
  
        try {
          // dispatch(isLoading(true))
          const response = await axios.get(urlGetDocuments, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // dispatch(setIsLoading(false))
          const { status } = response;
  
          if (status === 200 && response.data) {
            dispatch(setEmpresasPaginadas(response.data.content));
            dispatch(setTotalPaginasEmpresas(response.data.totalPages))
          }
        } catch (error) {
          console.log(error);
          // dispatch(setError(error.message))
        }
      } else {
        if (cookies.get("refreshToken")) {
  
          await generarTokenConRefreshToken(cookies.get("refreshToken"));
  
          dispatch(cargarPaginaFiltradaListaEmpresas(filtro));
        } else {
          dispatch(onLogout());
          window.location.href = redirectLoginUrl;
          //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
        }
      }
    };