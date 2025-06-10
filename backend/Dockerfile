# Etapa 1: Construcción
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Copiar archivos individuales
COPY gradlew .
COPY build.gradle .
COPY settings.gradle .

# Copiar carpetas necesarias
COPY gradle/ gradle/
COPY src/ src/

# Dar permisos al wrapper y construir
RUN chmod +x gradlew
RUN ./gradlew build -x test --stacktrace --info

# Etapa 2: Ejecución
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
