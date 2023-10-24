const btnDrop = document.querySelector('.navbar .nav .btn-dropdown');
const dropdown = document.querySelector('.dropdown')

btnDrop.addEventListener('click', (e) => {
    if (dropdown.classList.contains('hide-dropdown')) {
        dropdown.classList.remove('hide-dropdown'); // Mostramos el menu dropdown
    } else {
      dropdown.classList.add("hide-dropdown"); // Escondemos el menu dropdown
    }
})
