<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Visor de Mensajería</h3>

  <p align="center">
    Componente que permite visualizar los mensajes que lleguen de los eventos basados en la guía TEI a un servidor configurable 
    <br />
    <a href="https://interoperabilidad.minsal.cl/fhir/ig/tei/0.2.1/index.html"><strong>Guía TEI »</strong></a>
    <br />
    <br />
    <a href="https://github.com/cens-chile/visor-tei">Repositorio</a>
    &middot;
    <a href="https://github.com/cens-chile/visor-tei/issues/new?labels=bug&template=bug-report---.md">Reportar Bug</a>
    &middot;
    <a href="https://github.com/cens-chile/visor-tei/issues/new?labels=enhancement&template=feature-request---.md">Solicitar Funcionalidades</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de contenidos</summary>
  <ol>
    <li>
      <a href="#acerca-del-proyecto">Acerca del Proyecto</a>
      <ul>
        <li><a href="#construido-con">Desarrollado con</a></li>
      </ul>
    </li>
    <li>
      <a href="#como-empezar">Como Empezar</a>
      <ul>
        <li><a href="#requisitos-del-sistema-operativo">Requisitos del sistema operativo</a></li>
        <li><a href="#hardware-recomendado">Hardware recomendado</a></li>
        <li><a href="#prerrequisitos">Prerequisitos</a></li>
        <li><a href="#instalación">Instalación</a></li>
        <li><a href="#desarrollo">Desarrollo</a></li>
      </ul>
    </li>
    <li>
      <a href="#uso">Uso</a>
      <ul>
        <li><a href="#funcionalidades">Funcionalidades</a></li>
      </ul>
    </li>
    <li><a href="#contribuir">Contribuir</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#contacto">Contacto</a></li>
    <li><a href="#agradecimientos">Agradecimientos</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Acerca del Proyecto

El sistema de salud en Chile se estructura en niveles (primario, secundario y terciario), 
siendo el nivel primario el con mayor despliegue en el territorio, con atenciones de menor complejidad
y la puerta de entrada a todas las atenciones de salud en la red pública de establecimientos. 
Para optar a una atención de especialidad, las personas deben ser derivadas desde la atención primaria 
a un centro de mayor complejidad, teniendo que esperar para recibir esta atención en el nivel secundario o terciario.

Las personas y tiempos que deben esperar para una atención de salud han sido y son una preocupación para todo el 
sistema sanitario.

Los sistemas que soportan actualmente la información de las personas y tiempos de espera por su estructura y forma
de operar, no permiten conocer la realidad de la situación, trazar al paciente y tampoco permite mantener informado
al paciente. Para mejorar la gestión de la red asistencial y la coordinación entre sus niveles, se requiere implementar
un proceso interoperable de solicitud de nueva consulta de especialidad desde APS a nivel secundario, para patologías
no adscritas a las garantías explícitas de salud (GES).

El componente de Mensajería en particular permite ejecutar el proceso de envío de los eventos, por medio de una API de envío y
consulta de estado de mensajes, los cuales pueden ser integrados con algun visor o consumidos directo desde algun servicio.
Cuenta con un proceso simple de gestión de errores y reintento de mensajes.

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>



### Construido con

* [![Git][Git-scm.com]][Git-url]
* [![React][React.js]][React-url]
* [![Chakra UI][Chakra.ui]][Chakra-url]
* [![TanStack Table][TanStack]][TanStack-url]
* [![Node.js][Node.js]][Node-url]




<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>



<!-- GETTING STARTED -->
## Como Empezar

Se necesita acceso a internet y tener previamente arriba la [API de mensajería](https://github.com/cens-chile/mensajeria-productor-tei/) 

### Requisitos del sistema operativo

* Windows 10 o superior
* Ubuntu 22.04 o superior.

### Hardware recomendado

* 8 GB de RAM (Considerando la API de mensajería)
* 20 GB o más de espacio de disco duro (Considerando la API de mensajería).

### Prerrequisitos

* [Instalación versión 20 o superior de Node](https://nodejs.org/es)
* [Instalación de Docker](https://docs.docker.com/desktop/setup/install/linux/)
* [Instalación de GIT](https://git-scm.com/downloads/linux)


### Instalación

1. Es recomendable tener instalado y corriendo la API antes de empezar a trabajar con este repositorio, para eso visite las [instrucciones de instalación API de mensajería](https://github.com/cens-chile/mensajeria-productor-tei/blob/main/README.md#instalaci%C3%B3n)

2. Clone el repositorio donde desee
```bash
cd directorioDeseado/
git clone https://github.com/cens-chile/visor-tei.git
```

3. Verifique la versión de Node sea la correcta (20.X o superior)
```bash
node -v
```
En caso de que la versión no sea la correcta, rectificar, ya que el proyecto no se podrá montar y se generarán errores de versión.

4. Ejecutar npm install para instalar dependencias
```bash
npm install
```

5. Crear archivo config.json en la carpeta config, con las siguientes variables
```bash
{
    "api_url": "http://0.0.0.0:8002/", 
    "defaultLimit": 200,
    "defaultOffset": 0
}
```
el **defaultLimit** y el **defaultOffset** definira la cantidad de mensajes que se reciban al pedir los mensajes a la API

### Desarrollo

* Ejecutar la versión en vivo
```bash
npm run dev
```
Esta quedará ejecutándose en http://localhost:5173/, siempre y cuando el puerto 5173 esté abierto, sino, lo cambiará automaticamente

* Recompilar cambios y reiniciar servicios

Los cambios se recompilan automáticamente, aunque en algunos casos, como después de importar algunos componentes, ese necesario una recarga de la página con F5 o _ctrl + shift + r_

<p align="right">(<a href="#readme-top">Volver al inicio</a>)</p>

<!-- USAGE EXAMPLES -->
## Uso

* Accedemos a http://localhost:5173/, que nos redirecciona a un login, en donde deberemos inicias sesión con las credenciales usuario: admin y password: admin

* Una vez loggeados, podremos ver los mensajes que llegan desde la API, buscarlos, filtrarlos y ordenarlos. Además, podremos ver las respuestas de estos, tanto en caso de éxito como de error.

### Funcionalidades

* Búsquedas generales cuando el filtro no está activado, por evento, origen del mensaje, software, estado. En el caso de las fechas es importante saber que se deben buscar con un formato específico: YYYY-MM-DDTHH:MM:SS (2025-07-07T15:30:00Z, por ejemplo)
* Al hacer click en el ícono de filtro (al lado de la barra de búsqueda), se muestra un select con los valores por los que se puede filtrar, este filtro se puede activar o desactivar. 
* Se pueden ordenar las tablas en orden ascendente o descendente, incluso cuando hay un filtro activado.
* Se pueden ver en un modal los mensajes de éxito o error.


<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>


<!-- Contribuir -->
## Contribuir

Toda contribución que hagas será agradecida

Si tienes alguna sugenrencia para hacer mejor este proyecto, por favor crea tu fork y crea un pull request. También puedes abrir un issue con el tag "mejora"
No olvides dar una estrella al proyecto! Gracias!

1. Crea un fork de este proyecto
2. Crea un branch para tu funcionalidad (`git checkout -b feature/AmazingFeature`)
3. Haz el Commit con tus cambios(`git commit -m 'Add: mi funcionalidad'`)
4. Sube tus cambios al repositorio (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Top contributors:

<a href="https://github.com/cens-chile/visor-tei/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=cens-chile/visor-tei" />
</a>

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>



<!-- LICENSE -->
## Licencia

Apache 2.0

Ver el archivo incluido `LICENSE` para detalles.

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>



<!-- CONTACT -->
## Contacto

Interoperabilidad - [@CENSChile](https://x.com/CENSChile) - interoperabilidad@cens.cl

Link al Proyecto: [https://github.com/cens-chile/visor-tei](https://github.com/cens-chile/visor-tei)

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Agradecimientos

* Equipo CENS

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/badge/MIT-LICENSE-green?style=for-the-badge
[license-url]: https://github.com/cens-chile/visor-tei/blob/master/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/cens-chile-red?style=for-the-badge&labelColor=blue
[linkedin-url]: https://www.linkedin.com/company/cens-chile/
[Git-scm.com]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com/
[Docker.com]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[React-url]: https://reactjs.org/
[React.js]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[Chakra-url]: https://chakra-ui.com/
[Chakra.ui]: https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakraui&logoColor=white
[TanStack-url]: https://tanstack.com/table
[TanStack]: https://img.shields.io/badge/TanStack_Table-EF4444?style=for-the-badge&logo=tablecheck&logoColor=white
[Node-url]: https://nodejs.org/
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white