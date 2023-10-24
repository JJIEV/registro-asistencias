import {setTotalPaginas, setUsuariosPaginados } from ".";
import Cookies from "universal-cookie";
import { generarTokenConRefreshToken } from "../../auth/helpers/keycloakFunctions.js";
import { onLogout } from "../../auth/slices/authSlice";
import { ApiUrl, redirectLoginUrl } from "../../../store/baseUrl.js";
import axios from 'axios';

const cookies = new Cookies();

export const cargarPaginaFiltradaListaUsuarios = (filtro) => async (dispatch) => {
      if (cookies.get("token")) {
        //si tiene valor el token y el header, osea que si no expiró
  
        let token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments = ApiUrl + `/traer-usuario`;
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
            dispatch(setUsuariosPaginados(response.data.content));
            dispatch(setTotalPaginas(response.data.totalPages))
          }
        } catch (error) {
          console.log(error);
          // dispatch(setError(error.message))
        }
      } else {
        if (cookies.get("refreshToken")) {
  
          await generarTokenConRefreshToken(cookies.get("refreshToken"));
  
          dispatch(cargarPaginaFiltradaListaUsuarios(filtro));
        } else {
          dispatch(onLogout());
          window.location.href = redirectLoginUrl;
          //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
        }
      }
    };
    export const agregarUsuario = (filtro) => async (dispatch) => {
        if (cookies.get("token")) {
          //si tiene valor el token y el header, osea que si no expiró
    
          const { username, nombre, apellido, correo} = filtro;
    
    
          const usuario = {
            username,
            nombre,
            apellido,
            correo
          };
    
          let token = cookies.get("token");
          let urlGetDocuments = "";
          urlGetDocuments = ApiUrl + `/agregar-usuario`;
    
          
    
          try {
            const response = await fetch(urlGetDocuments, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(usuario),
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
    
            dispatch(agregarUsuario(filtro));
          } else {
            dispatch(onLogout());
            window.location.href = redirectLoginUrl;
          }
        }
      };
      export const modificarUsuarioEmpresa = (filtro) => async (dispatch) => {
        if (cookies.get("token")) {
          //si tiene valor el token y el header, osea que si no expiró
    
          const { username, empresas} = filtro;
    
    

    
          let token = cookies.get("token");
          let urlGetDocuments = "";
          urlGetDocuments = ApiUrl + `/agregar-empresas-usuario?username=${username}`;
    
          
    
          try {
            const response = await fetch(urlGetDocuments, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(empresas),
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
      export const actualizarUsuario = (filtro, userId) => async (dispatch) => {
  const token = cookies.get('token');

  if (token) {
    const { username, nombre, apellido, correo } = filtro;

    const usuarioActualizado = {
      username,
      nombre,
      apellido,
      correo,
    };

    const url = `${ApiUrl}/actualizar-usuario/${userId}`; // Asegúrate de cambiar esta URL a la que realmente corresponda

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(url, usuarioActualizado, config);

      if (response.status === 200 && response.data) {
        return response.data;
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  } else {
    const refreshToken = cookies.get('refreshToken');
    if (refreshToken) {
      await generarTokenConRefreshToken(refreshToken);
      dispatch(actualizarUsuario(filtro, userId));
    } else {
      dispatch(onLogout());
      window.location.href = redirectLoginUrl;
    }
  }
};
    