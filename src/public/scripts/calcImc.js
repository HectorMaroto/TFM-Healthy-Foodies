let height = document.getElementById('height')
let weight = document.getElementById('weight')
const calcBtn = document.querySelector('.calc-imc')
const result = document.querySelector('.result')
let message = ''

function getIMC() {
    let parsedHeight = parseInt(height.value);
    let parsedWeight = parseInt(weight.value);

    let imcResult = (parsedWeight / ((parsedHeight / 100) ** 2)).toFixed(2)

    if (imcResult < 18.5) {
        message = `Usuario, su IMC es de ${imcResult}, por lo que tiene un peso insuficiente`
    } else if (imcResult >= 18.5 && imcResult <= 24.9){
        message = `Usuario, su IMC es de ${imcResult}, por lo que tiene un peso normal y saludable`
    } else if (imcResult >= 24.9 && imcResult <= 29.9) {
        message = `Usuario, su IMC es de ${imcResult}, por lo que tiene sobrepeso`
    } else if(imcResult >= 29.9){
        message = `Usuario, su IMC es de ${imcResult}, por lo que tiene obesidad`
    }

    result.textContent = message;
    return imcResult
}

calcBtn.addEventListener('click', getIMC);