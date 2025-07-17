// js/header.js

fetch('/template/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;

        // Esperar a que el header esté insertado en el DOM
        setTimeout(() => {
            const links = document.querySelectorAll('.menu a');
            const currentPath = window.location.pathname.split('/').pop(); // ej: galeria.html

            links.forEach(link => {
                const linkPath = link.getAttribute('href').split('/').pop();
                if (linkPath === currentPath) {
                    link.classList.add('active');
                }
            });
        }, 0);
    });
