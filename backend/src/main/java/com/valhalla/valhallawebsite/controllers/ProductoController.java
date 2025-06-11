package com.valhalla.valhallawebsite.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.valhalla.valhallawebsite.models.Producto;
import com.valhalla.valhallawebsite.repositories.ProductoRepository;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "https://papayawhip-mandrill-804851.hostingersite.com/")
public class ProductoController {

    private final ProductoRepository repo;
    private final Cloudinary cloudinary;

    public ProductoController(ProductoRepository repo, Cloudinary cloudinary) {
        this.repo = repo;
        this.cloudinary = cloudinary;
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

            // Subir imagen a Cloudinary
            Map uploadResult = cloudinary.uploader().upload(imagenFile.getBytes(), Map.of());

            // Obtener URL segura
            String imageUrl = (String) uploadResult.get("secure_url");

            Producto nuevoProducto = new Producto();
            nuevoProducto.setNombre(nombre);
            nuevoProducto.setCategoria(categoria);
            nuevoProducto.setPrecio(precio);
            nuevoProducto.setStock(stock);
            nuevoProducto.setImagen(imageUrl);

            repo.save(nuevoProducto);

            return ResponseEntity.ok(Map.of("mensaje", "Producto guardado correctamente"));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Error al subir la imagen a Cloudinary"));
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
