# Respaldo Automatizado de Bases de Datos MySQL con Node.js

Este proyecto proporciona un script en Node.js para realizar respaldos automáticos de todas las bases de datos MySQL en un solo archivo `.sql`.

## Configuración

### Paso 1: Crear un archivo de opciones de MySQL

Para evitar advertencias de seguridad relacionadas con el uso de contraseñas en la línea de comandos, crea un archivo de opciones de MySQL que almacene tus credenciales de forma segura.

1. Crea un archivo llamado `.my.cnf` en tu directorio de usuario:

    ```bash
    nano ~/.my.cnf
    ```

2. Añade las siguientes líneas al archivo `.my.cnf` para almacenar tus credenciales de MySQL:

    ```ini
    [client]
    user=user
    password=password
    ```

3. Guarda el archivo y cierra el editor (`Ctrl+O` para guardar, `Enter` para confirmar y `Ctrl+X` para salir).

4. Asegúrate de que solo tu usuario tenga acceso al archivo para mejorar la seguridad:

    ```bash
    chmod 600 ~/.my.cnf
    ```

### Paso 2: Configurar el Script de Respaldo

El script de respaldo está configurado para usar `mysqldump` y crear un archivo de respaldo para todas las bases de datos.
mysqldump viene de donde se encuntra instalado mysql
