package com.valhalla.valhallawebsite.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.valhalla.valhallawebsite.models.Clase;
import com.valhalla.valhallawebsite.repositories.ClaseRepository;

@RestController
@RequestMapping("/api/clases")
@CrossOrigin(origins = "http://localhost:4200")
public class ClaseController {

    private final ClaseRepository claseRepository;

    public ClaseController(ClaseRepository claseRepository) {
        this.claseRepository = claseRepository;
    }

    @GetMapping
    public List<Clase> obtenerClases() {
        return claseRepository.findAll();
    }
}