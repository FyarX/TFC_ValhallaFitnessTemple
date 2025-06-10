package com.valhalla.valhallawebsite.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.valhalla.valhallawebsite.models.Producto;
import com.valhalla.valhallawebsite.repositories.ProductoRepository;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "https://papayawhip-mandrill-804851.hostingersite.com/")
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
public ResponseEntity<?> createProducto(
        @RequestParam("nombre") String nombre,
        @RequestParam("categoria") String categoria,
        @RequestParam("precio") Double precio,
        @RequestParam("stock") Integer stock,
        @RequestParam("imagen") MultipartFile imagenFile) {

    try {
        if (imagenFile.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "La imagen está vacía"));
        }

        String nombreArchivo = UUID.randomUUID() + "_" + imagenFile.getOriginalFilename();
        Path rutaImagen = Paths.get("uploads/" + nombreArchivo);
        Files.createDirectories(rutaImagen.getParent());
        Files.copy(imagenFile.getInputStream(), rutaImagen, StandardCopyOption.REPLACE_EXISTING);

        Producto nuevoProducto = new Producto();
        nuevoProducto.setNombre(nombre);
        nuevoProducto.setCategoria(categoria);
        nuevoProducto.setPrecio(precio);
        nuevoProducto.setStock(stock);
        nuevoProducto.setImagen("/uploads/" + nombreArchivo);

        repo.save(nuevoProducto);

        return ResponseEntity.ok(Map.of("mensaje", "Producto guardado correctamente"));
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(Map.of("error", "Error al guardar la imagen"));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(Map.of("error", "Error al crear el producto: " + e.getMessage()));
    }
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
