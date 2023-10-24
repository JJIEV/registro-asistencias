package com.mifacturaportal.dao;

import com.mifacturaportal.domain.registro.Asistencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Integer> {

    @Query("SELECT a FROM Asistencia a WHERE (:aulaId is null or  a.aulaMateria.aula.id = :aulaId) AND (:especialidadId is null or a.aulaMateria.aula.especialidad.id = :especialidadId)")
    public Page<Asistencia> findAsistenciaByAulaIdAndEspecialidadId(Integer aulaId, Integer especialidadId, Pageable pageable);
}
