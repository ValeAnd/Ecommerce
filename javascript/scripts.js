const categoriaLinks = document.querySelectorAll('.categoria-link');
const  activarSubmenu = document.querySelector(".nav__list--products");
const productosItem= document.querySelector(".nav__products");

activarSubmenu.addEventListener("click", () =>{
    productosItem.classList.toggle("nav__products--active");
});

categoriaLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const categoriaId = this.closest('.categoria__container, .item__products').id;
        localStorage.setItem('categoriaSeleccionada', categoriaId); 
        window.location.href = 'productos.html'; 
    });
});

function actualizarNumerito(){
    const productosCarrito = JSON.parse(localStorage.getItem("productos"));
    const nuevoNumerito = productosCarrito.reduce((contador, producto) => contador + producto.cantidad, 0);  
    const numerito = document.querySelector("#contador");
    numerito.innerText = nuevoNumerito;
}

actualizarNumerito();