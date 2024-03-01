var swiper = new Swiper(".mySwiper-1",{
    slidesPerView:1,
    spaceBetween: 30,
    loop: true,
    pagination:{
        el:".swiper-pagination",
        clickable:true,
    },
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev"
    }
});

var swiper = new Swiper(".mySwiper-2",{
    slidesPerView:3,
    spaceBetween: 30,
    loop: true,
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev"
    },
    breakpoints:{
        0:{
            slidesPerView:1
        },
        520:{
            slidesPerView:2
        },
        950:{
            slidesPerView:3
        }
    }
});

// Carrito
const carrito = document.getElementById('carrito');
const elemetos1 = document.getElementById('lista-1');
const elemetos2 = document.getElementById('lista-2');
const elemetos3 = document.getElementById('lista-3');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

function mostrarAlerta(mensaje, tipo) {
    Swal.fire({
        text: mensaje,
        icon: tipo,
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 500,
        customClass: {
            popup: 'swal2-tiny',
            content: 'swal2-tiny-content',
            title: 'swal2-tiny-title'
        }
    });
}

cargarEventListeners();

function cargarEventListeners() {
    elemetos1.addEventListener('click', comprarElemento);
    elemetos2.addEventListener('click', comprarElemento);
    elemetos3.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}


function comprarElemento(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100 >
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td class="precio">
            ${elemento.precio}
        </td>
        <td>
            <a herf="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
    lista.appendChild(row);
    mostrarTotalPrecio();
    mostrarAlerta('Elemento agregado al carrito', 'success');

    const price = parseFloat(elemento.precio.replace('$', ''));
    localStorage.setItem(`producto-${elemento.id}`, JSON.stringify(elemento));
    mostrarAlerta(`Se ha guardado el producto ${elemento.titulo} en el carrito`, 'success');
}


function calcularTotalCarrito() {
    let total = 0;
    const rows = document.querySelectorAll('#lista-carrito tbody tr');

    rows.forEach((row) => {
        const price = row.querySelector('.precio').textContent.replace('$', '');
        total += parseFloat(price);
    });

    return total;
}

function mostrarTotalPrecio() {
    const total = calcularTotalCarrito();
    document.querySelector('#total-carrito').textContent = `Total: $${total.toFixed(2)}`;
}

function eliminarElemento(e) {
    e.preventDefault();
    let elemento,
        elementoId;
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }
    mostrarTotalPrecio();
    mostrarAlerta('Elemento eliminado del carrito', 'error');
}

function vaciarCarrito(){
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    mostrarTotalPrecio();
    mostrarAlerta('Carrito vaciado', 'warning');
    return false;
}