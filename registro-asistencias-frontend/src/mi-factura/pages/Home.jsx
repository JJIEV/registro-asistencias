import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import moment from "moment";
import "moment/locale/es";
import {
  cargarPaginaFiltrada,
  clearStateElectronicos,
} from "../../reducers/docs/electronicos/electronicoSlice.js";
import { clearStateEmpresa } from "../../reducers/users/cargarDatos";
import {
  cargarEmpresaById,
  onSelectEmpresa,
} from "../../reducers/users/empresaSlice.js";
import zeroFill from "zero-fill";
import {
  cargarConfiguracionConsulta,
  cargarConfiguracionEmpresa,
} from "../../reducers/config/configSelected.js";
import { cargarConfiguracionesEmpresa } from "../../reducers/config/configsEmpresa.js";
import {
  cargarDocXml,
  cargarDocXmlAndKuDE,
} from "../../reducers/docs/xml/docXML.js";
import { onLogout } from "../../reducers/auth/slices/authSlice.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import logoDefault from "../prod/img/logo-colegio.png";
import perfilEmptyDefault from "../prod/img/avatar.png";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import { cargarPaginaFiltradaListaEmpresas } from "../../reducers/docs/empresas/actions.js";
import { cargarAlumnos } from "../../reducers/docs/alumnos/actions.js";
import {
  agregarRegistroAsistencia,
  cargarAulaMateriaList,
} from "../../reducers/docs/aulaMateria/actions.js";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export const Home = () => {
  const cookies = new Cookies();

  const dispatch = useDispatch();

  const asistenciaPresencia = [
    { id: 1, nombre: "Presente" },
    { id: 2, nombre: "Ausente" },
  ];

  const aulaMateriaList = useSelector((state) => {
    return state.aulaMateriaList.aulaMateriaList;
  });

  const alumnos = useSelector((state) => {
    return state.alumnos.alumnos;
  });

  const { username, roles } = useSelector((state) => {
    return state.auth;
  });

  const [fecha, setFecha] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const [presenteTodosSeleccionado, setPresenteTodosSeleccionado] =
    useState(false);

  const [aulaMateriaSeleccionada, setAulaMateriaSeleccionada] = useState(null);

  const [asistenciaSeleccionada, setAsistenciaSeleccionada] = useState(null);

  useEffect(() => {
    dispatch(cargarAlumnos());
    dispatch(cargarAulaMateriaList());
    console.log("Fecha: ", fecha)
  }, []);

  const onCerrarSesion = () => {
    dispatch(clearStateEmpresa()), dispatch(onLogout());
    cookies.remove("token");
    cookies.remove("roles");
    cookies.remove("refreshToken");
  };

  const handleSelectAlumno = (e) => {
    const id = Number(e.target.value);
    const alumnoObj = alumnos.find((item) => item.id === id);
    setAlumnoSeleccionado(alumnoObj);
  };

  const handleSelectAulaMateria = (e) => {
    const id = Number(e.target.value);
    const aulaMateriaObj = aulaMateriaList.find((item) => item.id === id);
    setAulaMateriaSeleccionada(aulaMateriaObj);
  };

  const handleSelectAsistencia = (e) => {
    const id = Number(e.target.value);
    const asistenciaObj = asistenciaPresencia.find((item) => item.id === id);
    setAsistenciaSeleccionada(asistenciaObj);
  };
  function handleCheckboxChange(event) {
    setPresenteTodosSeleccionado(event.target.checked);
  }

  const handleSubmit = () => {
    const filtro = {
      aulaMateria: aulaMateriaSeleccionada,
      alumno: alumnoSeleccionado,
      fecha: fecha,
      asistencia: asistenciaSeleccionada ? asistenciaSeleccionada.nombre : null,
      presenteTodos: presenteTodosSeleccionado,
    };
    dispatch(agregarRegistroAsistencia(filtro));
    // setAulaMateriaSeleccionada({})
    // setAlumnoSeleccionado({})
    // setFecha(new Date)
    // setAsistenciaSeleccionada(null)
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
          <li><Link to={"/justificacion"}>Reportes</Link></li>
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
            {/* {roles?.indexOf("admin") !== -1 && (
              <li className="nav-item">
                <Link to={"/empresa"}>
                  {" "}
                  <ApartmentIcon></ApartmentIcon>
                </Link>

                <Link to={"/usuario"}>
                  {" "}
                  <PersonIcon></PersonIcon>
                </Link>
              </li>
            )}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle custom-nav"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="true"
              >
                <img
                  src={logoDefault}
                  className="img-fluid img-perfil"
                  alt="Foto de perfil"
                ></img>
                {username}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              ></ul>
            </li>
            {roles?.indexOf("admin") !== -1 && (
              <li className="nav-item">
                <Link
                  to={"/configuracion"}
                  className="nav-link nav-settings"
                  role="button"
                >
                  {" "}
                  <span className="material-icons-outlined"> settings </span>
                </Link>
              </li>
            )} */}

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
              <h1 className="pageTitle"> Registro de Asistencias </h1>
            </div>
            <div className="contentFiltros card ">
              <div className="form-filtros ">
                <Form.Group className="form-group md-input mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Presente Todos"
                    checked={presenteTodosSeleccionado}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
                <Form.Group className="form-group md-input">
                  <label className="label-tittle-text">Alumno</label>
                  <Form.Control
                    as="select"
                    value={alumnoSeleccionado ? alumnoSeleccionado.id : ""}
                    onChange={handleSelectAlumno}
                  >
                    <option value="" disabled>
                      Seleccione un alumno
                    </option>
                    {alumnos.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nombre + " " + item.apellido}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="form-group md-input">
                  <label className="label-tittle-text">Curso</label>
                  <Form.Control
                    as="select"
                    value={
                      aulaMateriaSeleccionada ? aulaMateriaSeleccionada.id : ""
                    }
                    onChange={handleSelectAulaMateria}
                  >
                    <option value="" disabled>
                      Seleccione un curso
                    </option>
                    {aulaMateriaList.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.aula.descripcion +
                          " " +
                          item.aula.especialidad.descripcion +
                          " " +
                          item.materia.descripcion}
                      </option>
                    ))}
                  </Form.Control>

                  {aulaMateriaSeleccionada && (
                    <p>
                      Profesor:{" "}
                      {aulaMateriaSeleccionada.docente.nombre +
                        " " +
                        aulaMateriaSeleccionada.docente.apellido}
                    </p>
                  )}
                </Form.Group>

                <Form.Group className="form-group md-input">
                  <label className="label-tittle-text">Fecha</label>
                  <Form.Control
                    type="date"
                    placeholder="Ingresa la fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="form-group md-input">
                  <label className="label-tittle-text">Asistencia</label>
                  <Form.Control
                    as="select"
                    value={
                      asistenciaSeleccionada ? asistenciaSeleccionada.id : ""
                    }
                    onChange={handleSelectAsistencia}
                  >
                    <option value="" disabled>
                      Seleccione un asistencia
                    </option>
                    {asistenciaPresencia.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <div className="d-flex justify-content-center mt-4 mb-2">
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    style={{ backgroundColor: "#1565D8" }}
                  >
                    Registrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
