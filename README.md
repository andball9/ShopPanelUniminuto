# Gestion de Usuarios con React y JSON Server

Proyecto academico desarrollado con React + Vite para simular el consumo de una API REST de usuarios.

La aplicacion permite:

- Listar usuarios con peticion `GET`
- Crear usuarios con peticion `POST`
- Eliminar usuarios con peticion `DELETE`
- Manejar estado local con `useState`
- Mostrar errores y mensajes de exito en la interfaz
- Documentar la API con Swagger mediante `openapi.yaml`

## Tecnologias usadas

- React
- Vite
- Bootstrap
- JSON Server
- Fetch API
- Swagger / OpenAPI

## Instalacion

```bash
npm install
```

## Ejecucion

1. Iniciar la API simulada:

```bash
npm run api
```

2. En otra terminal, iniciar el front-end:

```bash
npm run dev
```

3. Abrir la aplicacion en:

```text
http://localhost:5173
```

4. La API estara disponible en:

```text
http://localhost:3001/users
```

## Scripts

- `npm run dev`: inicia Vite
- `npm run build`: genera el build de produccion
- `npm run lint`: ejecuta ESLint
- `npm run api`: inicia JSON Server con `db.json`

## Estructura del proyecto

```text
src/
  components/
  services/
  App.jsx
docs/
  openapi.yaml
db.json
```

## Documentacion Swagger

El archivo `docs/openapi.yaml` describe:

- servidor local
- endpoint `/users`
- metodos `GET` y `POST`
- endpoint `/users/{id}`
- metodo `DELETE`

Este archivo se puede abrir y visualizar en Swagger Editor.

## Capturas sugeridas para la entrega

- Pantalla principal con el listado de usuarios
- Formulario de creacion de usuarios
- Eliminacion de un usuario
- Visualizacion de `openapi.yaml` en Swagger Editor
