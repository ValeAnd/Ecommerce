let productosCarrito = localStorage.getItem("productos");
productosCarrito = JSON.parse(productosCarrito);
const contenedorCarritoVacio = document.querySelector("#cart__empty");
const contenedorCarritoProductos = document.querySelector("#cart__products");
const contenedorCarritoAcciones = document.querySelector("#cart__actions");
const contenedorCarritoComprado = document.querySelector("#cart__buy");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
let totalNumeroCarrito = document.querySelector("#total");
const botonVaciar = document.querySelector("#cart__actions--empty");
const botonComprar = document.querySelector("#cart__actions--buy");
const total = document.querySelector("#total"); 

function cargarProductos(){
    if(productosCarrito && productosCarrito.length > 0){
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML="";
        
        productosCarrito.forEach(producto =>{
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML= `
                <img class="carrito-producto-imagen" src="${producto.img}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>   
                </div>
                <div class="carrito-producto-precio">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Precio</small>
                    <p>S/${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}">
                    <i class="bi bi-trash-fill"></i>
                </button>   
            `;
            contenedorCarritoProductos.append(div);
        });
        eliminarBotonesEliminar();
        actualizarTotal();
    }else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

cargarProductos();

function eliminarBotonesEliminar(){
    let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach( boton => {
        boton.addEventListener("click", eliminarCarrito);
    });
}

function eliminarCarrito(e){
    Toastify({
        text: "Producto Eliminado" ,
        duration: 500,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #4E4070, #4E4070)",
        },
        offset: {
            x: '2em', 
            y: '5em',
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === parseInt(idBoton));
    if (productosCarrito[index].cantidad > 1) {
        productosCarrito[index].cantidad --; 
    } else {
        productosCarrito.splice(index, 1); 
    }
    
    cargarProductos();
    localStorage.setItem("productos",JSON.stringify(productosCarrito));
}

function actualizarTotal(){
    const total = document.querySelector("#total");
    const actualTotal = productosCarrito.reduce((acumulador, producto) => acumulador + ( producto.precio*producto.cantidad), 0);
    total.innerText = `S/${actualTotal}`;
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito(){
    Swal.fire({
        title: "¿Estas Seguro de Vaciar el Carrito?",
        text: `Se van a borrar ${productosCarrito.reduce((contador, producto) => contador + producto.cantidad,0)} productos`,
        icon: "question",
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Sí!",
        cancelButtonText: "No!"
      }).then((result) => {
        if (result.isConfirmed) {
            productosCarrito.length =0;
            localStorage.setItem("productos", JSON.stringify(productosCarrito));
            contenedorCarritoVacio.classList.remove("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.add("disabled");
        }
      });
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    Swal.fire({
        title: "¿Estas seguro de realizar la compra?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Genial!",
                text: "Los Minions están preparando tu pedido",
                imageUrl: "https://i.pinimg.com/564x/46/02/41/46024172547ed7869b7879eb4486fbae.jpg",
                imageWidth: 230,
                imageHeight: 300,
                imageAlt: "Custom image"
              });
            productosCarrito.length = 0;
            localStorage.setItem("productos", JSON.stringify(productosCarrito));
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.remove("disabled");
            
        }
      });
}
