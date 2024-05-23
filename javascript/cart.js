
const container = document.getElementById("container");
const unidades = document.getElementById("total__cantidad");
const total= document.getElementById("total__precio");

function mostrarProductos(){
    container.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("productos"));
    productos.forEach(el => {
        const card = document.createElement("div");
        card.className="card";

        const img = document.createElement("img");
        img.src= el.img;
        img.alt = "NOIMG";
        img.className = "imagen";

        const titles = document.createElement("div");
        titles.className = "card__texts"
        const title = document.createElement("p");
        title.className="title";
        title.innerText= el.nombre;

        const price = document.createElement("p");
        price.className="price";
        price.innerText= `S/${el.precio}`;
        
        const contador = document.createElement("div");
        contador.className = "card__contador";

        const buttonMas = document.createElement("button");
        buttonMas.className = "contador__button";
        buttonMas.innerText = "+";

        const cantidad = document.createElement("span");
        cantidad.className = "contador__cantidad";
        cantidad.innerText= el.cantidad;

        const buttonMenos = document.createElement("button");
        buttonMenos.className = "contador__button";
        buttonMenos.innerText = "-";
        
        card.appendChild(img);
        titles.appendChild(title);
        titles.appendChild(price);

        contador.appendChild(buttonMenos);
        contador.appendChild(cantidad);
        contador.appendChild(buttonMas);

        card.appendChild(titles);
        card.appendChild(contador);
        container.appendChild(card);

        buttonMas.addEventListener("click", () => {
            agregarCarrito(el);
            const carritoActualizado = JSON.parse(localStorage.getItem("productos"));
            const productoActualizado = carritoActualizado.find(item => item.id === el.id);
            cantidad.innerText = productoActualizado.cantidad;
            totalUnidades();
            totalPrecio();
            
        });
        
        
        buttonMenos.addEventListener("click", () => {
            restarCarrito(el);
            const carritoActualizado = JSON.parse(localStorage.getItem("productos"));
            const productoActualizado = carritoActualizado.find(item => item.id === el.id);
            //Verifica si hay un producto todavia despues de modificar su cantidad
            if(productoActualizado){
                cantidad.innerText = productoActualizado.cantidad;
            }else{
                card.remove();
            }
            totalUnidades();
            totalPrecio();
        });
        
    });
}

function totalUnidades(){
    const carrito = JSON.parse(localStorage.getItem("productos"));
    const totalUnidades = carrito.reduce((unidades, el) => unidades + el.cantidad,0);
    unidades.innerText = totalUnidades;
}

function totalPrecio(){
    const carrito = JSON.parse(localStorage.getItem("productos"));
    const totalPrecio = carrito.reduce((total, el) => total + (el.precio*el.cantidad),0);
    total.innerText = totalPrecio;
}

const comprar = document.getElementById("comprar");
comprar.onclick = () => {
    // Eliminar todos los productos del carrito en el localStorage
    localStorage.removeItem("productos");
    alert("¡Compra finalizada! Su carrito ahora está vacío.");
    
    total.innerText= 0;
    unidades.innerText= 0;
    contador.innerText=0;

    mostrarProductos();
    
};

mostrarProductos();
totalUnidades();
totalPrecio();
