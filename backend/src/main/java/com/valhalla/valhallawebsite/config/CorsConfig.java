package com.valhalla.valhallawebsite.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // aplica a todas las rutas
                        .allowedOrigins("https://papayawhip-mandrill-804851.hostingersite.com/") // frontend Angular local
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }
}
