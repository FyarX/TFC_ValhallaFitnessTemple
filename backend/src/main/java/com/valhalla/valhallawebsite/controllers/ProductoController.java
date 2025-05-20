package com.valhalla.valhallawebsite.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.valhalla.valhallawebsite.models.Producto;
import com.valhalla.valhallawebsite.repositories.ProductoRepository;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    private final ProductoRepository repo;

    public ProductoController(ProductoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Producto> getAllProductos() {
        return repo.findAll();
    }

    @PostMapping
    public Producto createProducto(@RequestBody Producto producto) {
        return repo.save(producto);
    }

    @PutMapping("/{id}")
    public Producto updateProducto(@PathVariable Long id, @RequestBody Producto producto) {
        if (repo.existsById(id)) {
            producto.setId(id);
            return repo.save(producto);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
        }
    }
}
