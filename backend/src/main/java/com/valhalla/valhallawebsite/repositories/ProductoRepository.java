package com.valhalla.valhallawebsite.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.valhalla.valhallawebsite.models.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
