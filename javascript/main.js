let descuento;
let precio;
let confirmacion;
let cantidad;

function mostrarMenuPrincipal() {
    return parseInt(prompt(("----------------TECH---------------- \n\n " + "Categorias:\n\n" +"1. Celulares\n 2. Audifonos\n 3. Televisores \n\n 4.Salir" + "\nIngrese una Opción:")));
}

function mostrarCelulares() {
    let opcionCelular;

    do {
        opcionCelular = parseInt(prompt(("----------Celulares---------- \n"+"\n1.Samsung Galaxy A14 : S/500.00 \n" + "2.Motorola G14 : S/450.00\n" + "3.Xiaomi : S/700.00 \n\n4.Salir")));
        
        switch(opcionCelular) {
            case 1:
                precio= 500;
                break;
            case 2:
                precio= 450;
                break;
            case 3:
                precio= 700;
                break;
            case 4:
                return;
            default :
                alert("Error. Opción incorrecta, vuelva a ingresar una opción");
                continue;
        }
        cantidad = parseInt(prompt("Ingrese la cantidad que desea 1-10: "));
        
        while(cantidad > 10 || cantidad < 1) {
            cantidad = parseInt(prompt("Ingrese una cantidad válida (entre 1 y 10): "));
        }

        descuento = 0.2 * precio;
        total = (precio - descuento) * cantidad;
        alert("----Bolsa de compras---- \n\n" + "Cantidad= " + cantidad+ "\nPrecio Unidad= S/" + precio + "\nDescuento Unidad=S/" + descuento);
        confirmacion = confirm("¿Está seguro de realizar la compra?");
        if (confirmacion) {
            alert("----Orden de compra---- \n\n" + "Cantidad= " + cantidad + "\nPrecio= S/" + precio*cantidad + "\nDescuento= S/" + descuento*cantidad + "\n-----------------------------\n" + "Total a pagar= S/" + total);
        } else {
            alert("Regresamos al menu principal");
        }
    } while(opcionCelular !== 4);

    alert("Gracias por comprar en Tech!!");
}

function mostrarAudifonos() {
    let opcionAudifonos;

    do {
        opcionAudifonos = parseInt(prompt(("----------Audifonos---------- \n"+"\n1.JBL Wave Flex : S/189.00 \n" + "2.SONY True Wireless: S/849.00\n" + "3.HUAWEI FreeBuds : S/92.00 \n\n4.Salir")));
        
        switch(opcionAudifonos) {
            case 1:
                precio= 189;
                break;
            case 2:
                precio= 849;
                break;
            case 3:
                precio= 92;
                break;
            case 4:
                return;
            default :
                alert("Error. Opción incorrecta, vuelva a ingresar una opción");
                continue;
        }
        cantidad = parseInt(prompt("Ingrese la cantidad que desea 1-10: "));
        
        while(cantidad > 10 || cantidad < 1) {
            cantidad = parseInt(prompt("Ingrese una cantidad válida (entre 1 y 10): "));
        }

        descuento = 0.2 * precio;
        total = (precio - descuento) * cantidad;
        alert("----Bolsa de compras---- \n\n" + "Cantidad= " + cantidad+ "\nPrecio Unidad= S/" + precio + "\nDescuento Unidad=S/" + descuento);
        confirmacion = confirm("¿Está seguro de realizar la compra?");
        if (confirmacion) {
            alert("----Orden de compra---- \n\n" + "Cantidad= " + cantidad + "\nPrecio= S/" + precio*cantidad + "\nDescuento= S/" + descuento*cantidad + "\n-----------------------------\n" + "Total a pagar= S/" + total);
        } else {
            alert("Regresamos al menu principal");
        }
    } while(opcionAudifonos !== 4);

    alert("Gracias por comprar en Tech!!");
}

function mostrarTelevisores() {
    let opcionTelevisores;

    do {
        opcionTelevisores = parseInt(prompt(("----------Televisores---------- \n"+"\n1.Samsung Smart Tv : S/1559.00 \n" + "2.LG THINQ: S/1700.00\n" + "3.HISENSE UHD : S/900.00 \n\n4.Salir")));
        
        switch(opcionTelevisores) {
            case 1:
                precio= 1559;
                break;
            case 2:
                precio= 1700;
                break;
            case 3:
                precio= 900;
                break;
            case 4:
                return;
            default :
                alert("Error. Opción incorrecta, vuelva a ingresar una opción");
                continue;
        }
        cantidad = parseInt(prompt("Ingrese la cantidad que desea 1-10: "));
        
        while(cantidad > 10 || cantidad < 1) {
            cantidad = parseInt(prompt("Ingrese una cantidad válida (entre 1 y 10): "));
        }

        descuento = 0.2 * precio;
        total = (precio - descuento) * cantidad;
        alert("----Bolsa de compras---- \n\n" + "Cantidad= " + cantidad+ "\nPrecio Unidad= S/" + precio + "\nDescuento Unidad=S/" + descuento);
        confirmacion = confirm("¿Está seguro de realizar la compra?");
        if (confirmacion) {
            alert("----Orden de compra---- \n\n" + "Cantidad= " + cantidad + "\nPrecio= S/" + precio*cantidad + "\nDescuento= S/" + descuento*cantidad + "\n-----------------------------\n" + "Total a pagar= S/" + total);
        } else {
            alert("Regresamos al menu principal");
        }
    } while(opcionTelevisores !== 4);

    alert("Gracias por comprar en Tech!!");
}

function init() {
    alert("Bienvenidos al CyberNow de Tech");

    let opcion;

    do {
        opcion = mostrarMenuPrincipal();

        switch(opcion) {
            case 1:
                mostrarCelulares();
                break;
            case 2:
                mostrarAudifonos();
                break;
            case 3:
                mostrarTelevisores();
                break;
            case 4:
                alert("Gracias por visitar Tech!!");
                break;
            default:
                alert("Opción no válida");
                break;
        }
    } while(opcion !== 4);

    alert("Gracias por visitar el CyberNow de Tech");
}

init();