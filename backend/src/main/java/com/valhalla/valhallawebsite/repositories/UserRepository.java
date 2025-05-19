package com.valhalla.valhallawebsite.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.valhalla.valhallawebsite.models.Usuario;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Usuario, Long> {
    boolean existsByEmail(String email);
    Optional<Usuario> findByEmail(String email);
}
