<h1 align="center">
  <a href="https://github.com/GITHUB_USERNAME/REPO_SLUG">
    <img src="https://firebasestorage.googleapis.com/v0/b/sala-medica.firebasestorage.app/o/caja-medica.png?alt=media&token=94721211-7ae3-4289-9b67-083398f8e525" alt="Logo" width="100" height="100">
  </a>
</h1>

<div align="center">
  SALA MEDICA
  
  <br />
 
  <br />
  
</div>

<div align="center">
<br />


</div>

<details open="open">
<summary>Tabla de Contenidos</summary>

  - [Sobre / About](#sobre--about)
  - [Características / Features](#características--features)
- [Capturas de Pantalla / Screenshots](#capturas-de-pantalla--screenshots)
- [Empezando / Getting Started](#empezando--getting-started)
  - [Hecho con / Built With](#hecho-con--built-with)
  - [Instalación / Installation](#instalación--installation)
  - [Deploy](#deploy)
- [Contribuciones / Contributing](#contribuciones--contributing)
- [Autores y contribuyentes / Authors & contributors](#autores-y-contribuyentes--authors--contributors)
- [Licencia / License](#licencia--license)
- [Reconocimientos / Acknowledgments](#reconocimientos--acknowledgments)
  


</details>

---

## Sobre / About
> Este proyecto es un sistema de gestión para una clínica desarrollado en Angular. Permite el registro, administración de usuarios, gestión de turnos y almacenamiento de historias clínicas, entre otras funcionalidades. La aplicación está optimizada para una experiencia fluida y cuenta con validaciones, animaciones y generación de informes.



---

## Características / Features

### [Página de Bienvenida](#página-de-bienvenida)
- Acceso al [Login](#login) y [Registro](#registro-de-usuarios).

### [Registro de Usuarios](#registro-de-usuarios)
- **Pacientes:**
  - Nombre, Apellido, Edad, DNI, Obra Social, Mail, Contraseña.
  - Subida de 2 imágenes para el perfil.
- **Especialistas:**
  - Nombre, Apellido, Edad, DNI, Especialidad (selección o creación), Mail, Contraseña.
  - Imagen de perfil.
- **Administradores:**
  - Nombre, Apellido, Edad, DNI, Mail, Contraseña, Imagen de perfil.
- Validaciones en los formularios.
- Registro de usuarios con Firebase Authentication.

### [Login](#login)
- Acceso al sistema con verificación de email.
- Botones de acceso rápido.
- Solo los especialistas aprobados por un administrador pueden ingresar.

### [Administración de Usuarios](#administración-de-usuarios)
- Acceso exclusivo para administradores.
- Habilitación/Inhabilitación de especialistas.
- Creación de nuevos usuarios.
- Administración de datos en Firestore.

### [Gestión de Turnos](#gestión-de-turnos)
- **Pacientes:**
  - Visualización de turnos solicitados con filtros por especialidad y especialista.
  - Cancelación de turnos con comentario.
  - Visualización de reseñas y encuestas.
  - Calificación de la atención recibida.
- **Especialistas:**
  - Visualización de turnos asignados con filtros.
  - Aceptación, rechazo o cancelación de turnos.
  - Finalización de turnos con diagnóstico y reseña.
- **Administrador:**
  - Visualización de todos los turnos con filtros.
  - Cancelación de turnos con comentario.
- **Solicitud de Turno:**
  - Pacientes y Administradores pueden solicitar turnos.
  - Selección de especialidad, especialista, día y horario.
  - Disponibilidad basada en la agenda del especialista.

### [Mi Perfil](#mi-perfil)
- Visualización y edición de datos personales.
- **Especialistas:** Gestión de disponibilidad horaria.

### [Historia Clínica](#historia-clínica)
- **Disponible para:**
  - Pacientes en su perfil.
  - Administradores en la sección de usuarios.
  - Especialistas que han atendido al paciente al menos una vez.
- **Datos registrados:**
  - Fijos: Altura, Peso, Temperatura, Presión.
  - Dinámicos: Clave-Valor (hasta 3 datos adicionales).
  - Datos adicionales con controles específicos:
    - Rango (0-100), cuadro numérico y switch (Sí/No).

### [Reportes y Estadísticas](#reportes-y-estadísticas)
- **Para Administradores:**
  - Log de ingresos al sistema.
  - Cantidad de turnos por especialidad y día.
  - Turnos solicitados y finalizados por médico en un período.
  - Exportación de informes en Excel o PDF.

### [Filtros Avanzados](#filtros-avanzados)
- Búsqueda en turnos por cualquier campo, incluyendo historia clínica.

---
## Capturas de Pantalla / Screenshots
<br>


|                        Turnos                             |    
| :-------------------------------------------------------------------:       | 
| <img src="https://firebasestorage.googleapis.com/v0/b/sala-medica.firebasestorage.app/o/capturasPantalla%2FScreenshot%202024-11-12%20at%2000-22-32%20PrimerParcialDeCastroJonathan.png?alt=media&token=f6715ffb-64a8-4c6f-932d-4f0a651f1b11" title="Turnos" width="100%">  | 
|                        Solicitudes de turnos sencilla donde el paciente podrá registrar su turno en la agenda del especialista que quiera                             |    


|                           Usuarios                 |                                                     
|  :-------------------------------------------------------------------:      
| <img src="https://firebasestorage.googleapis.com/v0/b/sala-medica.firebasestorage.app/o/capturasPantalla%2FScreenshot%202024-11-12%20at%2000-20-39%20PrimerParcialDeCastroJonathan.png?alt=media&token=7aaa828f-c305-4f00-9681-565b6007e187" title="Calculator" width="100%">    |
|                        Perfiles de los usuarios con la información mas importante                             |    

|                        Inicio de Sesion                             |    
| :-------------------------------------------------------------------:       | 
|<img src="https://firebasestorage.googleapis.com/v0/b/sala-medica.firebasestorage.app/o/capturasPantalla%2FScreenshot%202024-11-12%20at%2000-19-20%20PrimerParcialDeCastroJonathan.png?alt=media&token=a35e86ba-abd9-469c-842f-f54cacedde16" title="Inicio sesion" width="100%">       | 
|                        Inicio de sesión sencillo                             |    

|                        Registro de Agendas                             |    
| :-------------------------------------------------------------------:       | 
|<img src="https://firebasestorage.googleapis.com/v0/b/sala-medica.firebasestorage.app/o/capturasPantalla%2FScreenshot%202024-11-12%20at%2013-04-16%20PrimerParcialDeCastroJonathan.png?alt=media&token=cf7f7f9b-99b5-43ad-b625-42e0287dc1a9" title="Inicio sesion" width="100%">       | 
|                        Registro de agendas por especialista                             |    


</details>
---

## Empezando / Getting Started


### Hecho con / Built With
- **Angular 18**
- **Firebase Authentication y Firestore** para autenticación y almacenamiento de datos.
- **Angular Material para la interfaz de usuario.
- **ExcelJS y jsPDF** para generación de reportes.

---

### Instalación / Installation
1. Clonar el repositorio:
   ```sh
   git clone <URL_DEL_REPO>
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Ejecutar el servidor de desarrollo:
   ```sh
   ng serve
   ```
4. Acceder a la aplicación en: `http://localhost:4200/`

---

## Deploy
La aplicación está desplegada en línea y accesible en: `<https://sala-medica.web.app>`.

---

## Contribuciones / Contributing

Si deseas contribuir, por favor revisa las [pautas de contribución](docs/CONTRIBUTING.md). Cualquier tipo de aporte es **bienvenido**.

---

## Autores y contribuyentes / Authors & contributors

El desarrollo de esta API fue realizado por [Tu Nombre](https://github.com/TU_GITHUB).

Lista de [contribuyentes](https://github.com/GITHUB_USERNAME/REPO_SLUG/contributors).

---

## Licencia / License

Este proyecto está autorizado bajo la **Licencia MIT**.

Consulta [LICENCIA](LICENSE) para obtener más información.

---

## Reconocimientos / Acknowledgments

Agradecimientos a todas las herramientas y tecnologías utilizadas en el desarrollo de esta API.



