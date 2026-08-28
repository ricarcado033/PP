// 1. Configura aquí la contraseña 
const CONTRASENA_CORRECTA = "";

// 2. Referencias a los elementos del HTML
const inputPassword = document.getElementById('input-password');
const btnIngresar = document.getElementById('btn-ingresar');
const mensajeError = document.getElementById('mensaje-error');
const pantallaBloqueo = document.getElementById('pantalla-bloqueo');
const pantallaSobre = document.getElementById('pantalla-sobre');
const linkPista = document.getElementById('link-pista');
const sobreInteractivo = document.getElementById('sobre-interactivo');

// 3. Evento al hacer clic en el botón (Solo se ejecuta si el botón existe)
if (btnIngresar) {
    btnIngresar.addEventListener('click', () => {
        const valorIngresado = inputPassword.value;

        if (valorIngresado === CONTRASENA_CORRECTA) {
            // Contraseña correcta
            pantallaBloqueo.classList.add('oculto');
            pantallaSobre.classList.remove('oculto');
        } else {
            // Contraseña incorrecta
            if (mensajeError) mensajeError.classList.remove('oculto');
            if (linkPista) linkPista.classList.remove('oculto');
            if (inputPassword) inputPassword.value = '';
        }
    });
}

// 4. Evento para mostrar la alerta de la pista
if (linkPista) {
    linkPista.addEventListener('click', () => {
        alert("Pista: Piensa en el día que nos conocimos..."); 
    });
}

// 5. Animación para abrir y cerrar el sobre
if (sobreInteractivo) {
    sobreInteractivo.addEventListener('click', () => {
        if (sobreInteractivo.classList.contains('abierto')) {
            // Si está abierto, lo cerramos
            sobreInteractivo.classList.remove('abierto');
        } else {
            // Si está cerrado, lo abrimos y lanzamos corazones
            sobreInteractivo.classList.add('abierto');
            
            for (let i = 0; i < 100; i++) {
                setTimeout(crearCorazon, i * 300);
            }
        }
    });
}
const misFotos = ['imagenes/img1.jpeg', 'imagenes/img2.jpeg', 'imagenes/img3.jpeg', 'imagenes/img4.jpeg', 'imagenes/img5.jpeg', 'imagenes/img6.jpeg', 'imagenes/img7.jpg','imagenes/img8.jpeg'];
let contadorFotos = 0; // Esto nos ayudará a intercalar las fotos

// Reemplaza tu función actual por esta:
function crearCorazon() {
    if (!sobreInteractivo) return;
    
    // Ahora creamos una etiqueta de imagen en lugar de un div
    const corazon = document.createElement('img');
    corazon.classList.add('corazon-foto');
    
    // Le asignamos una foto de la lista y avanzamos el contador
    corazon.src = misFotos[contadorFotos % misFotos.length];
    contadorFotos++;
    
    corazon.style.left = (Math.random() * 100 ) + '%'; 
    
    sobreInteractivo.appendChild(corazon);
    
    setTimeout(() => { 
        corazon.remove(); 
    }, 2000);
}