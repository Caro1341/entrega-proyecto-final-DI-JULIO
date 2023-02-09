let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito) || [];

// variables para llamar a mis elementos del html
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonComprar = document.querySelector("#comprar-carrito");
const botonVaciar = document.querySelector("#vaciar-carrito");
const contenedorCarritoVaciado = document.querySelector("#carrito-vaciado");

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");
    contenedorCarritoVaciado.classList.add("disabled");
    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add(
        "carrito-producto",
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "border",
        "p-3",
        "my-2",
        "rounded"
      );
      div.innerHTML = `<img src="${producto.imagen}" alt="${
        producto.nombre
      }" style="width: 100px" />
        <div class="carrito-producto-titulo">
        <small>Producto</small>
        <p>${producto.nombre}</p>
        </div>
        <div class="carrito-producto-cantidad">
        <small>Cantidad</small>
        <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
        <small>Precio</small>
        <p>$${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
        <small>Subtotal</small>
        <p>$${producto.precio * producto.cantidad}</p>
        </div>
        <button id="${producto.id}"
        class="btn btn-outline-dark carrito-producto-eliminar"
        >
        <i class="bi bi-trash3"></i>
        </button>`;

      contenedorCarritoProductos.append(div);
    });
    actualizarBotonesEliminar();
    vaciarCarrito();
    comprarCarrito();
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
    contenedorCarritoVaciado.classList.add("disabled");
    contenedorCarritoProductos.innerHTML = "";
  }
}
cargarProductosCarrito();

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "error",
    title: `Has eliminado un producto de tu carrito de compras`,
  });
  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id == idBoton
  );

  productosEnCarrito.splice(index, 1);

  cargarProductosCarrito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function vaciarCarrito() {
  botonVaciar.addEventListener("click", () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Eliminarás todos los productos del carrito!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver al carrito.",
      confirmButtonText: "Si, estoy seguro.",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminados!", "Tu carrito está vacio", "success");
        productosEnCarrito.length = 0;
        localStorage.setItem(
          "productos-en-carrito",
          JSON.stringify(productosEnCarrito)
        );
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoVaciado.classList.remove("disabled");
        contenedorCarritoProductos.innerHTML = "";
      }
    });
  });
}

function comprarCarrito() {
  botonComprar.addEventListener("click", comprarCarrito);
  function comprarCarrito() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Tu compra se ha realizado con exito!",
      showConfirmButton: false,
      timer: 2000,
    });
    productosEnCarrito.length = 0;
    localStorage.setItem(
      "productos-en-carrito",
      JSON.stringify(productosEnCarrito)
    );
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
    contenedorCarritoVaciado.classList.add("disabled");
    contenedorCarritoProductos.innerHTML = "";
  }
}
