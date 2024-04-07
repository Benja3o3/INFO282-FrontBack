# Despliegue

develop:

```
    docker-compose -f docker-compose.dev.yml up -d
```

deploy:

```
    docker-compose up -d
```

# Test

# Ejecución de Test Automatizado con Selenium y JavaScript

Este documento describe los pasos necesarios para ejecutar un test automatizado diseñado para probar la funcionalidad de exportación de datos de una aplicación web utilizando Selenium y JavaScript.

## Preparativos

1. Asegúrate de tener instalado Node.js en tu sistema. Puedes descargarlo desde [aquí](https://nodejs.org/es/).

2. Instala las dependencias necesarias ejecutando el siguiente comando en la terminal:

   ```bash
   npm install selenium-webdriver
   ```

3. Configura tu entorno de desarrollo para ejecutar el test automatizado. Esto puede implicar la configuración del navegador y las rutas de archivos necesarias para la descarga.

## Ejecución del Test

1. Abre tu editor de código o un terminal y copia el siguiente código JavaScript en un archivo con extensión `.js`, por ejemplo, `test.js`.

2. Abre una terminal y navega hasta la ruta src/test donde se encuentra el archivo `ExportData.test.js` y `LoadDataInIndicatorTable.test.js`.

3. Ejecuta el test automatizado ejecutando el siguiente comando:

   ```bash
   node ExportData.test.js
   ```

   ```bash
   node LoadDataInIndicatorTable.test.js
   ```

4. El test automatizado se ejecutará y proporcionará la salida correspondiente en la terminal, indicando si el test fue exitoso o si se encontraron errores durante la ejecución.

## Notas

- Asegúrate de que la URL proporcionada en el código JavaScript (`http://192.168.1.16:4001/`) sea la correcta y apunte a la aplicación web que deseas probar.

- Verifica que la ruta de descargas (`downloadsPath`) sea la correcta y coincida con la ubicación en la que se descarga el archivo en tu sistema.

- Antes de ejecutar el test, asegúrate de que la aplicación esté en ejecución y que el botón de exportación esté disponible en la página web.
