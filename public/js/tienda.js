// tienda.js
// Imports
import {Videojuego, Libro, Ropa, Electronica, Juguete} from './clases.js';
import * as funciones from './funciones.js'

// Variables globales para paginación
let currentPage = 1;
const productsPerPage = 9;
let listaActual = []; 

// Array de productos base y del carrito
let productos = [
    // Instancias de Videojuego 
    new Videojuego('Super Mario', 50, 'Super Mario es un ícono mundial del entretenimiento. En este juego, Mario, un fontanero con un inconfundible bigote, se embarca en una aventura épica a través de niveles llenos de enemigos, obstáculos y mundos vibrantes. La jugabilidad, combinada con una música inolvidable y gráficos coloridos, ha marcado generaciones y sigue siendo un referente en el género de plataformas. Su narrativa simple y su acción constante invitan a jugadores de todas las edades a disfrutar de una experiencia atemporal llena de desafíos y sorpresas.', 'imagenes/productos/videojuego/mario.jpg', 'Nintendo', 5),
    new Videojuego('The Legend of Zelda', 60, 'The Legend of Zelda es una saga legendaria que invita a explorar un mundo lleno de misterio, magia y aventuras épicas. En este título, Link debe embarcarse en una travesía por tierras encantadas, resolver acertijos ingeniosos y enfrentar a enemigos temibles para salvar el reino de Hyrule y rescatar a la princesa Zelda. La atmósfera, el diseño de los escenarios y la profundidad de la narrativa crean una experiencia inmersiva que combina acción, exploración y rompecabezas, convirtiéndolo en una obra maestra de la aventura.', 'imagenes/productos/videojuego/zelda.jpg', 'Nintendo', 4),
    new Videojuego('Call of Duty', 40, 'Call of Duty es un shooter en primera persona que ofrece una experiencia intensa y realista de combate moderno. Con misiones cargadas de adrenalina, escenarios detallados y una narrativa cinematográfica, el juego pone a prueba la estrategia y los reflejos del jugador en batallas militares contemporáneas. Su jugabilidad pulida y su modo multijugador lo han consolidado como uno de los referentes del género, ofreciendo acción y emoción en cada enfrentamiento.', 'imagenes/productos/videojuego/cod.jpg', 'Activision', 3),
  
    // Instancias de Libro 
    new Libro('Cien Años de Soledad', 20, 'Esta obra maestra del realismo mágico narra la saga de la familia Buendía a lo largo de generaciones en el mítico pueblo de Macondo. Con una prosa rica y simbólica, el libro explora temas universales como el amor, la soledad, el destino y la lucha contra el olvido, ofreciendo una experiencia literaria profunda y emocionalmente intensa que ha cautivado a lectores de todo el mundo.', 'imagenes/productos/libro/libro.jpg', 'Gabriel García Márquez', 3),
    new Libro('El Quijote', 25, 'El Quijote es una sátira brillante y trágica que sigue las aventuras de un caballero andante y su fiel escudero en una España llena de fantasía y realidad. Con humor, melancolía y un agudo sentido crítico, la obra explora la locura, la ilusión y la lucha por la dignidad, convirtiéndose en una pieza fundamental de la literatura universal.', 'imagenes/productos/libro/quijote.jpg', 'Miguel de Cervantes', 4),
    new Libro('1984', 18, '1984 es una distopía impactante que describe un futuro totalitario en el que el control social, la vigilancia constante y la manipulación de la información han aniquilado la libertad individual. Con una narrativa poderosa y perturbadora, la novela advierte sobre los peligros de la opresión política y la pérdida de la privacidad, marcando un antes y un después en la literatura moderna.', 'imagenes/productos/libro/1984.jpg', 'George Orwell',2),
  
    // Instancias de Ropa 
    new Ropa('Camiseta Deportiva', 15, 'Camiseta cómoda y ligera para el día a día.', 'imagenes/productos/ropa/camiseta.jpg', 'M', 3),
    new Ropa('Pantalón Vaquero', 30, 'Vaqueros de corte clásico y resistente.', 'imagenes/productos/ropa/vaquero.jpg', 'L', 2),
    new Ropa('Chaqueta de Invierno', 50, 'Chaqueta cálida y práctica para el frío.', 'imagenes/productos/ropa/chaqueta.jpg', 'XL', 4),
  
    // Instancias de Electronica 
    new Electronica('Smartphone X', 300, 'El Smartphone X combina tecnología de punta con un diseño elegante y funcional. Con una pantalla de alta resolución, múltiples cámaras avanzadas y un rendimiento excepcional, este dispositivo ofrece una experiencia multimedia inigualable y una conectividad de última generación. Ideal para profesionales y entusiastas, su batería de larga duración y su sistema operativo optimizado lo convierten en una herramienta indispensable.', 'imagenes/productos/electronica/smartphone.jpg', 'BrandX', 1),
    new Electronica('Laptop Pro', 800, 'La Laptop Pro es una máquina de alto rendimiento diseñada para profesionales exigentes. Con un procesador potente, gráficos avanzados y un diseño delgado y robusto, permite realizar tareas creativas y exigentes con total fluidez. Su amplia conectividad y batería de larga duración la hacen perfecta para trabajar en cualquier entorno, ofreciendo eficiencia y portabilidad.', 'imagenes/productos/electronica/laptop.jpg', 'TechBrand',5),
    new Electronica('Auriculares Bluetooth', 60, 'Estos auriculares Bluetooth ofrecen una calidad de sonido superior gracias a su tecnología de cancelación de ruido y diseño ergonómico. Con conectividad inalámbrica estable y una batería de larga duración, son ideales para disfrutar de la música y las llamadas sin cables, proporcionando una experiencia auditiva envolvente y cómoda.', 'imagenes/productos/electronica/auriculares.jpg', 'SoundMax',3),
  
    // Instancias de Juguete 
    new Juguete('Coche de Carreras', 25, 'Este coche de carreras a control remoto ofrece una experiencia emocionante y realista. Con un diseño aerodinámico y controles precisos, permite competir en pistas desafiantes y mejorar la coordinación. Su robustez, velocidad y batería de larga duración garantizan horas de diversión y competición para niños y jóvenes amantes de la velocidad.', 'imagenes/productos/juguete/coche.jpg', '5+', 5),
    new Juguete('Puzzle 100 Piezas', 15, 'Este puzzle de 100 piezas es un reto ideal para desarrollar la concentración y habilidades cognitivas. Cada pieza encaja perfectamente para revelar una imagen sorprendente, y su diseño atractivo lo convierte en una actividad lúdica y educativa que fascina tanto a niños como a adultos.', 'imagenes/productos/juguete/puzzle.jpg', '8+', 1),
    new Juguete('Lego Construcción', 30, 'El set de Lego Construcción ofrece una experiencia creativa sin límites, permitiendo construir diversas figuras y estructuras. Con piezas interconectables y diseños innovadores, este juguete fomenta la imaginación, el desarrollo de habilidades motoras y la resolución de problemas, proporcionando horas de entretenimiento y aprendizaje.', 'imagenes/productos/juguete/lego.jpg', '6+', 3)
  ];
  

let carrito = [];

function crearProducto(tipo, nombre, precio, descripcion, imagen, extra) {
  let nuevoProducto;
  switch(tipo) {
    case 'videojuego':
      nuevoProducto = new Videojuego(nombre, precio, descripcion, imagen, extra);
      break;
    case 'libro':
      nuevoProducto = new Libro(nombre, precio, descripcion, imagen, extra);
      break;
    case 'ropa':
      nuevoProducto = new Ropa(nombre, precio, descripcion, imagen, extra);
      break;
    case 'electronica':
      nuevoProducto = new Electronica(nombre, precio, descripcion, imagen, extra);
      break;
    case 'juguete':
      nuevoProducto = new Juguete(nombre, precio, descripcion, imagen, extra);
      break;
    default:
      return;
  }
  // Añadir el nuevo producto al array global
  productos.push(nuevoProducto);
  
  // Comprobar si el nuevo producto es más caro que el precio máximo actual y actualizarlo
  const precioMaxInput = document.getElementById('precioMax');
  const precioMaxVal = document.getElementById('precioMaxVal');
  const maxPriceActual = parseFloat(precioMaxInput.value);

  if (nuevoProducto.precio > maxPriceActual) {
      precioMaxInput.value = nuevoProducto.precio;
      precioMaxInput.setAttribute('max', nuevoProducto.precio);
  }
  
  // Actualizar la lista actual y volver a renderizar los productos
  listaActual = productos;
  mostrarProductos(productos);
}

function setListaActual(nuevaLista) {
  listaActual = nuevaLista;
}

function setCarrito(nuevoCarrito) {
  carrito = nuevoCarrito;
}

function setCurrentPage(pagina) {
  currentPage = pagina;
}

/**
 * Muestra los productos en el <main> utilizando tarjetas (cards) con paginación.
 * Se renderizan únicamente los productos correspondientes a la página actual.
 * Además, se actualiza el contenedor "paginacion-info" y se crean los controles de paginación.
 */
export function mostrarProductos(listaProductos) {
  // Actualizar la lista global actual
  listaActual = listaProductos;

  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = '';

  // Calcular paginación
  const totalProducts = listaProductos.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage); // Redondeo hacia arriba para páginas adicionales si hay resto.
  if (currentPage > totalPages) {
    currentPage = totalPages || 1;
  }
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productosPagina = listaProductos.slice(startIndex, endIndex);

  // Renderizar cada producto de la página actual
  productosPagina.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card rounded h-100 cart-item" style="height: 400px; position: relative;">
        <img src="${producto.imagen}" class="card-img-top rounded img-producto" 
             data-id="${producto.id}" alt="${producto.nombre}" style="cursor:pointer;">
        <button class="btn btn-light position-absolute rounded-circle p-0 btn-agregar-carrito" 
                data-id="${producto.id}" 
                style="top: 10px; right: 10px; width: 40px; height: 40px;">
          <img src="imagenes/cart.png" alt="Carrito" style="width:24px; height:24px; object-fit: contain;">
        </button>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text description">${producto.descripcion}</p>
          <p class="card-text extra">
          ${ 
              producto instanceof Videojuego ? 'Compañía: ' + producto.compania :
              producto instanceof Libro ? 'Autor: ' + producto.autor :
              producto instanceof Ropa ? 'Talla: ' + producto.talla :
              producto instanceof Electronica ? 'Marca: ' + producto.marca :
              producto instanceof Juguete ? 'Edad recomendada: ' + producto.edadRecomendada : ''
          }
          </p>
          <div class="d-flex justify-content-between align-items-center">
            <p class="card-text price fw-bold mb-0" style="font-size: 1.25rem;">${producto.precio}€</p>
            <p class="card-text valoracion mb-0" style="font-size: 1rem;">${producto.valoracion}★</p>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });

  // 💡 Asignar eventos a imágenes para mostrar detalles
  contenedor.querySelectorAll('.img-producto').forEach(img => {
    img.addEventListener('click', () => mostrarDetallesProducto(img.dataset.id));
  });

  // 💡 Asignar eventos a los botones para agregar al carrito
  contenedor.querySelectorAll('.btn-agregar-carrito').forEach(btn => {
    btn.addEventListener('click', () => funciones.agregarCarritoConMensaje(btn.dataset.id, btn));
  });

  // Actualizar la información de paginación
  const infoContainer = document.getElementById('paginacion-info');
  if (infoContainer) {
    infoContainer.textContent = `Mostrando ${productosPagina.length} de ${totalProducts} productos`;
  }

  // Crear controles de paginación
  funciones.crearPaginacion(totalPages);
}

/**
 * Muestra la vista de detalles extendida del producto.
 * @param {string} idProducto - El ID del producto a mostrar.
 */
function mostrarDetallesProducto(idProducto) {
  // Buscar el producto en el array global
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;

  // Crear overlay
  const overlay = document.createElement('div');
  overlay.id = 'product-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '10000';

  // Crear contenedor de detalles
  const detailsContainer = document.createElement('div');
  detailsContainer.id = 'product-details';
  detailsContainer.style.position = 'fixed';
  detailsContainer.style.top = '50%';
  detailsContainer.style.left = '50%';
  detailsContainer.style.transform = 'translate(-50%, -50%)';
  detailsContainer.style.width = '80%';
  detailsContainer.style.maxWidth = '800px';
  detailsContainer.style.backgroundColor = '#fff';
  detailsContainer.style.borderRadius = '8px';
  detailsContainer.style.overflow = 'hidden';
  detailsContainer.style.zIndex = '10001';
  detailsContainer.style.display = 'flex';
  detailsContainer.style.flexDirection = 'column';
  detailsContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';

  // Crear cabecera para la ventana de detalles
  const header = document.createElement('div');
  header.style.backgroundColor = '#fff';
  header.style.padding = '10px';
  header.style.position = 'relative';
  header.style.borderBottom = '1px solid #ddd';
  // Crear contenedor centrado para el título
  const titleContainer = document.createElement('div');
  titleContainer.style.textAlign = 'center';
  titleContainer.innerHTML = `<h3 style="margin: 0;">${producto.nombre} - ${producto.precio}€</h3>`;
  header.appendChild(titleContainer);
  // Botón de cerrar, posicionado a la derecha dentro de la cabecera
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Cerrar';
  closeBtn.className = 'btn btn-secondary';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '10px';
  closeBtn.style.right = '10px';
  closeBtn.onclick = funciones.cerrarDetallesProducto;
  header.appendChild(closeBtn);
  detailsContainer.appendChild(header);

  // Crear contenedor para el contenido (dos columnas) con scroll si es necesario
  const contentContainer = document.createElement('div');
  contentContainer.style.display = 'flex';
  contentContainer.style.flex = '1';  // Ocupa el espacio restante
  contentContainer.style.overflow = 'hidden';

  // Columna izquierda: imagen del producto
  const leftCol = document.createElement('div');
  leftCol.style.flex = '1';
  leftCol.style.backgroundColor = '#f8f8f8';
  leftCol.style.display = 'flex';
  leftCol.style.alignItems = 'center';
  leftCol.style.justifyContent = 'center';
  leftCol.style.padding = '10px';
  const img = document.createElement('img');
  img.src = producto.imagen;
  img.alt = producto.nombre;
  img.style.maxWidth = '100%';
  img.style.maxHeight = '100%';
  img.style.objectFit = 'contain';
  leftCol.appendChild(img);

  // Columna derecha: detalles del producto, con scroll vertical
  const rightCol = document.createElement('div');
  rightCol.style.flex = '1';
  rightCol.style.padding = '20px';
  rightCol.style.overflowY = 'auto';
  rightCol.style.maxHeight = '70vh';

  // Campo extra (si aplica)
  if (producto instanceof Videojuego) {
    const extra = document.createElement('p');
    extra.textContent = 'Compañía: ' + producto.compania;
    rightCol.appendChild(extra);
  } else if (producto instanceof Libro) {
    const extra = document.createElement('p');
    extra.textContent = 'Autor: ' + producto.autor;
    rightCol.appendChild(extra);
  }

  // Descripción completa
  const desc = document.createElement('p');
  desc.textContent = producto.descripcion;
  rightCol.appendChild(desc);

  // Mostrar la valoración debajo de la descripción
  const rating = document.createElement('p');
  rating.textContent = 'Valoración: ' + producto.valoracion + '★';
  rightCol.appendChild(rating);

  // Añadir las columnas al contenedor de contenido
  contentContainer.appendChild(leftCol);
  contentContainer.appendChild(rightCol);
  detailsContainer.appendChild(contentContainer);

  // Añadir overlay y contenedor de detalles al body
  document.body.appendChild(overlay);
  document.body.appendChild(detailsContainer);

  // Cerrar la vista al hacer clic en el overlay
  overlay.onclick = funciones.cerrarDetallesProducto;
}


// ############################################Listeners####################################################
// Inicialización: mostrar productos, actualizar carrito y activar búsqueda
document.addEventListener('DOMContentLoaded', () => {
  // Al iniciar, la lista actual es la completa
  setListaActual(productos);
  mostrarProductos(productos);
  funciones.actualizarCarrito();
  
  const buscador = document.getElementById('buscador');
  buscador.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      funciones.filtrarProductos(query);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cantidad-input').forEach(input => {
    input.addEventListener('change', () => funciones.actualizarCantidad(input.dataset.id, input.value, input));
  });
});

// Escucha el cambio en el select de tipo de producto
document.getElementById('tipoProducto').addEventListener('change', function() {
  // Obtener el contenedor y el input del campo extra
  const extraFieldContainer = document.getElementById('campoExtra');
  const extraInput = document.getElementById('campoExtraInput');
  // Obtener la etiqueta del campo extra
  const extraLabel = extraFieldContainer.querySelector('label');
  
  // Valor seleccionado en el select
  const tipo = this.value;
  
  // Variables para definir el texto de la etiqueta y el placeholder
  let labelText = '';
  let placeholderText = '';
  
  // Dependiendo del tipo, se asignan los textos correspondientes
  switch (tipo) {
    case 'videojuego':
      labelText = 'Compañía';
      placeholderText = 'Compañía';
      break;
    case 'libro':
      labelText = 'Autor';
      placeholderText = 'Autor';
      break;
    case 'ropa':
      labelText = 'Talla';
      placeholderText = 'Talla';
      break;
    case 'juguete':
      labelText = 'Edad recomendada';
      placeholderText = 'Edad recomendada';
      break;
    case 'electronica':
      labelText = 'Marca';
      placeholderText = 'Marca';
      break;
    default:
      // Si no se selecciona un tipo válido, ocultamos el campo extra
      extraFieldContainer.classList.add('d-none');
      return;
  }
  
  // Actualizamos la etiqueta y el placeholder
  extraLabel.textContent = labelText;
  extraInput.placeholder = placeholderText;
  
  // Mostramos el campo extra (quitando la clase 'd-none')
  extraFieldContainer.classList.remove('d-none');
});

document.addEventListener('DOMContentLoaded', () => {
  // Calcular el precio máximo entre todos los productos
  const maxPrice = Math.max(...productos.map(p => p.precio));

  // Asignar el valor calculado al control de precio máximo
  const precioMaxInput = document.getElementById('precioMax');
  precioMaxInput.value = maxPrice;
  precioMaxInput.setAttribute('max', maxPrice);
  document.getElementById('precioMaxVal').textContent = maxPrice;

  // Inicializar la lista actual y renderizar los productos y el carrito
  setListaActual(productos); 
  mostrarProductos(productos);
  funciones.actualizarCarrito();

  const buscador = document.getElementById('buscador');
  buscador.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      funciones.filtrarProductos(query);
  });
});


document.addEventListener('DOMContentLoaded', function(){
  const btnAjustes = document.getElementById('btnAjustes');
  const filtroAjustes = document.getElementById('filtroAjustes');
  
  // Vincular click para mostrar u ocultar el panel de filtros
  btnAjustes.addEventListener('click', function() {
    filtroAjustes.classList.toggle('d-none');
  });
  
  const precioMinInput = document.getElementById('precioMin');
  const precioMaxInput = document.getElementById('precioMax');
  const valoracionMinInput = document.getElementById('valoracionMin');
  const valoracionMaxInput = document.getElementById('valoracionMax');

  // Al mover cualquiera de los controles, se actualiza el texto y se filtran los productos
  precioMinInput.addEventListener('input', funciones.actualizarFiltros);
  precioMaxInput.addEventListener('input', funciones.actualizarFiltros);
  valoracionMinInput.addEventListener('input', funciones.actualizarFiltros);
  valoracionMaxInput.addEventListener('input', funciones.actualizarFiltros);

  // También, el buscador debe disparar el filtrado
  const buscador = document.getElementById('buscador');
  buscador.addEventListener('input', function(e) {
    const query = e.target.value.trim();
    funciones.filtrarProductos(query);
  });

  // Actualización dinámica del campo extra según el tipo de producto
  document.getElementById('tipoProducto').addEventListener('change', function() {
    const extraFieldContainer = document.getElementById('campoExtra');
    const extraInput = document.getElementById('campoExtraInput');
    const extraLabel = extraFieldContainer.querySelector('label');
    const tipo = this.value;
    let labelText = '';
    let placeholderText = '';

    switch (tipo) {
      case 'videojuego':
        labelText = 'Compañía';
        placeholderText = 'Compañía';
        break;
      case 'libro':
        labelText = 'Autor';
        placeholderText = 'Autor';
        break;
      case 'ropa':
        labelText = 'Talla';
        placeholderText = 'Talla';
        break;
      case 'juguete':
        labelText = 'Edad recomendada';
        placeholderText = 'Edad recomendada';
        break;
      case 'electronica':
        labelText = 'Marca';
        placeholderText = 'Marca';
        break;
      default:
        // Si se vuelve a seleccionar la opción por defecto, se oculta el campo extra
        extraFieldContainer.classList.add('d-none');
        return;
    }
    extraLabel.textContent = labelText;
    extraInput.placeholder = placeholderText;
    extraFieldContainer.classList.remove('d-none');
  });

  // Funcionalidad drag & drop para el campo de imagen
  const dropZone = document.getElementById('dropZone');
  dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropZone.classList.add('drop-active');
  });
  dropZone.addEventListener('dragleave', function(e) {
    e.preventDefault();
    dropZone.classList.remove('drop-active');
  });
  dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    dropZone.classList.remove('drop-active');
    const files = e.dataTransfer.files;
    let fileInput = document.getElementById('imagenProducto');

    // Si ya hay un archivo en el campo, se muestra error
    if (fileInput.files.length > 0) {
      mostrarErrorForm("Ya hay un archivo asignado al campo de imagen.");
      return;
    }
    // Solo se permite un archivo
    if (files.length > 1) {
      mostrarErrorForm("Solo se permite subir un único archivo.");
      return;
    }
    let file = files[0];
    // Validar el tipo del archivo
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      mostrarErrorForm("El archivo debe ser JPG, JPEG o PNG.");
      return;
    }
    // Usamos DataTransfer para asignar el archivo al input
    let dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInput.files = dataTransfer.files;

    // Mostrar mensaje temporal en el dropZone
    let originalText = dropZone.textContent;
    dropZone.textContent = "¡Elemento añadido!";
    setTimeout(() => {
      dropZone.textContent = originalText;
    }, 2000);
  });

  // Validación y envío del formulario
  document.getElementById('formProducto').addEventListener('submit', function(e) {
    e.preventDefault();
    // Obtener valores del formulario
    let tipo = document.getElementById('tipoProducto').value;
    let nombre = document.getElementById('nombreProducto').value.trim();
    let precio = document.getElementById('precioProducto').value;
    let descripcion = document.getElementById('descripcionProducto').value.trim();
    let extra = document.getElementById('campoExtraInput').value.trim();
    let fileInput = document.getElementById('imagenProducto');
    let file = fileInput.files[0];

    // Validar campos obligatorios (tipo, nombre, precio y el campo extra)
    if (tipo === "") {
      mostrarErrorForm("Debes seleccionar un tipo de producto");
      return;
    }
    if (!nombre) {
      mostrarErrorForm("El nombre del producto es obligatorio");
      return;
    }
    if (!precio || precio < 0) {
      mostrarErrorForm("El precio del producto es obligatorio y no puede ser negativo");
      return;
    }
    if (!extra) {
      mostrarErrorForm("El campo extra es obligatorio");
      return;
    }

    // Si no se ha subido ninguna imagen, se asigna una imagen por defecto
    let imagenUrl = file ? URL.createObjectURL(file) : 'imagenes/productos/sin-imagen.png';

    // Se crea la nueva instancia del producto
    crearProducto(tipo, nombre, parseFloat(precio), descripcion, imagenUrl, extra);

    // Mostrar mensaje de éxito en el formulario
    mostrarExitoForm("Producto añadido correctamente");

    // Reiniciar el formulario y ocultar el campo extra
    this.reset();
    document.getElementById('campoExtra').classList.add('d-none');
  });

  // Función para mostrar mensajes de error en el formulario
  function mostrarErrorForm(mensaje) {
    let form = document.getElementById('formProducto');
    let submitButton = form.querySelector('button[type="submit"]');
    let errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.textContent = mensaje;
    // Insertar el mensaje justo debajo del botón de submit
    submitButton.insertAdjacentElement('afterend', errorDiv);
    setTimeout(() => {
      errorDiv.style.transition = "opacity 1s";
      errorDiv.style.opacity = "0";
      setTimeout(() => {
        if (errorDiv.parentElement) errorDiv.parentElement.removeChild(errorDiv);
      }, 1000);
    }, 2000);
  }

  // Función para mostrar mensajes de éxito en el formulario
  function mostrarExitoForm(mensaje) {
    let form = document.getElementById('formProducto');
    let submitButton = form.querySelector('button[type="submit"]');
    let exitoDiv = document.createElement('div');
    exitoDiv.className = 'alert alert-success';
    exitoDiv.textContent = mensaje;
    // Insertar el mensaje justo debajo del botón de submit
    submitButton.insertAdjacentElement('afterend', exitoDiv);
    setTimeout(() => {
      exitoDiv.style.transition = "opacity 1s";
      exitoDiv.style.opacity = "0";
      setTimeout(() => {
        if (exitoDiv.parentElement) exitoDiv.parentElement.removeChild(exitoDiv);
      }, 1000);
    }, 2000);
  }
});

export { productos, carrito, listaActual, setListaActual, setCarrito, setCurrentPage, productsPerPage, currentPage};