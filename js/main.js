let productos = [];
//ruta relativa

fetch("./js/stock.json")
  .then((res) => res.json())
  .then((data) => {
    productos = data;
    cargarProductos(productos);
  });

// variables para llamar a mis elementos del html
const contenedorProductos = document.querySelector("#contenedor-productos");
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
const numeroCarrito = document.querySelector("#numero-carrito");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
productosEnCarrito = JSON.parse(productosEnCarrito) || [];

setTimeout(() => {
  const { value: email } = Swal.fire({
    title: "¿Todavía no eres parte del club?",
    input: "email",
    inputLabel: "Ingresá tu email y recibí las mejores ofertas",
    inputPlaceholder: "ejemplo@gmail.com",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
  });

  if (email) {
    Swal.fire(`Entered email: ${email}`);
  }
}, 2000);

// funcion para cargar los elementos en el index
function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";
  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add(
      "card",
      "producto",
      "my-2",
      "shadow-sm",
      "p-3",
      "mb-5",
      "bg-body",
      "rounded"
    );
    div.innerHTML = `<img
          src="${producto.imagen}"
          class="card-img-top producto-imagen"
          alt="..."
      />
      <div class="card-body producto-detalles">
          <h5 class="card-title producto-nombre">${producto.nombre}</h5>
          <p class="card-text producto-descripcion">${producto.descripcion}</p>
          <p class="card-text producto-precio">$${producto.precio}</p>
          <button class="btn btn-outline-dark producto-agregar" id="agregar${producto.id}">
          Agregar
          </button>
      </div>`;

    contenedorProductos.appendChild(div);
    const botonesAgregar = document.querySelector(`#agregar${producto.id}`);
    botonesAgregar.addEventListener("click", () => {
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
        icon: "success",
        title: `Has agregado ${producto.nombre} a tu carrito de compras`,
      });
      agregarAlCarrito(producto.id);
    });
    actualizarNumero();
  });
}

// cargarProductos(productos);

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productosCategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = productosCategoria.categoria.nombre;

      const productosBoton = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );

      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});
// funcion para agregar productos al carrito
const agregarAlCarrito = (productoId) => {
  const item = productos.find((producto) => producto.id === productoId);
  console.log(item);
  const existe = productosEnCarrito.some((producto) => producto.id === item.id);

  if (existe) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id == item.id
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productosEnCarrito.push(item);
    item.cantidad = 1;
  }
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );

  actualizarNumero();
};
function actualizarNumero() {
  let nuevoNumeroCarrito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numeroCarrito.innerText = nuevoNumeroCarrito;
}
