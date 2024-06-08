
let productos =[];
fetch("./javascript/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
        filtrado();
    })

const contenedorProductos = document.querySelector("#products");
const botonCategorias = document.querySelectorAll(".products__category");
const tituloPrincipal = document.querySelector("#poster__title");
let botonAgregar = document.querySelectorAll(".product__button");
const  activarSubmenu = document.querySelector(".nav__list--products");
const productosItem= document.querySelector(".nav__products");
const numerito = document.querySelector("#contador");

function cargarProductos(productosElegidos){
    contenedorProductos.innerHTML= " ";
    productosElegidos.forEach(producto =>{
        const div = document.createElement("div");
        div.classList.add("product__container");
        div.innerHTML =`
            <img class="product__imagen" src="${producto.img}" alt="${producto.titulo}">
            <div class="product__texts">
                <p class="product__title">${producto.titulo}</p>
                <p class="product__price">S/${producto.precio}</p>
            </div>
            <button class="product__button" id="${producto.id}">Agregar</button>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonAgregar();
}

cargarProductos(productos);

botonCategorias.forEach(boton =>{
    boton.addEventListener("click",(e) =>{
        const idBoton = e.currentTarget.id;
        const productosCategoria = productos.find(producto => producto.categoria.id === idBoton);
        tituloPrincipal.innerText = productosCategoria.categoria.nombre;
        const productosBoton = productos.filter(producto => producto.categoria.id === idBoton);
        cargarProductos(productosBoton);
        
    });
});

activarSubmenu.addEventListener("click", () =>{
    productosItem.classList.toggle("nav__products--active");
});

function actualizarBotonAgregar(){
    botonAgregar = document.querySelectorAll(".product__button");
    botonAgregar.forEach(botones => {
        botones.addEventListener("click", agregarCarrito);
    });
}

let productosCarrito=[];

let productosCarritoLS = localStorage.getItem("productos");

if(productosCarritoLS){
    productosCarrito = JSON.parse(productosCarritoLS);
    actualizarNumerito();
}else{
    productosCarrito= [];
}

function agregarCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === parseInt(idBoton));
    Toastify({
        text: `Producto Agregado` ,
        duration: 500,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #F4DE56, #F4DE56)",
        },
        offset: {
            x: '2em', 
            y: '5em' 
          },
        onClick: function(){} // Callback after click
      }).showToast();

    if(productosCarrito.some(producto => producto.id === parseInt(idBoton))){
        const index = productosCarrito.findIndex(producto => producto.id === parseInt(idBoton));
        productosCarrito[index].cantidad ++;
    }else{
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos", JSON.stringify(productosCarrito));
}

function actualizarNumerito(){
    const nuevoNumerito = productosCarrito.reduce((contador, producto) => contador + producto.cantidad ,0);
    numerito.innerText = nuevoNumerito;
}


function filtrado(){
    const categoriaSeleccionada = localStorage.getItem('categoriaSeleccionada');
    if (categoriaSeleccionada) {
        const productosFiltrados = productos.filter(producto => producto.categoria.id === categoriaSeleccionada );
        tituloPrincipal.innerText = categoriaSeleccionada;
        cargarProductos(productosFiltrados);
    } else {
        tituloPrincipal.innerText = "Todos los productos";
        cargarProductos(productos);
    }

}