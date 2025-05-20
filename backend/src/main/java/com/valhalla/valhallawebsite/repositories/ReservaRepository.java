package com.valhalla.valhallawebsite.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.valhalla.valhallawebsite.models.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
}