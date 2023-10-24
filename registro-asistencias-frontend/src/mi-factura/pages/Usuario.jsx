import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import moment from "moment";
import "moment/locale/es";
import { clearStateElectronicos } from "../../reducers/docs/electronicos/electronicoSlice.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import logoDefault from "../prod/img/logo-mifactura.png";
import perfilEmptyDefault from "../prod/img/avatar.png";
import { clearStateEmpresa } from "../../reducers/users/cargarDatos";
import { onLogout } from "../../reducers/auth/slices/authSlice.js";
import ApartmentIcon from "@mui/icons-material/Apartment";
import {
  modificarUsuarioEmpresa,
  cargarPaginaFiltradaListaUsuarios,
} from "../../reducers/docs/usuarios/actions.js";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { cargarEmpresaById } from "../../reducers/users/empresaSlice.js";
import { cargarConfiguracionConsulta } from "../../reducers/config/configSelected.js";
import PersonIcon from "@mui/icons-material/Person";
import { cargarPaginaFiltradaListaEmpresas } from "../../reducers/docs/empresas/actions.js";
import { agregarUsuario } from "../../reducers/docs/usuarios/actions.js";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";

export const Usuario = () => {
  const cookies = new Cookies();


  const dispatch = useDispatch();

  const { username, roles } = useSelector((state) => {
    return state.auth;
  });

  const { totalPaginasEmpresas, listaEmpresasTotal } = useSelector((state) => {
    return state.empresasPaginadas;
  });


  const [filasPorPagina, setFilasPorPagina] = useState(4);
  const [paginaActual, setPaginaActual] = useState(0);
  const [paginaActualEmpresa, setPaginaActualEmpresa] = useState(0);
  const [filasPorPaginaEmpresa, setFilasPorPaginaEmpresa] = useState(
    4 * totalPaginasEmpresas
  );

  const [showFiltro, setShowFiltro] = useState(false);
  const handleShowFiltro = () => setShowFiltro(true);
  const handleCloseFiltro = () => setShowFiltro(false);

  const [showModalPost, setShowModalPost] = useState(false);
  const handleShowModalPost = () => setShowModalPost(true);
  const handleCloseModalPost = () => setShowModalPost(false);

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");

  const [empresaLista, setEmpresaLista] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [empresasAgregadas, setEmpresasAgregadas] = useState([]);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuariosAgregados, setUsuariosAgregados] = useState([]);

  const configuracionNueva = useSelector((state) => {
    return state.configuracion.settingSelected;
  });

  const empresas = useSelector((state) => {
    return state.usuario.empresas;
  });

  const { totalPaginas, listaUsuariosTotal } = useSelector((state) => {
    return state.usuariosPaginados;
  });

  const mostrar = [4, 8, 12, 16];

  const handleChangeFilasPorPagina = (event) => {
    setFilasPorPagina(event.target.value);
    setPaginaActual(0);
  };
  const handleChangePagina = (event, value) => {
    setPaginaActual(value - 1);
  };

  useEffect(() => {
    dispatch(cargarConfiguracionConsulta());
    dispatch(
      cargarPaginaFiltradaListaUsuarios({
        page: paginaActual,
        size: filasPorPagina,
      })
    );
    dispatch(
      cargarPaginaFiltradaListaEmpresas({
        page: paginaActualEmpresa,
        size: filasPorPaginaEmpresa,
      })
    );
  }, [paginaActual, filasPorPagina]);

  const handleSubmit = () => {
    const filtro = {
      username: nombreUsuario,
      nombre: nombre,
      apellido: apellido,
      correo: correo,
    };
    dispatch(agregarUsuario(filtro))
    .then(data => {
      handleCloseFiltro();
      dispatch(
      cargarPaginaFiltradaListaUsuarios({
        page: paginaActual,
        size: filasPorPagina,
      })
    );
    })
    .catch(error => {
      console.error('Ocurrió un error:', error);
    });
    
    
  };
  const handleSubmitEmpresas = () => {
    const filtro = {
      username: usuarioSeleccionado.username,
      empresas: empresasAgregadas,
    };
    dispatch(modificarUsuarioEmpresa(filtro));
    handleCloseModalPost();
    setUsuarioSeleccionado({})
    setEmpresasAgregadas([])
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
  const onSwitchEmpresa = (item) => {
    // dispatch(cargarConfiguracionEmpresa(item.configuracion.id));
    // dispatch(onSelectEmpresa(item));
    dispatch(cargarEmpresaById(item.id));
    // dispatch(cargarConfiguracionesEmpresa(item.id));
  };

  const handleAgregarEmpresa = () => {
    if (empresaSeleccionada) {
      setEmpresasAgregadas([...empresasAgregadas, empresaSeleccionada]);
    }
    
  };
  const handleSelect = (e) => {
    const id = Number(e.target.value);
    const empresaObj = listaEmpresasTotal.find((item) => item.id === id);
    setEmpresaSeleccionada(empresaObj);
  };

  const handleSelectUsuario = (e) => {
    const id = Number(e.target.value);
    const usuarioObj = listaUsuariosTotal.find((item) => item.id === id);
    setUsuarioSeleccionado(usuarioObj);
  };

  const handleEliminarEmpresa = (id) => {
    setEmpresasAgregadas((prevEmpresas) =>
      prevEmpresas.filter((empresa) => empresa.id !== id)
    );
  };

  return (
    <div>
      <nav className="navbar navbar-light">
        <div className="leftside me-auto">
          <Link to={"/home"} className="brand">
            <img
              src={
                configuracionNueva?.logo
                  ? `data:image/png;base64,${configuracionNueva?.logo}`
                  : logoDefault
              }
              className="img-fluid"
              alt="Logotipo empresa"
            ></img>
          </Link>
        </div>

        <ul className="navbar-nav">
          <Link to={"/empresa"}>
            {" "}
            <ApartmentIcon></ApartmentIcon>
          </Link>
          <Link to={"/usuario"}>
            {" "}
            <PersonIcon></PersonIcon>
          </Link>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle custom-nav"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="true"
            >
              <img
                src={
                  configuracionNueva?.logo
                    ? "data:image/png;base64," + `${configuracionNueva?.logo}`
                    : logoDefault
                }
                className="img-fluid img-perfil"
                alt="Foto de perfil"
              ></img>
              {username}
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              {Array.isArray(empresas) &&
                empresas.map((item) => {
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
                          src={
                            item.configuracion?.logo
                              ? `data:image/png;base64,${item.configuracion?.logo}`
                              : perfilEmptyDefault
                          }
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
      <div className="contentPage card">
        <section id="documentos">
          <div className="table-responsive">
            <button
              style={configuracionNueva?.color1?{ backgroundColor: `${configuracionNueva?.color1}` } : {backgroundColor: "#1565D8"}}
              className="btn btn-lg btn-primary"
              onClick={handleShowFiltro}
            >
              Agregar usuario
            </button>
            <button
              style={configuracionNueva?.color1?{ backgroundColor: `${configuracionNueva?.color1}` } : {backgroundColor: "#1565D8"}}
              className="btn btn-lg btn-primary button-obj"
              onClick={handleShowModalPost}
            >
              Asociar empresas
            </button>
            <table
              className="table table-striped table-hover"
              id="dtBasicExample"
              cellSpacing="0"
              width="100%"
            >
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Correo</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(listaUsuariosTotal) &&
                  listaUsuariosTotal.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.username}</td>
                        <td>{item.nombre}</td>
                        <td>{item.apellido}</td>
                        <td>{item.correo}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
        <div id="paginador">
          <label>
            Mostrar
            <select
              value={filasPorPagina}
              onChange={handleChangeFilasPorPagina}
              className="form-control custom-select custom-cursor"
              id="maxRows"
              name="state"
            >
              {mostrar.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
              resultados
            </select>
          </label>

          <Stack spacing={2}>
            <Pagination
              count={totalPaginas}
              shape="rounded"
              onChange={handleChangePagina}
              color="primary"
              page={paginaActual + 1}
            />
          </Stack>
        </div>
      </div>
      <Modal show={showFiltro} onHide={handleCloseFiltro}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-filtros">
            <Row className="modal-row">
              <Form.Group className="form-group md-input">
                <Form.Control
                  type="text"
                  placeholder="Ingresa el username"
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group md-input">
                <Form.Control
                  type="text"
                  placeholder="Ingresa el nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group md-input">
                <Form.Control
                  type="text"
                  placeholder="Ingresa el apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group md-input">
                <Form.Control
                  type="text"
                  placeholder="Ingresa el correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFiltro}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}
          style={configuracionNueva?.color1?{ backgroundColor: `${configuracionNueva?.color1}` } : {backgroundColor: "#1565D8"}}>
            Guardar usuario
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalPost} onHide={handleCloseModalPost}>
        <Modal.Header closeButton>
          <Modal.Title>Asignar empresas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-filtros">
            <Row className="modal-row">
              {/* Tus otros campos de formulario aquí... */}
              <Form.Group className="form-group md-input">
                <Form.Control
                  as="select"
                  value={usuarioSeleccionado ? usuarioSeleccionado.id : ""}
                  onChange={handleSelectUsuario}
                >
                  <option value="" disabled>
                    Seleccione un usuario
                  </option>
                  {listaUsuariosTotal.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.username}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="form-group md-input">
                <Form.Control
                  as="select"
                  value={empresaSeleccionada ? empresaSeleccionada.id : ""}
                  onChange={handleSelect}
                >
                  <option value="" disabled>
                    Seleccione una empresa
                  </option>
                  {listaEmpresasTotal.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre}
                    </option>
                  ))}
                </Form.Control>
                <Button
                  style={configuracionNueva?.color1?{ backgroundColor: `${configuracionNueva?.color1}` } : {backgroundColor: "#1565D8"}}
                  className="button-agregar"
                  onClick={handleAgregarEmpresa}
                >
                  Agregar empresa
                </Button>
              </Form.Group>
            </Row>
          </Form>
          {/* <ul>
            {empresasAgregadas.map((item) => {
              const empresa = listaEmpresasTotal.find((e) => e.id === item.id);
              return (
                <li key={item.id}>
                  {empresa ? empresa.nombre : "Empresa no encontrada"}
                </li>
              );
            })}
          </ul> */}
          <ul>
            {empresasAgregadas.map((item) => {
              const empresa = listaEmpresasTotal.find((e) => e.id === item.id);
              return (
                <li key={item.id}>
                  <div className="flex-container-lista">
                    <span className="flex-text">
                      {empresa ? empresa.nombre : "Empresa no encontrada"}
                    </span>
                    {/* <Button
                      className="button-delete-empresa-list"
                      onClick={() => handleEliminarEmpresa(item.id)}
                    >
                      <CancelIcon></CancelIcon>
                    </Button> */}
                    <Link
                    to="#"
                    className="icon-link"
                    onClick={() => handleEliminarEmpresa(item.id)}>
                      <CancelIcon />
                    </Link> 
                  </div>
                </li>
              );
            })}
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalPost}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmitEmpresas}
          style={configuracionNueva?.color1?{ backgroundColor: `${configuracionNueva?.color1}` } : {backgroundColor: "#1565D8"}}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
