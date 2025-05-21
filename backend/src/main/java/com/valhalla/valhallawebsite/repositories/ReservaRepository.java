package com.valhalla.valhallawebsite.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.valhalla.valhallawebsite.models.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    Optional<Reserva> findByUsuarioIdAndClaseId(Long usuarioId, Long claseId); // Encuentra una reserva por el ID del usuario y el ID de la clase 
    // (Se usa por ejemplo para comprobar si un usuario ya tiene una reserva en una clase)

    List<Reserva> findByUsuarioId(Long usuarioId);
}