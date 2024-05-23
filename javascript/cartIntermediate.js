function agregarCarrito(producto){
    //Obtener el carrito del localstorage
    let carrito = JSON.parse(localStorage.getItem("productos"));
    console.log(carrito);

    //Si el carrito esta vacio -> es la primera vez que agrega un producto
    if(!carrito){
        //creo un nuevo producto con cantidad inicial 1
        const nuevoProducto = nuevoProductoCarrito(producto);
        localStorage.setItem("productos",JSON.stringify([nuevoProducto]));
    }else{
        //Buscar el índice del producto en el carrito
        const indiceProducto = carrito.findIndex(el => el.id === producto.id);
        console.log(indiceProducto);
        const nuevoCarrito = carrito;
        if(indiceProducto === -1){
            //Si el producto no esta en el carrito, agregarlo
            nuevoCarrito.push(nuevoProductoCarrito(producto));
        }else{
            //Si ya esta incrementar su cantidad
            nuevoCarrito[indiceProducto].cantidad ++;
        }
        localStorage.setItem("productos",JSON.stringify(nuevoCarrito));
    }

    actualizarCarrito();
}

function restarCarrito(producto){
    let carrito = JSON.parse(localStorage.getItem("productos"));
    const indiceProducto = carrito.findIndex(el => el.id === producto.id);
    if(carrito[indiceProducto].cantidad === 1){
        carrito.splice(indiceProducto,1);
    }else{
        carrito[indiceProducto].cantidad--;
    }
    localStorage.setItem("productos",JSON.stringify(carrito));
    actualizarCarrito();
}

//toma un producto, le agrega cantida  y lo devuelve

function nuevoProductoCarrito(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const cuentaElement = document.getElementById("contador");

function actualizarCarrito(){
    const carrito = JSON.parse(localStorage.getItem("productos"));
    const conteo = carrito.reduce((contador, el) => contador + el.cantidad,0);
    cuentaElement.innerText= conteo;
}

actualizarCarrito();