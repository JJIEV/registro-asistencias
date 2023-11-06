package com.mifacturaportal.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mifacturaportal.dao.*;

import com.mifacturaportal.domain.registro.*;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


import com.mifacturaportal.servicio.ReportService;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.OPTIONS })
@Slf4j
public class AppController {
    @Autowired
    private JustificacionRepository justificacionRepository;
    @Autowired
    private EspecialidadRepository especialidadRepository;
    @Autowired
    private AulaRepository aulaRepository;
    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    ReportService reportService;

    @Autowired
    ParametroDao parametroDao;

    @Autowired
    private AulaMateriaRepository aulaMateriaRepository;

    @Autowired
    private AsistenciaRepository asistenciaRepository;

    @Autowired
    private MateriaRepository materiaRepository;

    @GetMapping("/aula-materia")
    public List<AulaMateria> getAulaMateriaAll(){
        return aulaMateriaRepository.findAll();
    }

    @GetMapping("/alumnos")
    public List<Alumno> getAlumnosAll(){return alumnoRepository.findAll();}

    @GetMapping("/traer-alumnos")
    public Page<Alumno> getAlumnosPaginados(int pageNumber, int pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return alumnoRepository.findAlumnosPaginados(pageable);
    }
    @PostMapping("/agregar-alumno")
    public void agregarEmpresa(@RequestBody Alumno alumno){

        alumnoRepository.save(alumno);

    }

    @GetMapping("/traer-alumnos-por-aula")
    public List<Alumno> getAlumnosPorAluma(@RequestParam(required = false) Integer aulaId){
        List<Alumno> alumnos = new ArrayList<>();
        if (aulaId != null){
            alumnos = alumnoRepository.findAlumnosByAulaId(aulaId);
        }

        if (alumnos != null && aulaId != null){
            return alumnos;
        }else {
            return alumnoRepository.findAll();
        }
    }

    @PostMapping("/agregar-registro-asistencia")
    public void agregarRegistroAsistencia(@RequestBody AsistenciaDTO asistenciaDTO, @RequestParam Boolean presenteTodos){

        Asistencia asistenciaRegistro = new Asistencia();

        List<Alumno> alumnos = alumnoRepository.findAlumnosByAulaId(asistenciaDTO.getAula().getId());

//        AulaMateria aulaMateria = aulaMateriaRepository.findAulaMateriaByAulaIdAndDocenteId(asistenciaDTO.getAulaMateria().getAula().getId(), asistenciaDTO.getAulaMateria().getDocente().getId());

        if (presenteTodos) {
            for (Alumno a : alumnos) {
                Asistencia asistenciaPorAlumno = new Asistencia();
                asistenciaPorAlumno.setAulaMateria(asistenciaDTO.getAulaMateria());
                asistenciaPorAlumno.setAlumno(a);
                asistenciaPorAlumno.setAsistencia("Presente");
                asistenciaPorAlumno.setFecha(asistenciaDTO.getFecha());
                asistenciaRepository.save(asistenciaPorAlumno);
            }
        } else {
            asistenciaRegistro.setAulaMateria(asistenciaDTO.getAulaMateria());
            asistenciaRegistro.setAlumno(asistenciaDTO.getAlumno());
            asistenciaRegistro.setFecha(asistenciaDTO.getFecha());
            asistenciaRegistro.setAsistencia(asistenciaDTO.getAsistencia());
            asistenciaRepository.save(asistenciaRegistro);
        }

    }

    @GetMapping("/traer-justificaciones")
    public Page<Justificacion> getJustificacionPaginados(int pageNumber, int pageSize){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return justificacionRepository.findJustificacionPaginados(pageable);
    }

    @PutMapping("/alumno-editar")
    public ResponseEntity<?> actualizarEmpresa(@RequestParam int alumnoId, @RequestBody Alumno alumnoModif) {

        Optional<Alumno> alumnoEncontrado = alumnoRepository.findById(alumnoId);
        if (!alumnoEncontrado.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        else {
            Alumno alumno = alumnoEncontrado.get();
            alumno.setNombre(alumnoModif.getNombre());
            alumno.setApellido(alumnoModif.getApellido());
            alumno.setDocumento((alumnoModif.getDocumento()));
            alumno.setTipo_documento((alumnoModif.getTipo_documento()));
            alumno.setAula(alumnoModif.getAula());

            alumnoRepository.save(alumno);
            return ResponseEntity.ok().build();
        }

    }

    @DeleteMapping("/eliminar-alumno/{id}")
    public ResponseEntity<Void> deleteAlumno(@PathVariable int id) {
        try {
            alumnoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/agregar-justificacion")
    public void agregarJustificacionAsistencia(@RequestParam String descripcion,
                                               @RequestParam(required = false) MultipartFile archivo,
                                               @RequestParam String asistencia) throws IOException {

        Asistencia asistenciaObj = new ObjectMapper().readValue(asistencia, Asistencia.class);

        Justificacion justificacion = justificacionRepository.findJustificacionByAsistenciaId(asistenciaObj.getId());

        if (justificacion != null){
            justificacion.setJustificacion(descripcion);
            if (archivo != null) {
                justificacion.setArchivo(archivo.getBytes());
            }
            justificacion.setAsistencia(asistenciaObj);
            justificacionRepository.save(justificacion);
        } else {
            justificacion = new Justificacion();
            justificacion.setJustificacion(descripcion);
            if (archivo != null) {
                justificacion.setArchivo(archivo.getBytes());
            }
            justificacion.setAsistencia(asistenciaObj);
            justificacionRepository.save(justificacion);
        }
    }


    @GetMapping("/asistencias")
    public List<Asistencia> getAsistenciasAll(){return asistenciaRepository.findAll();}

    @GetMapping("/asistencias-por-curso")
    public Page<Asistencia> getAsistenciasPorCurso(@RequestParam Integer pageNumber,
                                                   @RequestParam Integer pageSize,
                                                   @RequestParam Integer aulaId,
                                                   @RequestParam Integer especialidadId){
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return asistenciaRepository.findAsistenciaByAulaIdAndEspecialidadId(aulaId, especialidadId, pageable);
    }

    @GetMapping("/asistencias-pdf")
    public ResponseEntity<byte[]> getAsistenciasPdf(
                                                    @RequestParam Integer aulaId,
                                                    @RequestParam Integer especialidadId) throws JRException, IOException {
        byte[] pdfData = reportService.generarAsistenciasPdfService(aulaId, especialidadId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.builder("inline").filename("Asistencias.pdf").build());

        return new ResponseEntity<>(pdfData, headers, HttpStatus.OK);
    }
    @GetMapping("/justificacion")
    public ResponseEntity<Justificacion> getJustificacionPorIdAsistencia(@RequestParam Integer idAsistencia){
        Justificacion justificacion = justificacionRepository.findJustificacionByAsistenciaId(idAsistencia);
        if (justificacion != null){
        return ResponseEntity.ok(justificacion);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/aulas")
    public List<Aula> getAulasList(){return aulaRepository.findAll();}

    @GetMapping("/especialidades")
    public List<Especialidad> getEspecialidadesList(){return especialidadRepository.findAll();}

    @GetMapping("/traer-materias")
    public List<Materia> getMaterias(){return materiaRepository.findAll();}



    }


