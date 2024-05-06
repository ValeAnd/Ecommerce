
class Usuario{
    constructor(id, usuario, contraseña){
        this.id=id;
        this.usuario = usuario;
        this.contraseña = contraseña;
    }
}

class Producto {
    constructor(id, nombre, descripcion, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }
}
const catalogo = {
    celulares: [
        new Producto(1, "Samsung Galaxy A14", "Pantalla HD+ de 6.4 pulgadas, cámara principal de 48 MP, batería de 5000 mAh.", 500, 5),
        new Producto(2, "Motorola G14", "Procesador Snapdragon 690, cámara principal de 48 MP, pantalla de 6.7 pulgadas.", 450, 3),
    ],
    televisores: [
        new Producto(3, "Samsung Smart TV", "Resolución 4K UHD, pantalla de 55 pulgadas, sistema operativo Tizen.", 1559, 10),
        new Producto(4, "LG THINQ", "Resolución 4K UHD, pantalla de 65 pulgadas, sistema operativo webOS.", 1700, 8),
    ],
    tablets: [
        new Producto(5, "iPad Air", "Pantalla Liquid Retina de 10.9 pulgadas, chip A14 Bionic, Touch ID integrado.", 599, 15),
        new Producto(6, "Samsung Galaxy Tab S7", "Pantalla Super AMOLED de 11 pulgadas, procesador Snapdragon 865+, S Pen incluido.", 649, 12),
    ]
};

const usuarioRegistrado = [
    {
        id: 1,
        usuario: "Vale",
        contraseña:"1234",
    },
];

let carrito = [];

function mostrarMenuPrincipal() {
    return parseInt(prompt(("----------------TECH---------------- \n\n " + "Opciones:\n\n" +" 1. Ver catálogo de productos\n 2. Agregar producto al carrito\n 3. Ver carrito de compras \n 4. Realizar Compra \n\n 5.Salir" + "\nIngrese una Opción:")));
}

function registrarUsuario (){
    let usuario = prompt("Ingrese el nombre de usuario:");
    let contraseña = prompt("Ingrese una contraseña");
    if(usuario === "" || contraseña=== ""){
        alert("Ingrese datos validos");
    }else{
        const nuevoUsuario = new Usuario(usuarioRegistrado.length + 1, usuario, contraseña);
        usuarioRegistrado.push(nuevoUsuario);
        alert("Usuario registrado exitosamente");
        iniciarSesion();
    }
    
}

function iniciarSesion() {
    let usuarioValido;
    do{
        const usuario = prompt("Ingrese su nombre de usuario:");
        const contraseña = prompt("Ingrese su contraseña:");
        usuarioValido = usuarioRegistrado.find(el => el.usuario === usuario && el.contraseña === contraseña);

        if (usuarioValido) {
            alert("Bienvenido a Tech " + usuario);
            init();
        } else {
            alert("Credenciales incorrectas");
        }
    }while(!usuarioValido);
}

let opcion;
let sesionIniciada = false;
let compraRealizada = false;

do{
    alert("--------- BIENVENIDO A TECH --------- ")
    alert("Pasos para compar : \n\n 1.Para comprar debe de Iniciar Sesión, caso contrario debe Registrarse \n\n 2. Al ingresar podra seleccionar la categoria de productos que desea comprar \n\n3. Despues podra ver los productos que son de esa categoria y podra seleccionar el que desea y la cantidad que quiera \n\n 4. Luego le saldra la bolsa de compra y una ventana para confirmar la compra \n\n 5. Finalmente se ejecutra y saldra su orden" ); 
    let respuesta =confirm("¿Tiene una cuenta?");

    if(respuesta){
        if(!sesionIniciada){
            sesionIniciada= iniciarSesion();

        }else{
            alert("Debe de iniciar sesión");
        }
    }else{
        let confirmacion= confirm("¿Deseas registrarte?");
        if(confirmacion){
            registrarUsuario();
        }else{
            alert("No puede comprar sin haber iniciado sesion");
        }
    }  
}while (!confirmacion);

function mostrarCatalogo() {
    let mensajeMostrar = "Catálogo de productos:\n";
    for (const categoria in catalogo) {
        mensajeMostrar += "\n----------------------------------\n"+ categoria.toUpperCase() + ":\n";
        catalogo[categoria].forEach(el => {
            mensajeMostrar += el.id + "." + el.nombre + " - Precio: S/" + el.precio + "\nStock: " + el.stock +"\n";  
        });
    }
    alert(mensajeMostrar);
}

function agregarAlCarrito() {
    let productoEncontrado = false;
    do {
        const idProducto = parseInt(prompt("Ingrese el ID del producto que desea agregar al carrito:"));
        for (const categoria in catalogo) {
            const producto = catalogo[categoria].find(el => el.id === idProducto);
            if (producto) {
                if (producto.stock > 0) {
                    carrito.push(producto);
                    producto.stock--;
                    productoEncontrado = true;
                    alert("Se agregó correctamente " + producto.nombre + " al carrito");
                } else {
                    alert("El producto seleccionado no está disponible en stock.");
                }
            }
        }
        if (!productoEncontrado) {
            alert("ID de producto inválido. Por favor, seleccione un producto válido.");
        }
    } while (!productoEncontrado);
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } else {
        let mensaje = "Carrito de compras:\n\n";
        carrito.forEach(el => {
            mensaje += el.nombre + " - Precio:" + el.precio+  "\n";
        });
        alert(mensaje);
    }
}

function realizarCompra(){
    let total =0 ;
    if(carrito.length === 0){
        alert("El carrito esta vacio");
    }else{
        carrito.forEach(el => {
            total = total + el.precio;
        });
        mostrarCarrito();
        alert("El total de la compra es: S/" + total);
        let confirmacion = confirm("¿Desea realizar la compra?");

        if(confirmacion){
            alert("Gracias por comprar en TECH!")
            compraRealizada=true;
        }
    }
}

function init() {
    let opcion;
    do {
        opcion = mostrarMenuPrincipal();

        switch(opcion) {
            case 1:
                mostrarCatalogo();
                break;
            case 2:
                agregarAlCarrito();
                break;
            case 3:
                mostrarCarrito();
                break;
            case 4:
                realizarCompra();
                break;
            case 5:
                alert("¡Gracias por visitar TECH!");
                break;
            default:
                alert("Opción no válida");
                break;
        }
    } while(opcion !== 5 && !compraRealizada);  
}