package com.valhalla.valhallawebsite.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.valhalla.valhallawebsite.models.Producto;

import com.valhalla.valhallawebsite.repositories.ProductoRepository;

@RestController
@RequestMapping("/api/productos") // URL de la API
@CrossOrigin(origins = "http://localhost:4200") // URL del frontend 
public class ProductoController {
    /**
     * Repositorio de productos
     */
    private final ProductoRepository repo;

    /**
     * Constructor
     * 
     * @param repo
     */
    public ProductoController(ProductoRepository repo) {
        this.repo = repo;
    }

    /**
     * Obtener todos los productos
     * 
     * @return List<Producto>
     */
    @GetMapping
    public List<Producto> getAllProductos() {
        return repo.findAll();
    }

    /**
     * Crear un nuevo producto
     * 
     * @param producto
     * @return Producto
     */
    @PostMapping
    public Producto createProducto(Producto producto) {
        return repo.save(producto);
    }

    /**
     * Actualizar un producto (Si no existe la id no se actualiza)
     * 
     * @param id
     * @param producto
     * @return Producto
     */
    @PutMapping("/{id}")
    public Producto updateProducto(Long id, Producto producto) {
        if (repo.existsById(id)) {
            producto.setId(id);
            return repo.save(producto);
        }
        return null;
    }

    /**
     * Borrar un producto (Se borra si existe la id)
     * 
     * @param id
     */
    @DeleteMapping("/{id}")
    public void deleteProducto(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
        }
    }
}