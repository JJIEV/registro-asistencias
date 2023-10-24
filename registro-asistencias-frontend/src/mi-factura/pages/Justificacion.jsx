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

import { clearStateEmpresa } from "../../reducers/users/cargarDatos.js";
import { onLogout } from "../../reducers/auth/slices/authSlice.js";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import { cargarAsistenciasPorCurso } from "../../reducers/docs/asistencias/actions.js";

import { agregarAlumno, cargarPaginaFiltradaListaAlumnos } from "../../reducers/docs/alumnos/actions.js";
import { cargarPaginaFiltradaListaJustificacion } from "../../reducers/docs/justificacion/actions.js";

export const Justificacion = () => {
  const cookies = new Cookies();

  const dispatch = useDispatch();

  const { username, roles } = useSelector((state) => {
    return state.auth;
  });

  const { totalPaginasAlumnos, alumnos } = useSelector((state) => {
    return state.alumnos;
  });

  const [filasPorPagina, setFilasPorPagina] = useState(10);
  const [paginaActual, setPaginaActual] = useState(0);
  const [paginaActualEmpresa, setPaginaActualEmpresa] = useState(0);
  const [filasPorPaginaEmpresa, setFilasPorPaginaEmpresa] = useState(
    4 * totalPaginasAlumnos
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

  const [showFiltroAlumno, setShowFiltroAlumno] = useState(false);

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

  // const alumnos = useSelector((state) => {
  //   return state.alumnos.alumnos;
  // });

  const [descripcionJust, setDescripcionJust] = useState("");
  const [archivo, setArchivo] = useState(null);

  const [showModalJustificacion, setShowModalJustificacion] = useState(null);

  const [nombreAlumno, setNombreAlumno] = useState("");
  const [apellidoAlumno, setApellidoAlumno] = useState("");
  const [tipoDocumentoAlumno, setTipoDocumentoAlumno] = useState("");
  const [documentoAlumno, setDocumentoAlumno] = useState("");

  const [showModalJustificacionAgregar, setShowModalJustificacionAgregar] =
    useState(null);

  const [justificacionAgregar, setJustificacionAgregar] = useState(null);

  const configuracionNueva = useSelector((state) => {
    return state.configuracion.settingSelected;
  });

  const listaJustificaciones = useSelector((state) => {
    return state.justificacion.listaJustificaciones;
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
    const filtro = {
      pageNumber: paginaActual,
      pageSize: filasPorPagina,
    };
    dispatch(cargarPaginaFiltradaListaJustificacion(filtro))

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



  const handleSubmit = () => {
    const nuevoAlumno = {
      nombre: nombreAlumno,
      apellido: apellidoAlumno,
      tipo_documento: tipoDocumentoAlumno,
      documento: documentoAlumno
    }
    dispatch(agregarAlumno(nuevoAlumno))
    handleCloseFiltroAlumno();
  }

  const onCerrarSesion = () => {
    dispatch(clearStateEmpresa()), dispatch(onLogout());
    dispatch(clearStateElectronicos());
    cookies.remove("token");
    cookies.remove("roles");
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

 const openModalAlumno = () => {
  setShowFiltroAlumno(true);
 }

  const handleCloseFiltroAlumno = () => {
    setShowFiltroAlumno(false);

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
                    <th scope="col">Justificación</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Alumno</th>
                    <th scope="col">Curso</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(listaJustificaciones) &&
                    listaJustificaciones.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td style={{ whiteSpace: "pre-line" }}>
                            {item.justificacion}
                          </td>
                          <td>
                            { moment(item.asistencia.fecha).format("YYYY-MM-DD")}
                          </td>
                          <td>{item.asistencia.alumno.nombre + " " + item.asistencia.alumno.apellido}</td>
                          <td>{item.asistencia.alumno.aula.descripcion + " " + item.asistencia.alumno.aula.especialidad.descripcion}</td>
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
                count={totalPaginasAlumnos}
                shape="rounded"
                onChange={handleChangePagina}
                color="primary"
                page={paginaActual + 1}
              />
            </Stack>
          </div>
        </div>
        <Modal show={showFiltroAlumno} onHide={handleCloseFiltroAlumno}>
        <Modal.Header closeButton>
          <Modal.Title 
            >Agregar alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  onSubmit={handleSubmit}>
            <Form.Group controlId="nombreAlumno">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre del alumno"
                value={nombreAlumno}
                onChange={(e) => setNombreAlumno(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="apellido">
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el apellido del alumno"
                value={apellidoAlumno}
                onChange={(e) => setApellidoAlumno(e.target.value)}
                required
              />

            </Form.Group>
            <Form.Group controlId="tipoDocumentoAlumno">
              <Form.Label>Tipo documento:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre del alumno"
                value={tipoDocumentoAlumno}
                onChange={(e) => setTipoDocumentoAlumno(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="documento">
              <Form.Label>Documento:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el apellido del alumno"
                value={documentoAlumno}
                onChange={(e) => setDocumentoAlumno(e.target.value)}
                required
              />

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFiltroAlumno}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            Guardar empresa
          </Button>
        </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
