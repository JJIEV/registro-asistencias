package com.mifacturaportal.domain.registro;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Asistencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date fecha;
    private String asistencia;

    @ManyToOne
    @JoinColumn(name = "id_aula_materia")
    private AulaMateria aulaMateria;

    @ManyToOne
    @JoinColumn(name = "id_alumno")
    private Alumno alumno;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getAsistencia() {
        return asistencia;
    }

    public void setAsistencia(String asistencia) {
        this.asistencia = asistencia;
    }

    public AulaMateria getAulaMateria() {
        return aulaMateria;
    }

    public void setAulaMateria(AulaMateria aulaMateria) {
        this.aulaMateria = aulaMateria;
    }

    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }
}
