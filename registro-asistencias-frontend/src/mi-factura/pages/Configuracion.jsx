import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  cargarConfiguracion,
  cargarNuevoParametro,
  editarConfiguracionEmpresa,
} from "../../reducers/config/configSlice.js";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "universal-cookie";
import { onSelectConfig } from "../../reducers/config/configSelected.js";
import { useColor } from "react-color-palette";
import { Link } from "react-router-dom";
import avatar from "../prod/img/avatar.png";
import {
  clearStateEmpresa,
} from "../../reducers/users/cargarDatos";
import {
  clearStateElectronicos,
} from "../../reducers/docs/electronicos/electronicoSlice.js";
import { onLogout } from "../../reducers/auth/slices/authSlice.js";
import {
  cargarConfiguracionEmpresa,
  cargarConfiguracionConsulta,
} from "../../reducers/config/configSelected.js";
import { onSelectEmpresa } from "../../reducers/users/empresaSlice.js";
import { cargarConfiguracionesEmpresa } from "../../reducers/config/configsEmpresa.js";
import Checkbox from "@mui/material/Checkbox";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import logoDefault from "../prod/img/logo-mifactura.png";
import perfilEmptyDefault from "../prod/img/avatar.png";

export const Configuracion = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElLogo, setAnchorElLogo] = useState(null);
  const [anchorElImagen, setAnchorElImagen] = useState(null);
  const [anchorElColor1, setAnchorElColor1] = useState(null);
  const [anchorElColor2, setAnchorElColor2] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [crearParametro, setCrearParametro] = useState(false);
  const openLogo = Boolean(anchorElLogo);
  const openImagen = Boolean(anchorElImagen);
  const openColor1 = Boolean(anchorElColor1);
  const openColor2 = Boolean(anchorElColor2);
  const settings = useSelector((state) => {
    return state.configuraciones.settings;
  });
  

  const [defecto, setDefecto] = useState(false);

  // const configuracionNueva = useSelector((state) => {
  //   return state.configuracion.settingSelected;
  // });
  const empresaSeleccionada = useSelector((state) => {
    return state.empresa.empresa;
  });
  const configuracionesEmpresa = useSelector((state) => {
    // console.log("Configuraciones: ", state.configuracionesEmpresa.configuraciones[0].consultaConfig)
    return state.configuracionesEmpresa.configuraciones;
  });

  const [configuracionNuevoParamColor1, setConfiguracionNuevoParamColor1] =
    useState(configuracionesEmpresa[0]?.color1?configuracionesEmpresa[0]?.color1 : "#ffffff");
  const [configuracionNuevoParamColor2, setconfiguracionNuevoParamColor2] =
    useState(configuracionesEmpresa[0]?.color2?configuracionesEmpresa[0]?.color2 :"#ffffff");
  const [configuracionNuevoParamLogo, setconfiguracionNuevoParamLogo] =
    useState([]);
  const [configuracionNuevoParamImagen, setconfiguracionNuevoParamImagen] =
    useState([]);
  // const [primario, setPrimario] = useColor("hex", configuracionesEmpresa[0]?.color1?configuracionesEmpresa[0]?.color1 : "#ffffff");
  // const [secundario, setSecundario] = useColor("hex", configuracionesEmpresa[0]?.color2?configuracionesEmpresa[0]?.color2 :"#ffffff");
  const empresas = useSelector((state) => {
    return state.usuario.empresas;
  });

  const [isChecked, setIsChecked] = useState(false);

  const username = useSelector((state) => {
    return state.auth.username;
  });
  // const tema = createTheme({
  //   palette: {
  //     primary: {
  //       main: `${configuracionNueva?.color1}`,
  //     },
  //   },
  // });
  

  useEffect(() => {
    dispatch(cargarConfiguracionConsulta());
    
    
    // console.log("Configuraciones true: ",configuracionesEmpresa[0].consultaConfig)
  }, []);
  // useEffect(() => {
  //   if (primario !== configuracion.color1) {
  //     setConfiguracion({
  //       ...configuracion,
  //       color1: primario.hex,
  //     });
  //   }
  // }, [primario]);
  // useEffect(() => {
  //   if (secundario !== configuracion.color1) {
  //     setConfiguracion({
  //       ...configuracion,
  //       color2: secundario.hex,
  //     });
  //   }
  // }, [secundario]);

  const volver = () => {
    navigate("/home");
  };

  const onCrearParametro = () => {
    cookies.set("empresaId", empresaSeleccionada?.id);

    dispatch(
      editarConfiguracionEmpresa({
        color1: configuracionNuevoParamColor1,
        color2: configuracionNuevoParamColor2,
        logo: configuracionNuevoParamLogo,
        imagen: configuracionNuevoParamImagen,
        idEmpresa: empresaSeleccionada?.id,
        defecto: defecto,
      })
    );

    let index = configuracionesEmpresa.length;
  };
  const onAplicar = () => {
    dispatch(
      editarConfiguracionEmpresa({
        idEmpresa: empresaSeleccionada?.id,
        defecto: defecto,
      })
    );
    // dispatch(cargarNuevoParametro({color1:configuracion.color1, color2: configuracion.color2, logo:configuracion.logo, imagen:configuracion.imagen, idEmpresa:empresaSeleccionada?.id}))
  };

  const onSwitchEmpresa = (item) => {
    // dispatch(cargarPaginaEmpresaSeleccionada(item));
    // dispatch(cargarConfiguracionEmpresa(item.configuracion.id));
    dispatch(onSelectEmpresa(item));
    dispatch(cargarConfiguracionesEmpresa(item.id));
    setSelectedLogo(item.configuracion.logo);
    dispatch(cargarConfiguracionConsulta());
    
  };
  const onCerrarSesion = () => {
    dispatch(clearStateEmpresa()), dispatch(onLogout());
    dispatch(clearStateElectronicos());
    cookies.remove("token");
    cookies.remove("roles");
    cookies.remove("empresaId");
    cookies.remove("empresaRuc");
    cookies.remove("refreshToken");
  };

  return (
    <div className="wrapperPage">
      <div className="main">
        <nav className="navbar navbar-light">
          <div className="leftside me-auto">
            <Link to={"/home"} className="brand">
              <img
                src={configuracionesEmpresa[0]?.logo?`data:image/png;base64,${configuracionesEmpresa[0]?.logo}`:logoDefault}
                className="img-fluid"
                alt="Logotipo empresa"
              ></img>
            </Link>
          </div>

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle custom-nav"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="true"
              >
                <img
                  src={configuracionesEmpresa[0]?.logo?`data:image/png;base64,${configuracionesEmpresa[0]?.logo}`:logoDefault}
                  className="img-fluid img-perfil"
                  alt="Foto de perfil"
                ></img>
                {username}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {empresas?.map((item) => {
                  return (
                    <li key={item.id}>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          onSwitchEmpresa(item);
                        }}
                        role="button"
                        href={null}
                      >
                        <img
                          src={`data:image/png;base64,${item.configuracion?.logo}`}
                          className="img-fluid img-perfil"
                          alt="Foto de perfil"
                        ></img>
                        {item.nombre}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="nav-item">
              <Link to={"/configuracion"} className="nav-link nav-settings">
                <span className="material-icons-outlined"> settings </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/"}
                className="nav-link nav-settings"
                role="button"
                onClick={onCerrarSesion}
              >
                {" "}
                <span className="material-icons-outlined"> logout </span>{" "}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="dashboardContent">
          <div className="container-fluid">
            <div className="sectionHeader">
              <h1 className="pageTitle"> Configuración </h1>

              <div className="actions">
                <Link
                  to={"/home"}
                  style={{ color: `${configuracionesEmpresa[0]?.color1}` }}
                  className="btn btn-lg btn-back"
                >
                  Volver
                </Link>
                <a
                  href={null}
                  role="button"
                  onClick={() => {
                    setCrearParametro(true);
                    setConfiguracionNuevoParamColor1(configuracionesEmpresa[0]?.color1)
                  }}
                  style={{
                    backgroundColor: `${configuracionesEmpresa[0]?.color1}`,
                  }}
                  className="btn btn-lg btn-primary"
                  data-mdb-toggle="modal"
                  data-mdb-target="#modalNuevoParametro"
                >
                  {" "}
                  Editar Parámetro{" "}
                </a>
              </div>
            </div>

            <div className="contentPage card">
              <div className="contentParametros">
                <form action="" className="form-row">
                  <div className="form-group md-input w-25">
                    {/* <select
                      className="form-control md-select"
                      onChange={({ target }) => {
                        console.log("target.value", target.value),
                          setConfiguracion({
                            ...configuracion,
                            logo: target.value,
                          });
                      }}
                    >
                      {configuracionesEmpresa?.map((item) => {
                        return (
                          <option key={item.id} value={item.logo}>
                            Logo {item.id}
                          </option>
                        );
                      })}
                    </select> */}
                    <div className="card-img">
                      <img
                        src={`data:image/png;base64,${configuracionesEmpresa[0]?.logo}`}
                        className="img-fluid"
                        alt="Logotipo empresa"
                      ></img>
                    </div>

                    <label
                      className="md-label"
                      style={{ color: `${configuracionesEmpresa[0]?.color1}` }}
                    >
                      {" "}
                      Logo{" "}
                    </label>
                  </div>

                  <div className="form-group md-input w-25">
                    {/* <select
                      className="form-control md-select"
                      onChange={({ target }) => {
                        console.log("target.value", target.value),
                          setConfiguracion({
                            ...configuracion,
                            imagen: target.value,
                          });
                      }}
                    >
                      {configuracionesEmpresa?.map((item) => {
                        return (
                          <option key={item.id} value={item.imagen}>
                            Imagen {item.id}
                          </option>
                        );
                      })}
                    </select> */}
                    <div className="card-img">
                      <img
                        src={`data:image/png;base64,${configuracionesEmpresa[0]?.imagen}`}
                        className="img-fluid"
                        alt="Logotipo empresa"
                      ></img>
                    </div>
                    <label
                      className="md-label"
                      style={{ color: `${configuracionesEmpresa[0]?.color1}` }}
                    >
                      {" "}
                      Imagen principal{" "}
                    </label>
                  </div>

                  <div className="form-group md-input w-15">
                    {/* <select
                      className="form-control md-select"
                      onChange={({ target }) => {
                        console.log("target.value", target.value),
                          setConfiguracion({
                            ...configuracion,
                            color1: target.value,
                          });
                      }}
                    >
                      {configuracionesEmpresa?.map((item) => {
                        return (
                          <option key={item.id} value={item.color1}>
                            {item.color1}
                          </option>
                        );
                      })}
                    </select> */}
                    <div className="card-img">
                      <div className="color-show" style={{ backgroundColor: `${configuracionesEmpresa[0]?.color1}` }}>
                        <ColorLensIcon></ColorLensIcon>
                      </div>
                      
                    </div>
                    <label
                      className="md-label"
                      style={{ color: `${configuracionesEmpresa[0]?.color1}` }}
                    >
                      {" "}
                      Color primario{" "}
                    </label>
                  </div>

                  <div className="form-group md-input w-15">
                    {/* <select
                      className="form-control md-select"
                      onChange={({ target }) => {
                        console.log("target.value", target.value),
                          setConfiguracion({
                            ...configuracion,
                            color2: target.value,
                          });
                      }}
                    >
                      {configuracionesEmpresa?.map((item) => {
                        return (
                          <option key={item.id} value={item.color2}>
                            {item.color2}
                          </option>
                        );
                      })}
                    </select> */}
                    <div className="card-img">
                      <div className="color-show" style={{ backgroundColor: `${configuracionesEmpresa[0]?.color2}` }}>
                        <ColorLensIcon></ColorLensIcon>
                      </div>
                      
                    </div>
                    <label
                      className="md-label"
                      style={{ color: `${configuracionesEmpresa[0]?.color1}` }}
                    >
                      {" "}
                      Color secundario{" "}
                    </label>
                  </div>
                  <div className="label-checkbox">
                    <label
                      style={{ color: `${configuracionesEmpresa[0]?.color1}` }}
                    >
                      Por defecto
                    </label>

                    <Checkbox
                      // onChange={({ target }) => {
                      //   console.log("target.value", target.value),
                      //     setConfiguracion({
                      //       ...configuracion,
                      //       defecto: target.value,
                      //     });
                      // }}
                      checked={configuracionesEmpresa[0].consultaConfig}
                      color="primary"
                      inputProps={{
                        "aria-label": "checkbox with default color",
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal modal-custom fade"
        id="modalNuevoParametro"
        tabIndex="-1"
        aria-labelledby="modalNuevoParametro"
        aria-hidden="true"
        data-mdb-backdrop="true"
        data-mdb-keyboard="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="modalNuevoDocumento"
                style={{ color: `${configuracionesEmpresa[0]?.color1}` }}
              >
                {" "}
                EDITAR PARÁMETRO{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="#" className="form-parametros">
                <div className="col">
                  <p className="form-date">
                    {" "}
                    <strong> Elige colores </strong>{" "}
                  </p>
                  <div className="color-selector">
                    <label htmlFor="color-label"> Color primario </label>
                    <input
                      required
                      className="color-input"
                      type="color"
                      id="head"
                      name="color-label"
                      onChange={({ target }) => {
                          setConfiguracionNuevoParamColor1(target.value);
                      }}
                      value={configuracionNuevoParamColor1}
                    />
                  </div>
                  <div className="color-selector">
                    <input
                      required
                      className="color-input"
                      type="color"
                      id="head"
                      name="color-label"
                      onChange={({ target }) => {
                          setconfiguracionNuevoParamColor2(target.value);
                      }}
                      value={configuracionNuevoParamColor2}
                    />
                  </div>
                  <div>
                    <Checkbox
                      onChange={({ target }) => {
                        setDefecto(target.checked);
                      }}
                      checked={defecto}
                      color="primary"
                      inputProps={{
                        "aria-label": "checkbox with default color",
                      }}
                    />
                    <span>Por defecto</span>
                  </div>
                </div>
                <div className="modal-col">
                  <p className="form-date">
                    {" "}
                    <strong> Seleccionar logo </strong>{" "}
                  </p>
                  <div className="carga-documento-section">
                    <div className="carga-documento-content">
                      <span className="material-icons-outlined">
                        {" "}
                        cloud_upload{" "}
                      </span>
                      <p className="text"> Arrasta un archivo hasta aqui. </p>
                      <p className="text-small"> O si prefieres.. </p>

                      <input
                        accept="image/*"
                        required
                        type="file"
                        onChange={(event) => {
                            setconfiguracionNuevoParamLogo(
                              event.target.files[0]
                            );
                        }}
                      />
                      <p className="text-alert">
                        {" "}
                        El archivo debe ser jpg o png
                      </p>
                    </div>
                  </div>
                </div>
                <div className="modal-col">
                  <p className="form-date">
                    {" "}
                    <strong> Seleccionar imagen </strong>{" "}
                  </p>
                  <div className="carga-documento-section">
                    <div className="carga-documento-content">
                      <span className="material-icons-outlined">
                        {" "}
                        cloud_upload{" "}
                      </span>
                      <p className="text"> Arrasta un archivo hasta aqui. </p>
                      <p className="text-small"> O si prefieres.. </p>

                      <input
                        accept="image/*"
                        required
                        type="file"
                        onChange={(event) => {
                            setconfiguracionNuevoParamImagen(
                              event.target.files[0]
                            );
                        }}
                      />

                      <p className="text-alert">
                        {" "}
                        El archivo debe ser jpg o png{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-link"
                data-mdb-toggle="modal"
                data-mdb-target="#modalError"
              >
                {" "}
                CANCELAR{" "}
              </button>
              <button
                type="button"
                onClick={onCrearParametro}
                className="btn btn-primary"
                data-mdb-toggle="modal"
                data-mdb-target="#modalConfirma"
                style={{
                  backgroundColor: `${configuracionesEmpresa[0]?.color1}`,
                }}
              >
                {" "}
                Editar Parámetro{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal modal-custom fade"
        id="modalConfirma"
        tabIndex="-1"
        aria-labelledby="modalConfirmaLabel"
        aria-hidden="true"
        data-mdb-backdrop="true"
        data-mdb-keyboard="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-col modal-alerts">
                <span className="material-icons-outlined icon-confirm">
                  {" "}
                  check_circle{" "}
                </span>
                <h2 className="message-text">
                  {" "}
                  Nuevo parámetro agregado con éxito.{" "}
                </h2>
                <p> Has creado un nuevo esquema de color e imágenes. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
