# Guía de Instalación del Proyecto

Este documento proporciona pasos detallados para configurar y ejecutar el proyecto en un entorno de desarrollo en otra computadora.

## Requisitos Previos

Asegúrate de tener instalados las siguientes tecnologías antes de comenzar:

- [Node.js](https://nodejs.org/en/) (versión 18 o superior) se recomienda usar [nvm]() y la version 20.14.0 de node
- [npm](https://www.npmjs.com/) (viene incluido con Node.js) ó [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/) u otro sistema de base de datos si aplica

## Pasos de Instalación

1. **Clonar el Repositorio**

   Abre tu terminal y ejecuta:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```

2. **Instalar Dependencias**

   Cambia al directorio del proyecto:

   ```bash
   cd tu-repositorio
   ```

   Instala las dependencias del proyecto:

   ```bash
   npm install # o pnpm install
   npm run install:dev # o pnpm run install:dev
   ```

3. **Configurar Variables de Entorno**

   Crea un archivo `.env` en las carpetas backend y frontend y copia el contenido del archivo `.env.example` respectivamente en cada carpeta.:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

   Abre el archivo `.env` y configura las variables de entorno según tu entorno de desarrollo.

4. **Ejecutar Migraciones**

   Ejecuta las migraciones para crear las tablas en la base de datos:

   ```bash
   npm run migrate:dev # o pnpm run migrate:dev
   ```

5. **Ejecuta el Seeder**

   Ejecuta el seeder para insertar datos de prueba en la base de datos:

   ```bash
   npm run seed:dev # o pnpm run seed:dev
   ```

   Si en algún momento deseas resetear la base de datos, puedes ejecutar el siguiente comando:

   ```bash
    npm run migrate:reset # o pnpm run migrate:reset // Este comando elimina todas las tablas de la base de datos y las vuelve a crear junto con el seeder.
   ```

6. **Ejecutar el Proyecto**

   Para ejecutar el proyecto, puedes iniciar ambos servidores a la vez con el siguiente comando.

   ```bash
   npm run dev # o pnpm run dev
   ```

   Si deseas iniciar los servidores por separado, puedes hacerlo de la siguiente manera:

   Inicia el servidor backend:

   ```bash
   npm run dev:backend # o pnpm run dev:backend
   ```

   Levanta el servidor backend en el puerto 5500 y puedes acceder a el con `http://localhost:5500`.

   Inicia el servidor frontend en otra terminal:

   ```bash
   npm run dev:frontend # o pnpm run dev:frontend
   ```

   Levanta el servidor frontend en el puerto 4173 y puedes acceder a el con `http://localhost:4173`.

Dentro de este repositorio se encuentra un archivo llamado insomia.json que puedes importar en Insomnia para probar las rutas de la API.
