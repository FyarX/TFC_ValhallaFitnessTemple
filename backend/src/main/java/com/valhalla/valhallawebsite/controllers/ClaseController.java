package com.valhalla.valhallawebsite.controllers;

import com.valhalla.valhallawebsite.models.Clase;
import com.valhalla.valhallawebsite.repositories.ClaseRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;
import java.sql.Timestamp;

@CrossOrigin(origins = "https://papayawhip-mandrill-804851.hostingersite.com/") // para evitar problemas de CORS
@RestController
@RequestMapping("/api/clases") 
public class ClaseController {

    private final ClaseRepository claseRepository;

    public ClaseController(ClaseRepository claseRepository) {
        this.claseRepository = claseRepository;
    }

    @GetMapping
    public List<Clase> getAllClases() {
        return claseRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> crearClase(
    @RequestParam("nombre") String nombre,
    @RequestParam("sala") String sala,
    @RequestParam("fecha") String fechaStr
) {
    LocalDateTime fecha;
    try {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
        fecha = LocalDateTime.parse(fechaStr, formatter);
    } catch (DateTimeParseException e) {
        return ResponseEntity.badRequest().body("Formato de fecha inválido");
    }

    Clase nuevaClase = new Clase();
    nuevaClase.setNombre(nombre);
    nuevaClase.setSala(sala);
    nuevaClase.setFecha(Timestamp.valueOf(fecha));

    claseRepository.save(nuevaClase);

    return ResponseEntity.ok(Map.of("mensaje", "Clase guardada correctamente"));
}
}