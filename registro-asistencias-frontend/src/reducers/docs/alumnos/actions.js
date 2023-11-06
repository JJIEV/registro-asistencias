import { setAlumnos, clearStateAlumnos, setTotalPaginasAlumnos } from ".";
import Cookies from "universal-cookie";
import { generarTokenConRefreshToken } from "../../auth/helpers/keycloakFunctions.js";
import { onLogout } from "../../auth/slices/authSlice";
import { ApiUrl, redirectLoginUrl } from "../../../store/baseUrl.js";
import axios from 'axios';

const cookies = new Cookies();

export const cargarAlumnos = (filtro) => async (dispatch) => {
      if (cookies.get("token")) {
        //si tiene valor el token y el header, osea que si no expiró
  
        let token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments = ApiUrl + `/alumnos`;
  
        try {
          // dispatch(isLoading(true))
          const response = await axios.get(urlGetDocuments, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // dispatch(setIsLoading(false))
          const { status } = response;
  
          if (status === 200 && response.data) {

            dispatch(setAlumnos(response.data));
          }
        } catch (error) {
          console.log(error);
          // dispatch(setError(error.message))
        }
      } else {
        if (cookies.get("refreshToken")) {
  
          await generarTokenConRefreshToken(cookies.get("refreshToken"));
  
          dispatch(cargarAlumnos(filtro));
        } else {
          dispatch(onLogout());
          window.location.href = redirectLoginUrl;
          //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
        }
      }
    };

    export const cargarAlumnosPorAula = (aulaId) => async (dispatch) => {
      if (cookies.get("token")) {
        //si tiene valor el token y el header, osea que si no expiró
  
        let token = cookies.get("token");
        let urlGetDocuments = "";
        urlGetDocuments = ApiUrl + `/traer-alumnos-por-aula`;

        if (aulaId !== null && aulaId !== undefined && aulaId !== '') {
          urlGetDocuments = `${urlGetDocuments}?aulaId=${aulaId}`;
        }
        
       
  
        try {
          // dispatch(isLoading(true))
          const response = await axios.get(urlGetDocuments, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // dispatch(setIsLoading(false))
          const { status } = response;
  
          if (status === 200 && response.data) {

            dispatch(setAlumnos(response.data));
          }
        } catch (error) {
          console.log(error);
          // dispatch(setError(error.message))
        }
      } else {
        if (cookies.get("refreshToken")) {
  
          await generarTokenConRefreshToken(cookies.get("refreshToken"));
  
          dispatch(cargarAlumnosPorAula(aulaId));
        } else {
          dispatch(onLogout());
          window.location.href = redirectLoginUrl;
          //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
        }
      }
    };
    export const cargarPaginaFiltradaListaAlumnos =
  (filtro) => async (dispatch) => {
    if (cookies.get("token")) {
      //si tiene valor el token y el header, osea que si no expiró

      let token = cookies.get("token");
      let urlGetDocuments = "";
      urlGetDocuments = ApiUrl + `/traer-alumnos`;
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
          dispatch(setAlumnos(response.data.content));
          dispatch(setTotalPaginasAlumnos(response.data.totalPages));
        }
      } catch (error) {
        console.log(error);
        // dispatch(setError(error.message))
      }
    } else {
      if (cookies.get("refreshToken")) {
        await generarTokenConRefreshToken(cookies.get("refreshToken"));

        dispatch(cargarPaginaFiltradaListaAlumnos(filtro));
      } else {
        dispatch(onLogout());
        window.location.href = redirectLoginUrl;
        //no hace falta remover los tokens de la cookie, con expires ya elimina pasado el tiempo
      }
    }
  };

  export const modificarAlumno = (nuevosDatosAlumno) => async (dispatch) => {
      const token = cookies.get('token');
      const alumnoId = nuevosDatosAlumno.id; 
        console.log(nuevosDatosAlumno);
      try {
        const { data, status } = await axios.put(
          ApiUrl + `/alumno-editar?alumnoId=${alumnoId}`,
          nuevosDatosAlumno,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (status === 200) {
          return data;
        } else {
          return thunkApi.rejectWithValue(data);
        }
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
      }
    }
export const agregarAlumno = (filtro) => async (dispatch) => {
  if (cookies.get("token")) {
    //si tiene valor el token y el header, osea que si no expiró

    const { nombre, apellido, tipo_documento, documento, aula } = filtro;
      const alumno = {
        nombre,
        apellido,
        tipo_documento,
        documento,
        aula
      };

    let token = cookies.get("token");
    let urlGetDocuments = "";
    urlGetDocuments = ApiUrl + `/agregar-alumno`;

    try {
      const response = await fetch(urlGetDocuments, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(alumno),
      });

      const { status } = response;

      if (status === 200 && response.data) {
        return response.data;
      }else{
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    if (cookies.get("refreshToken")) {
      await generarTokenConRefreshToken(cookies.get("refreshToken"));

      dispatch(agregarAlumno(filtro));
    } else {
      dispatch(onLogout());
      window.location.href = redirectLoginUrl;
    }
  }
};
