package com.mifacturaportal.dao;

import com.mifacturaportal.domain.registro.Alumno;
import com.mifacturaportal.domain.registro.Justificacion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface JustificacionRepository extends JpaRepository<Justificacion, Integer> {

    @Query("SELECT j FROM Justificacion j WHERE :idAsistencia is null or j.asistencia.id = :idAsistencia")
    public Justificacion findJustificacionByAsistenciaId(Integer idAsistencia);

    @Query("SELECT j FROM Justificacion j")
    public Page<Justificacion> findJustificacionPaginados(Pageable pageable);
}
