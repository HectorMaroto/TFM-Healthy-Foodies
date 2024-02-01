const slider = document.querySelector('.slider');

let interval = null;
let step = 1;

const start = () => {
    interval = setInterval(() => {
        slider.scrollLeft = slider.scrollLeft + step;
    }, 10); //cada 10 milisegundos scrolleamos el slider hacia la izquierda sumando 1 al valor del scroll
}

const stop = () => {
    clearInterval(interval);
}

slider.addEventListener('mouseover', () => {
    stop(); //Cuando ponemos el cursor sobre el slider, este se detiene.
});

slider.addEventListener('mouseout', () => {
    start(); //Cuando quitamos el cursor de encima, vuelve a continuar.
});

window.addEventListener('DOMContentLoaded', start()); //Iniciamos el movimiento del slider nada mas cargar la pagina


