package com.valhalla.valhallawebsite.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.valhalla.valhallawebsite.models.Clase;

@Repository
public interface ClaseRepository extends JpaRepository<Clase, Long> {
}
