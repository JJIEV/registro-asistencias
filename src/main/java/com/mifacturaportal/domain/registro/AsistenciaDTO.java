package com.mifacturaportal.domain.registro;

import java.util.Date;

public class AsistenciaDTO {
    private AulaMateria aulaMateria;

    private Aula aula;

    private Alumno alumno;
    private Date fecha;
    private String asistencia;

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

    public Aula getAula() {
        return aula;
    }

    public void setAula(Aula aula) {
        this.aula = aula;
    }
}

