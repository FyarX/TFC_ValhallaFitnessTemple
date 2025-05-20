package com.valhalla.valhallawebsite.controllers;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.valhalla.valhallawebsite.models.Clase;
import com.valhalla.valhallawebsite.models.Reserva;
import com.valhalla.valhallawebsite.models.Usuario;
import com.valhalla.valhallawebsite.repositories.ClaseRepository;
import com.valhalla.valhallawebsite.repositories.ReservaRepository;
import com.valhalla.valhallawebsite.repositories.UserRepository;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservaController {
    private final ReservaRepository reservaRepository;
    private final UserRepository usuarioRepository;
    private final ClaseRepository claseRepository;

    public ReservaController(ReservaRepository reservaRepository, UserRepository usuarioRepository, ClaseRepository claseRepository) {
        this.reservaRepository = reservaRepository;
        this.usuarioRepository = usuarioRepository;
        this.claseRepository = claseRepository;
    }

    @PostMapping
    public ResponseEntity<Reserva> reservar(@RequestParam Long usuarioId, @RequestParam Long claseId) {
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
        Optional<Clase> clase = claseRepository.findById(claseId);

        if (usuario.isEmpty() || clase.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario.get());
        reserva.setClase(clase.get());
        reserva.setFecha(Timestamp.from(Instant.now()));

        Reserva saved = reservaRepository.save(reserva);
        return ResponseEntity.ok(saved);
    }
}
