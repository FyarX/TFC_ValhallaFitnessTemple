package com.valhalla.valhallawebsite.models;

import jakarta.persistence.Entity;

@Entity
public class Usuario {
    private String nombre;
    private String apellidos;
    private String email;
    private String dni;
    private String rol;
    private String imagen;
    private String cep;
    private Long id;    
}
