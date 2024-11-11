1. [x] Refactorizar la respuesta de la ruta /upload en backend para que devuelva la siguiente estructura:

```json
{
  "ok": true,
  "data": {
    "success": [
      {
        "id": 1,
        "name": "Juan Perez",
        "email": "juan.perez@example.com",
        "age": 28
      }
      // Otros registros exitosos...
    ],
    "errors": [
      {
        "row": 4,
        "details": {
          "name": "El campo 'name' no puede estar vacío.",
          "email": "El formato del campo 'email' es inválido.",
          "age": "El campo 'age' debe ser un número positivo."
        }
      }
      // Otros registros con errores...
    ]
  }
}
```

2. [x] Crear la página para ver los registros exitosos y los registros con errores en frontend.

3. [] Testing en general.

4. [] Documentación.
   Subir el código fuente a un repositorio Git, incluyendo un `README.md` con instrucciones detalladas de instalación, configuración de la base de datos, y cómo ejecutar la aplicación.

   El `README.md` también deberá incluir las URL públicas donde se encuentren deployadas las aplicaciones.
