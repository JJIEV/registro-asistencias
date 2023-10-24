import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import moment from "moment";
import "moment/locale/es";
import { clearStateElectronicos } from "../../reducers/docs/electronicos/electronicoSlice.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import logoDefault from "../prod/img/logo-colegio.png";
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
import { cargarAsistenciasPorCurso } from "../../reducers/docs/asistencias/actions.js";
import { cargarAulaMateriaList } from "../../reducers/docs/aulaMateria/actions.js";
import { cargarAulasList } from "../../reducers/docs/aulas/actions.js";
import { cargarEspecialidadesList } from "../../reducers/docs/especialidades/actions.js";
import {
  agregarJustificacion,
  cargarJustificacion,
} from "../../reducers/docs/justificacion/actions.js";
import {
  clearStateJustificacion,
  setJustificacion,
} from "../../reducers/docs/justificacion/index.js";

export const AsistenciaPrimeroBTI = () => {
  const cookies = new Cookies();

  const dispatch = useDispatch();

  const { username, roles } = useSelector((state) => {
    return state.auth;
  });

  const { totalPaginasEmpresas, listaEmpresasTotal } = useSelector((state) => {
    return state.empresasPaginadas;
  });

  const [filasPorPagina, setFilasPorPagina] = useState(10);
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

  const aulaMateriaList = useSelector((state) => {
    return state.aulaMateriaList.aulaMateriaList;
  });

  const [aulaMateriaSeleccionada, setAulaMateriaSeleccionada] = useState(null);

  const [aulaSeleccionada, setAulaSeleccionada] = useState(null);
  const [asistenciaSeleccionada, setAsistenciaeleccionada] = useState(null);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] =
    useState(null);

  const [justificacioneleccionada, setJustificacioneleccionada] =
    useState(null);

  const justificacionDescripcion = useSelector((state) => {
    return state.justificacion.justificacion.justificacion;
  });

  const justificacionImagen = useSelector((state) => {
    return state.justificacion.justificacion.archivo;
  });

  const [descripcionJust, setDescripcionJust] = useState("");
  const [archivo, setArchivo] = useState(null);

  const [showModalJustificacion, setShowModalJustificacion] = useState(null);

  const [showModalJustificacionAgregar, setShowModalJustificacionAgregar] =
    useState(null);

  const [justificacionAgregar, setJustificacionAgregar] = useState(null);

  const configuracionNueva = useSelector((state) => {
    return state.configuracion.settingSelected;
  });

  const empresas = useSelector((state) => {
    return state.usuario.empresas;
  });

  const aulas = useSelector((state) => {
    return state.aulas?.aulasList;
  });

  const especialidades = useSelector((state) => {
    return state.especialidades?.especialidadesList;
  });

  //   const { totalPaginas, listaUsuariosTotal } = useSelector((state) => {
  //     return state.usuariosPaginados;
  //   });

  const { totalPaginasAsistencias, asistencias } = useSelector((state) => {
    return state.asistencias;
  });

  const mostrar = [10, 20];

  const handleChangeFilasPorPagina = (event) => {
    setFilasPorPagina(event.target.value);
    setPaginaActual(0);
  };
  const handleChangePagina = (event, value) => {
    setPaginaActual(value - 1);
  };

  useEffect(() => {
    dispatch(cargarAulaMateriaList());
    dispatch(cargarEspecialidadesList());
    dispatch(cargarAulasList());

    const filtro = {
      aulaId: 1,
      especialidadId: 1,
      pageNumber: paginaActual,
      pageSize: filasPorPagina,
    };
    dispatch(cargarAsistenciasPorCurso(filtro));
  }, [paginaActual, filasPorPagina]);

  const onFiltrar = () => {
    const filtro = {
      aulaId: aulaSeleccionada.id,
      especialidadId: especialidadSeleccionada.id,
      pageNumber: paginaActual,
      pageSize: filasPorPagina,
    };
    dispatch(cargarAsistenciasPorCurso(filtro));
  };
  const onCargarJustificacion = async (id) => {
    const success = dispatch(cargarJustificacion(id));
    if (success) {
      setShowModalJustificacion(true);
    }
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescripcionJust(e.target.value);
  };

  const handleCloseShowJustificacion = () => {
    setShowModalJustificacion(false);
    setJustificacion({});

    dispatch(clearStateJustificacion());
  };

  const handleCloseShowJustificacionAgregar = () => {
    setShowModalJustificacionAgregar(false);
    setDescripcionJust("");
    setArchivo(null);
  };

  const handleShowAgregarModal = (asistencia) => {
    const asistenciaSeleccionadaJustificacion = asistencias.find(
      (item) => item.id === asistencia.id
    );
    setJustificacionAgregar(asistenciaSeleccionadaJustificacion);
    setShowModalJustificacionAgregar(true);
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

  const handleSelectEspecialidad = (e) => {
    const id = Number(e.target.value);
    const especialidadObj = especialidades.find((item) => item.id === id);
    setEspecialidadSeleccionada(especialidadObj);
  };
  const handleSelectAula = (e) => {
    const id = Number(e.target.value);
    const aulaObj = aulas.find((item) => item.id === id);
    setAulaSeleccionada(aulaObj);
  };

  const handleAgregarJustificacion = async () => {
    const filtro = {
      descripcion: descripcionJust,
      archivo: archivo,
      asistencia: justificacionAgregar,
    };
    dispatch(agregarJustificacion(filtro));
    handleCloseShowJustificacionAgregar();
  };

  const handleButtonClickPDF = async () => {
    try {
      // URL del endpoint que genera el PDF
      const url = `http://localhost:8484/asistencias-pdf?aulaId=${aulaSeleccionada ? aulaSeleccionada?.id : "1"}&especialidadId=${especialidadSeleccionada ? especialidadSeleccionada?.id : "1"}`;
      
      // Abrir en una nueva ventana/pestaña
      window.open(url, '_blank');
    } catch (error) {
      console.error("Ocurrió un error al intentar generar el PDF:", error);
    }
  };

  return (
    <div className="wrapperPage" style={{ backgroundColor: "#EDF2F9" }}>
      <div class="sidebar">
        <h3>Menu</h3>
        <ul>
          <li>
            <Link to={"/home"}>Inicio</Link>
          </li>
          <li>
            <Link to={"/asistenciaPrimeroBti"}>Asistencias</Link>
          </li>
          <li><Link to={"/reportes"}>Reportes</Link></li>
          <li><Link to={"/alumno"}>Alumnos</Link></li>
        </ul>
      </div>
      <div className="main">
        <nav className="navbar navbar-light">
          <div className="leftside me-auto">
            <Link to={"/home"} className="brand">
              <img
                src={logoDefault}
                className="img-fluid"
                alt="Logotipo empresa"
              ></img>
            </Link>
          </div>

          <ul className="navbar-nav">
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
        <div className="contentFiltros card">
          <div className="form-row">
            <div className="form-group md-input w-25">
              <select
                className="form-control md-select custom-cursor"
                value={aulaSeleccionada ? aulaSeleccionada.id : ""}
                onChange={handleSelectAula}
              >
                <option value="" disabled>
                  Seleccione un aula
                </option>
                {aulas.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.descripcion}
                  </option>
                ))}
              </select>
              <label style={{ color: "#1565D8" }} className="md-label">
                {" "}
                Aula{" "}
              </label>
            </div>
            <div className="form-group md-input w-25">
              <select
                className="form-control md-select custom-cursor"
                value={
                  especialidadSeleccionada ? especialidadSeleccionada.id : ""
                }
                onChange={handleSelectEspecialidad}
              >
                <option value="" disabled>
                  Seleccione una especialidad
                </option>
                {especialidades.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.descripcion}
                  </option>
                ))}
              </select>
              <label style={{ color: "#1565D8" }} className="md-label">
                {" "}
                Especialidad{" "}
              </label>
            </div>

            <div className="add-item">
              <a
                href={null}
                role="button"
                className="btn btn-lg btn-primary"
                style={{ backgroundColor: "#1565D8" }}
                onClick={onFiltrar}
              >
                {" "}
                Filtrar{" "}
              </a>
            </div>
          </div>
        </div>

<div className="btn-container">
        <div>
          <Link
            to={"/home"}
            style={{
              backgroundColor: "#1565D8",
              color: "#FFFFFF",
              display: "inline-block",
              margin: 5,
            }}
            className="btn btn-lg btn-back"
          >
            Volver
          </Link>
        </div>
        <div>
          <Button onClick={handleButtonClickPDF}>PDF</Button>
        </div>

        </div>

        <div className="contentPage card">
          <section id="documentos">
            <div className="table-responsive">
              <table
                className="table table-striped table-hover"
                id="dtBasicExample"
                cellSpacing="0"
                width="100%"
              >
                <thead>
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Curso</th>
                    <th scope="col">Alumno</th>
                    <th scope="col">Asistencia</th>
                    <th scope="col">Justificacion</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(asistencias) &&
                    asistencias.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{moment(item.fecha).format("YYYY-MM-DD")}</td>
                          <td>
                            {item.aulaMateria.aula?.descripcion +
                              " " +
                              item.aulaMateria?.aula.especialidad?.descripcion}
                          </td>
                          <td>
                            {item.alumno.nombre + " " + item.alumno.apellido}
                          </td>
                          <td>{item.asistencia}</td>
                          <td>
                            <div
                              style={{
                                display: "inline-flex",
                                marginRight: "10px",
                              }}
                            >
                              <button
                                style={{ backgroundColor: "#1565D8" }}
                                className="btn btn-sm btn-primary"
                                onClick={() => onCargarJustificacion(item.id)}
                              >
                                Ver
                              </button>
                            </div>
                            <div
                              style={{
                                display: "inline-flex",
                                marginRight: "10px",
                              }}
                            >
                              <button
                                style={{ backgroundColor: "#1565D8" }}
                                className="btn btn-sm btn-primary"
                                onClick={() => handleShowAgregarModal(item)}
                              >
                                Agregar
                              </button>
                            </div>
                          </td>
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
                count={totalPaginasAsistencias}
                shape="rounded"
                onChange={handleChangePagina}
                color="primary"
                page={paginaActual + 1}
              />
            </Stack>
          </div>
        </div>
        <Modal
          show={showModalJustificacion}
          onHide={() => handleCloseShowJustificacion()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Justificacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="form-filtros">
              <Row className="modal-row">
                <Form.Group className="form-group md-input">
                  <p style={{ whiteSpace: "pre-line" }}>
                    {justificacionDescripcion}
                  </p>
                </Form.Group>
                {justificacionImagen && (
                  <Form.Group>
                    <img
                    src={
                      configuracionNueva?.logo
                        ? `data:image/png;base64,${justificacionImagen}`
                        : logoDefault
                    }
                      className="img-fluid"
                      alt="Imagen justificación"
                    ></img>
                  </Form.Group>
                )}
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleCloseShowJustificacion()}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showModalJustificacionAgregar}
          onHide={handleCloseShowJustificacionAgregar}
        >
          <Modal.Header closeButton>
            <Modal.Title>Justificacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="form-filtros">
              <Row className="modal-row">
                <Form.Group className="form-group md-input">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4} // Puedes ajustar el número de líneas visibles por defecto
                    placeholder="Introduce tu descripción"
                    value={descripcionJust}
                    onChange={handleDescriptionChange}
                  />
                </Form.Group>
              </Row>
              <Row className="modal-row">
                <Form.Group className="form-group md-input">
                  <Form.Label>Archivo</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseShowJustificacionAgregar}
            >
              Cerrar
            </Button>
            <Button
              variant="primary"
              onClick={() => handleAgregarJustificacion()}
            >
              Agregar Justificación
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
