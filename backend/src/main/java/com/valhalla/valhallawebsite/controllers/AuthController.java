package com.valhalla.valhallawebsite.controllers;
import com.valhalla.valhallawebsite.dto.RegisterRequest;
import com.valhalla.valhallawebsite.models.Usuario;
import com.valhalla.valhallawebsite.repositories.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "Controlador de autenticación")
public class AuthController {
    private final UserRepository userRepository;

    
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Operation(summary = "Registrar un nuevo usuario")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Error: ¡El email ya está en uso!");
        }

        Usuario user = new Usuario();
        user.setNombre(request.getNombre());
        user.setApellidos(request.getApellidos());
        user.setEmail(request.getEmail());
        user.setDni(request.getDni());
        user.setRol(request.getRol());
        user.setImagen(request.getImagen());
        user.setCep(request.getCep());

        userRepository.save(user);

        return ResponseEntity.ok("Usuario registrado con éxito");
    }
}
