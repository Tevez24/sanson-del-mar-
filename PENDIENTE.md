# Tareas Realizadas y Estado del Proyecto (18/07/2024)

## 1. Configuración del Entorno (¡Solucionado!)

- Se creó un entorno virtual de Python compatible con Windows llamado `restaurante_entorno`.
- Se generó un archivo `requirements.txt` que contiene todas las librerías necesarias (Django, Pillow, etc.).
- **Para volver a trabajar:**
    1. Abre la terminal en la carpeta raíz `sanson-del-mar-`.
    2. Activa el entorno con: `restaurante_entorno\Scripts\activate`
    3. Ejecuta el servidor con: `python restaurante_project\manage.py runserver`

## 2. Base de Datos y Modelos (Django)

- Se definieron los modelos de la base de datos en `restaurante_app/models.py`:
    - `Plato`: Para los platos del menú (nombre, descripción, precio, categoría, imagen).
    - `Pedido`: Para registrar los pedidos de los clientes.
    - `DetallePedido`: El contenido de cada pedido (qué platos y qué cantidad).
    - `Reservation`: Para gestionar las reservas de mesas.
- Se aplicaron los cambios a la base de datos con `makemigrations` y `migrate`.

## 3. Panel de Administración de Django

- Se configuró `restaurante_app/admin.py` para que puedas gestionar los `Platos`, `Pedidos` y `Reservations` desde el panel de administrador (`/admin`).
- Esto te permite añadir nuevos platos al menú, ver los pedidos que se hacen y administrar las reservas fácilmente.

## 4. Interfaz de Usuario y Diseño

- Se crearon las plantillas HTML principales en `restaurante_app/templates/restaurante_app/`:
    - `inicio.html`: La página de bienvenida.
    - `menu.html`: La página que muestra el menú completo y el carrito de compras.
    - `reserva.html`: El formulario para hacer una reserva.
- Se añadieron estilos CSS (`estilos.css`) y se configuró Tailwind CSS para dar un diseño moderno y responsivo.
- Se añadió interactividad con JavaScript (`menu.js`) para el carrito de compras.

## 5. Subida a GitHub

- Se guardó todo el progreso en tu repositorio de GitHub.
- Se configuró el archivo `.gitignore` para ignorar la carpeta `restaurante_entorno`, lo cual es una buena práctica.
