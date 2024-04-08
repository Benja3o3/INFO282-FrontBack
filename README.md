# Despliegue Backend

## Despliegue de barometro de bienestar

> Para desplegar el backed del sistema, se debe tener instalado docker con las imagenes de "Postgress" y "pgadmin"

En consola dentro de la carpeta Backend se debe iniciar con

Develop:

```bash
    docker-compose up --build
```

Deploy:

```bash
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

En el contenedor del backend, en la consola del cron (deamon) ejecutar

```bash
    python3 main.py
```

Para que se inicialicen los valores

## Visualización de base de datos mediante PGADMIN4

Se debe ingresar al navegador mediante el url

```web
    localhost: **3380** {puertos pgadmin}
```

Una vez ingresado, se pediran las credenciales, en este caso siendo.

```
 Correo: **Admin@admin**

 Passwoord: **admin**
```

## Vinculación PGADMIN DB

Para vincular la base de datos en PGADMIN se debe hacer click derecho en servidor, para luego presionar register server.

```
>>  **General**

    Name: { El de su preferencia }

>>   **Connection**

    Host_name: **databases** { O el nombre que tenga el contenedor de la base de datos a ingresar }

    Port: **5542** { Puerto de la base de datos }
```

## Para FTP

Descargar FILEZILLA y hacer conexion rapida a localhost con los
siguientes datos

```
    Servidor:       localhost
    nombreusuario:  alpineftp
    contraseña:     alpineftp
    puerto:         21
```

# Despliegue Frontend

Ubicarse en la carpeta Frontend y ejecutar el despliegue en modo:

develop:

```
    docker-compose -f docker-compose.dev.yml up -d
```

deploy:

```
    docker-compose up -d
```

# Ejecucion de Tests

## Requisitos evaluados

**RF**. Como usuario quiero poder acceder a la información de los indicadores de una dimensión en específico.

**RNF**. El sistema debe ser capaz de soportar más de 10 usuarios de forma simultánea, manteniendo un tiempo de respuesta óptimo.

## Instrucciones de ejecución

### Softwares previos requeridos

-   Microsoft Edge / Firefox / Chrome
-   Docker
-   Node

### Requisitos previos a la ejecución

-   Debe tener el [repositorio](https://github.com/Benja3o3/INFO282-FrontBack) descargado en su sistema, en la rama /PanBenja.
-   Una vez descargado, debe seguir las instrucciones del README, para levantar el repositorio (tanto frontend como backend).
-   Ya levantado, se debe comprobar que en la variables de entorno de su sistema se encuentre el [engine de microsoft EDGE](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/?form=MA13LH) para la ejecución de los tests
-   Dentro de la carpeta del repositorio ejecutar el comando

```jsx
npm install
```

### Ejecución de los tests

-   Para ejecutar los tests debe de forma individual ejecutar estos comandos

RF:

```jsx
npm run testrf
```

RNF

```jsx
npm run testrnf
```

## Links

Repositorio:

[https://github.com/Benja3o3/INFO282-FrontBack](https://github.com/Benja3o3/INFO282-FrontBack)

Engine Microsoft Edge:

[https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/?form=MA13LH](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/?form=MA13LH)

Engine Chrome

[https://chromedriver.chromium.org/](https://chromedriver.chromium.org/)

Engine Mozilla
