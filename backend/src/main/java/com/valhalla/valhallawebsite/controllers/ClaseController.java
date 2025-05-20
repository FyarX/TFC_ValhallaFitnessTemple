package com.valhalla.valhallawebsite.controllers;

import com.valhalla.valhallawebsite.models.Clase;
import com.valhalla.valhallawebsite.repositories.ClaseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // para evitar problemas de CORS
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
}