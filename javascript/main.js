
const container = document.getElementById("container");

function mostrarProductos(productos){
    productos.forEach(el => {
        const card = document.createElement("div");
        card.className="card";

        const img = document.createElement("img");
        img.src= el.img;
        img.alt = "NOIMG";
        img.className = "imagen";

        const title = document.createElement("p");
        title.className="title";
        title.innerText= el.nombre;

        const price = document.createElement("p");
        price.className="price";
        price.innerText= `S/${el.precio}`;

        const buttonAgregar = document.createElement("button");
        buttonAgregar.className = "button__agregar";
        buttonAgregar.innerText = "Agregar Carrito";
        
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(buttonAgregar);

        container.appendChild(card);

        buttonAgregar.addEventListener("click", () => agregarCarrito(el)); // Mover el event listener aquí

    });
}

mostrarProductos(productos);
