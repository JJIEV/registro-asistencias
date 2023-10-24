package com.mifacturaportal.dao;

import com.mifacturaportal.domain.registro.Alumno;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Integer> {


    @Query("SELECT a FROM Alumno a WHERE :aulaId is null or a.aula.id = :aulaId ")
    public List<Alumno> findAlumnosByAulaId(int aulaId);

    @Query("SELECT a FROM Alumno a")
    public Page<Alumno> findAlumnosPaginados(Pageable pageable);
}
