// En este fragmento de codigo creamos una animacion para que el texto vaya
// apareciendo segun se scrollea

const elements = document.querySelectorAll('.section');

function mostrarTextoScroll() {
    let scrollTop = document.documentElement.scrollTop; //Cantidad de pixeles de scroll que voy haciendo segun voy bajando
    for (let i = 0; i < elements.length; i++){
        let alturaElemento = elements[i].offsetTop; //Altura desde inicio de la ventana hasta donde esta el elemento
        if (alturaElemento - 450 < scrollTop) {
            elements[i].style.opacity = 1;
        }
    }
}

window.addEventListener('scroll', mostrarTextoScroll);