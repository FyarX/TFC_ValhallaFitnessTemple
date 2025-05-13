package com.valhalla.valhallawebsite.controllers;
import com.valhalla.valhallawebsite.dto.RegisterRequest;
import com.valhalla.valhallawebsite.models.Usuario;
import com.valhalla.valhallawebsite.repositories.UserRepository;
import io.swagger.v3.oas.annotations.Operation;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;

    
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Operation(summary = "Registrar un nuevo usuario")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Error: ¡El email ya está en uso!"));
        }

        Usuario user = new Usuario();
        user.setNombre(request.getNombre());
        user.setApellidos(request.getApellidos());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setTelefono(request.getTelefono());
        user.setDni(request.getDni());
        user.setRol(request.getRol());

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Usuario registrado con éxito"));
    }
}
