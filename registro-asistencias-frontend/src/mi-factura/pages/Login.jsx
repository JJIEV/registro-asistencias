import { generateToken } from "../../reducers/auth/helpers/authFunctions.js";
import{aDias, generarToken} from "../../reducers/auth/helpers/keycloakFunctions.js"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { cargarConfiguracionSeleccionada, cargarConfiguracionConsulta } from "../../reducers/config/configSelected.js";
import { parseJwt } from '../../reducers/auth/helpers/authFunctions'
import { onLogin } from "../../reducers/auth/slices/authSlice";
import { cargarEmpresasAndPagina } from "../../reducers/users/cargarDatos";
import imagenDefault from '../prod/img/WhatsApp Image 2023-10-18 at 3.20.18 PM.jpeg';
import logoDefault from "../prod/img/logo-colegio.png";


export const Login = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cookies = new Cookies();





  useEffect(() => {

  }, [])


  const initialUser = {
    username: "",
    password: ""
  }

  const [user, setUser] = useState(initialUser)

  const { username, password } = user;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value
    });
  }
  

  const onSubmit = async (event) => {
    event.preventDefault();
    const token = await generarToken(user.username, user.password);
    let aux = parseJwt(token.accessToken);
    let roles=aux.realm_access.roles
    cookies.set('roles', aux.realm_access.roles)
    cookies.set('token', token.accessToken, { maxAge: token.expiresIn });
    cookies.set('refreshToken', token.refreshToken, { maxAge: token.refreshExpiresIn } );
    if (!token.accessToken) {
      console.log('Credenciales no validas');
      navigate("/");
    } else {
      console.log("Token valido else")
      
      dispatch(onLogin({username:username, roles: roles}))

      navigate('/home');
      
    }
  }

  return (
    <>
      <div className="loginPage" style={{backgroundColor: "#ffffff"}}>
        <div className="content-left">
          <img src={imagenDefault} className="img-fluid" alt=""></img>
        </div>

        <div className="content-right">

          <div className="content-right__form">
            <form onSubmit={onSubmit} className="loginForm">
              <img src={logoDefault} className="img-fluid img-brand" alt=""></img>
                <h1> Iniciar Sesión </h1>
                <div className="form-group md-input">
                  <input className="form-control md-form-control"  required={true} type="text" placeholder=" " name="username" onChange={onInputChange}></input>
                    <label className="md-label" > Usuario <span>*</span></label>
                </div>
                <div className="form-group md-input">
                  <input className="form-control md-form-control"  required={true} type="password" placeholder=" " name="password" onChange={onInputChange}></input>
                    <label className="md-label">Contraseña<span>*</span></label>
                </div>
                <button type="submit" className="btn btn-lg btn-primary" > Comenzar </button>
            </form>

          </div>
          <div className="poweredby"></div>
        </div>
      </div>
    </>
  )
}
