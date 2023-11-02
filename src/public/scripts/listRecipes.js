// En este fragmento de codigo creamos una animacion para que las recetas guardadas por el usuario vayan 
// apareciendo segun scrollea por la pagina de 'Tus recetas'

const elementos = document.querySelectorAll('.card-container-list');

function mostrarScroll() {
    let scrollTop = document.documentElement.scrollTop; //Cantidad de pixeles de scroll que voy haciendo segun voy bajando
    for (let i = 0; i < elementos.length; i++){
        let alturaElemento = elementos[i].offsetTop; //Altura desde inicio de la ventana hasta donde esta el elemento
        if (alturaElemento - 450 < scrollTop) {
            elementos[i].style.opacity = 1;
            elementos[i].classList.add('mostrarArriba');
        }
    }
}

window.addEventListener('scroll', mostrarScroll);