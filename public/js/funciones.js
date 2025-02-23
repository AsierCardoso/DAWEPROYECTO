// funciones.js
// Imports
import { productos, carrito, listaActual, currentPage, setCurrentPage, mostrarProductos, setCarrito } from './tienda.js';

// ############################################Productos####################################################
/**
 * Cierra la vista de detalles del producto eliminando el overlay y el contenedor de detalles.
*/
export function cerrarDetallesProducto() {
    const overlay = document.getElementById('product-overlay');
    const detailsContainer = document.getElementById('product-details');
    if (overlay) document.body.removeChild(overlay);
    if (detailsContainer) document.body.removeChild(detailsContainer);
}

// ############################################Busqueda####################################################
/**
 * Filtra los productos según el query (búsqueda por nombre), el rango de precio y el rango de valoración.
 */
export function filtrarProductos(query) {
    // Convertir a número y establecer valores por defecto
    const precioMin = parseFloat(document.getElementById('precioMin').value) || 0;
    const precioMax = parseFloat(document.getElementById('precioMax').value) || 1000;
    const valoracionMin = parseFloat(document.getElementById('valoracionMin').value) || 1;
    const valoracionMax = parseFloat(document.getElementById('valoracionMax').value) || 5;
  
    // Filtrar productos que cumplan con la búsqueda y los rangos
    const productosFiltrados = productos.filter(p => {
      const matchesText = p.nombre.toLowerCase().includes(query.toLowerCase());
      const matchesPrice = p.precio >= precioMin && p.precio <= precioMax;
      const matchesRating = p.valoracion >= valoracionMin && p.valoracion <= valoracionMax;
      return matchesText && matchesPrice && matchesRating;
    });
    // Reiniciar a la primera página y mostrar los productos filtrados
    setCurrentPage(1);
    mostrarProductos(productosFiltrados);
}

/**
 * Actualiza los valores mostrados en los spans de los filtros y asegura que los controles duales no se crucen.
 */
export function actualizarFiltros() {
    // Controles para precio
    const precioMinInput = document.getElementById('precioMin');
    const precioMaxInput = document.getElementById('precioMax');
    let precioMin = parseFloat(precioMinInput.value);
    let precioMax = parseFloat(precioMaxInput.value);
  
    // Asegurarse de que el mínimo no supere el máximo
    if (precioMin > precioMax) {
      precioMin = precioMax;
      precioMinInput.value = precioMin;
    }
    // Forzar una diferencia mínima de 10 euros
    if (precioMax - precioMin < 10) {
      // Intentar ajustar el valor máximo
      let nuevoMax = precioMin + 10;
      if (nuevoMax <= parseFloat(precioMaxInput.max)) {
        precioMax = nuevoMax;
        precioMaxInput.value = precioMax;
      } else {
        // Si no se puede aumentar el máximo, ajustar el mínimo
        let nuevoMin = precioMax - 10;
        if (nuevoMin >= parseFloat(precioMinInput.min)) {
          precioMin = nuevoMin;
          precioMinInput.value = precioMin;
        }
      }
    }
  
    // Controles para valoración
    const valoracionMinInput = document.getElementById('valoracionMin');
    const valoracionMaxInput = document.getElementById('valoracionMax');
    let valoracionMin = parseFloat(valoracionMinInput.value);
    let valoracionMax = parseFloat(valoracionMaxInput.value);
    
    if (valoracionMin > valoracionMax) {
      valoracionMin = valoracionMax;
      valoracionMinInput.value = valoracionMin;
    }
    // Forzar una diferencia mínima de 1 punto en valoración
    if (valoracionMax - valoracionMin < 1) {
      let nuevoMax = valoracionMin + 1;
      if (nuevoMax <= parseFloat(valoracionMaxInput.max)) {
        valoracionMax = nuevoMax;
        valoracionMaxInput.value = valoracionMax;
      } else {
        let nuevoMin = valoracionMax - 1;
        if (nuevoMin >= parseFloat(valoracionMinInput.min)) {
          valoracionMin = nuevoMin;
          valoracionMinInput.value = valoracionMin;
        }
      }
    }
  
    // Actualizar los spans que muestran los valores actuales
    document.getElementById('precioMinVal').textContent = precioMin;
    document.getElementById('precioMaxVal').textContent = precioMax;
    document.getElementById('valoracionMinVal').textContent = valoracionMin;
    document.getElementById('valoracionMaxVal').textContent = valoracionMax;
  
    // Reaplicar el filtrado completo usando el query actual
    const query = document.getElementById('buscador').value.trim();
    filtrarProductos(query);
}

// ############################################Paginacion####################################################
/**
 * Crea el menú de paginación en el contenedor con id "paginacion".
 * Se muestran botones para cada página, junto con "Anterior" y "Siguiente" según corresponda.
 */
export function crearPaginacion(totalPages) {
    const paginacion = document.getElementById('paginacion');
    paginacion.innerHTML = '';

    // Botón "Anterior"
    if (currentPage > 1) {
        const btnAnterior = document.createElement('li');
        btnAnterior.className = 'page-item';
        btnAnterior.innerHTML = `<a class="page-link" href="#">Anterior</a>`;
        btnAnterior.addEventListener('click', () => cambiarPagina(currentPage - 1));
        paginacion.appendChild(btnAnterior);
    }

    // Botones de página
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item' + (i === currentPage ? ' active' : '');
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener('click', () => cambiarPagina(i));
        paginacion.appendChild(li);
    }

    // Botón "Siguiente"
    if (currentPage < totalPages) {
        const btnSiguiente = document.createElement('li');
        btnSiguiente.className = 'page-item';
        btnSiguiente.innerHTML = `<a class="page-link" href="#">Siguiente</a>`;
        btnSiguiente.addEventListener('click', () => cambiarPagina(currentPage + 1));
        paginacion.appendChild(btnSiguiente);
    }
}


/**
 * Cambia la página actual y vuelve a mostrar los productos usando la lista actual.
 * @param {number} nuevaPagina - La nueva página a mostrar.
 */
export function cambiarPagina(nuevaPagina) {
    setCurrentPage(nuevaPagina);
    mostrarProductos(listaActual);
}

// ############################################Carrito####################################################
/**
 * Añade el producto al carrito y muestra un mensaje temporal sobre el botón en la carta.
 */
export function agregarCarritoConMensaje(idProducto, btn) {
    agregarCarrito(idProducto);
    // Ocultar el botón del carrito
    btn.style.display = 'none';
    
    let msgBox = document.createElement('div');
    msgBox.textContent = '¡Añadido!';
    msgBox.style.position = 'absolute';
    msgBox.style.top = '10px';
    msgBox.style.right = '10px';
    msgBox.style.backgroundColor = '#28a745';
    msgBox.style.color = '#fff';
    msgBox.style.padding = '5px 10px';
    msgBox.style.borderRadius = '5px';
    msgBox.style.opacity = '1';
    msgBox.style.transition = 'opacity 0.5s ease';
    
    let container = btn.parentElement;
    container.style.position = 'relative';
    container.appendChild(msgBox);
    
    // Después de 2 segundos, se desvanece el aviso y se vuelve a mostrar el botón
    setTimeout(() => {
      msgBox.style.opacity = '0';
      setTimeout(() => {
        if (msgBox.parentElement) {
          container.removeChild(msgBox);
        }
        btn.style.display = '';
      }, 500);
    }, 2000);
}

/**
 * Actualiza el contenido del carrito
 */
export function actualizarCarrito() {
    const carritoContent = document.getElementById('carritoContent');
    carritoContent.innerHTML = '';

    if (carrito.length === 0) {
        carritoContent.innerHTML = '<p class="text-center">No hay productos en el carrito.</p>';
        return;
    }

    carrito.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item d-flex align-items-center mb-3 rounded border p-2';
        itemDiv.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="rounded me-2" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="flex-grow-1">
              <h6 class="mb-0">${item.nombre}</h6>
              <div class="d-flex align-items-center">
                <small>${item.precio}€ x </small>
                <input type="number" class="form-control form-control-sm mx-2 cantidad-input" 
                       style="width: 50px;" value="${item.cantidad}" min="1" max="20" data-id="${item.id}">
                <small class="ms-2 subtotal">Subtotal: ${(item.precio * item.cantidad).toFixed(2)}€</small>
              </div>
            </div>
        `;
        carritoContent.appendChild(itemDiv);
    });

    let total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const divider = document.createElement('hr');
    carritoContent.appendChild(divider);

    const totalDiv = document.createElement('div');
    totalDiv.className = 'd-flex justify-content-between align-items-center';
    totalDiv.innerHTML = `<strong>Total:</strong> <strong id="totalCarrito">${total.toFixed(2)}€</strong>`;
    carritoContent.appendChild(totalDiv);

    // Reasignar los listeners para actualizar la cantidad
    document.querySelectorAll('.cantidad-input').forEach(input => {
        input.addEventListener('change', () => actualizarCantidad(input.dataset.id, input.value, input));
    });
}

/**
 * Agrega un producto al carrito.
 */
function agregarCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (producto) {
        const itemCarrito = carrito.find(item => item.id === idProducto);
        if (itemCarrito) {
            if (itemCarrito.cantidad < 20) {
                itemCarrito.cantidad++;
            }
        } else {
            carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, cantidad: 1 });
        }
        actualizarCarrito();
    }
}

/**
 * Elimina un producto del carrito y actualiza el estado global.
 * @param {string} idProducto - ID del producto a eliminar.
 */
function eliminarProductoDeCarrito(idProducto) {
    const nuevoCarrito = carrito.filter(item => item.id !== idProducto);
    setCarrito(nuevoCarrito);
    actualizarCarrito();
}

/**
 * Actualiza la cantidad de un producto en el carrito.
 * Si el usuario ingresa una cantidad mayor a 20, se ajusta a 20 y se muestra un mensaje de error
 * justo debajo del producto; si es menor o igual a 0, se elimina el producto del carrito.
 * El mensaje se desvanece en 2 segundos.
 * @param {string} idProducto - ID del producto.
 * @param {string} nuevaCantidad - Nuevo valor ingresado.
 * @param {HTMLElement} inputElem - Referencia al input de cantidad.
 */
function actualizarCantidad(idProducto, nuevaCantidad, inputElem) {
    let cantidad = parseInt(nuevaCantidad);
    const itemCarrito = carrito.find(item => item.id === idProducto);
    if (!itemCarrito) return;
    
    // Obtener el contenedor de la tarjeta (cart-item)
    const cartItemDiv = inputElem.closest('.cart-item');
    
    // Validar entrada no numérica
    if (isNaN(cantidad)) {
        let errorContainer = cartItemDiv.nextElementSibling;
        if (!errorContainer || !errorContainer.classList.contains('input-error-box')) {
            errorContainer = document.createElement('div');
            errorContainer.className = 'input-error-box';
            errorContainer.style.backgroundColor = '#f8d7da';
            errorContainer.style.color = '#721c24';
            errorContainer.style.padding = '5px 10px';
            errorContainer.style.border = '1px solid #f5c6cb';
            errorContainer.style.borderRadius = '5px';
            errorContainer.style.marginTop = '5px';
            errorContainer.style.opacity = '1';
            cartItemDiv.parentNode.insertBefore(errorContainer, cartItemDiv.nextSibling);
        }
        errorContainer.textContent = 'Cantidad inválida';
        // Ajustar a 1 como valor por defecto
        cantidad = 1;
        inputElem.value = cantidad;
        itemCarrito.cantidad = cantidad;
        setTimeout(() => {
            errorContainer.style.transition = 'opacity 2s ease';
            errorContainer.style.opacity = '0';
            setTimeout(() => {
                if (errorContainer.parentNode) {
                    errorContainer.parentNode.removeChild(errorContainer);
                }
                actualizarCarrito();
            }, 2000);
        }, 2000);
        return;
    }
    
    // Si el usuario ingresa 0 (o un valor menor o igual a 0), se elimina el producto inmediatamente sin aviso.
    if (cantidad <= 0) {
        eliminarProductoDeCarrito(idProducto);
        actualizarCarrito();
        return;
    }
    
    // Validar cantidad máxima
    let errorMessage = '';
    if (cantidad > 20) {
        cantidad = 20;
        inputElem.value = cantidad;
        itemCarrito.cantidad = cantidad;
        errorMessage = 'La cantidad máxima es 20';
    }
    
    if (errorMessage !== '') {
        let errorContainer = cartItemDiv.nextElementSibling;
        if (!errorContainer || !errorContainer.classList.contains('input-error-box')) {
            errorContainer = document.createElement('div');
            errorContainer.className = 'input-error-box';
            errorContainer.style.backgroundColor = '#f8d7da';
            errorContainer.style.color = '#721c24';
            errorContainer.style.padding = '5px 10px';
            errorContainer.style.border = '1px solid #f5c6cb';
            errorContainer.style.borderRadius = '5px';
            errorContainer.style.marginTop = '5px';
            errorContainer.style.opacity = '1';
            cartItemDiv.parentNode.insertBefore(errorContainer, cartItemDiv.nextSibling);
        }
        errorContainer.textContent = errorMessage;
        inputElem.value = cantidad;
        itemCarrito.cantidad = cantidad;

        setTimeout(() => {
            errorContainer.style.transition = 'opacity 2s ease';
            errorContainer.style.opacity = '0';
            setTimeout(() => {
                if (errorContainer.parentNode) {
                    errorContainer.parentNode.removeChild(errorContainer);
                }
                actualizarCarrito();
            }, 2000);
        }, 2000);
    } else {
        // Si no hay error, eliminar cualquier mensaje previo y actualizar el carrito inmediatamente.
        let errorContainer = cartItemDiv.nextElementSibling;
        if (errorContainer && errorContainer.classList.contains('input-error-box')) {
            errorContainer.parentNode.removeChild(errorContainer);
        }
        itemCarrito.cantidad = cantidad;
        actualizarCarrito();
    }
}
