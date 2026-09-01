// 1. Configura aquí la contraseña final (la que funcionará DESPUÉS de ver la pista)
const CONTRASENA_REAL = "020924"; // ¡Cambia "1234" por tu fecha especial!

// Esta es la "llave secreta". Empieza en falso porque aún no ha pedido la pista.
let pistaVista = false;

// 2. Referencias a los elementos del HTML
const inputPassword = document.getElementById('input-password');
const btnIngresar = document.getElementById('btn-ingresar');
const mensajeError = document.getElementById('mensaje-error');
const pantallaBloqueo = document.getElementById('pantalla-bloqueo');
const pantallaSobre = document.getElementById('pantalla-sobre');
const linkPista = document.getElementById('link-pista');
const sobreInteractivo = document.getElementById('sobre-interactivo');
const musicaFondo = document.getElementById('musicafondo');
const pantallaTerminal = document.getElementById('pantalla-terminal');
const terminalLog = document.getElementById('terminal-log');
const sfxTecla = document.getElementById('sfx-tecla');
const sfxError = document.getElementById('sfx-error');
const sfxCarga = document.getElementById('sfx-carga');
const sfxSolapa = document.getElementById('sfx-solapa');

// 3. Evento al hacer clic en el botón de Abrir
if (btnIngresar) {
    btnIngresar.addEventListener('click', () => {
        const valorIngresado = inputPassword.value;

        // Verificamos DOS cosas: que YA haya visto la pista Y que el código sea correcto
        if (pistaVista === true && valorIngresado === CONTRASENA_REAL) {
            // Si cumple ambas, entra a la sorpresa
            pantallaBloqueo.classList.add('oculto');
            iniciarTerminal();
        } else {
            if (sfxError) {
                sfxError.currentTime = 0;
                sfxError.play();
            }
            // Si no ha visto la pista (sin importar qué escriba), o si se equivoca de código, siempre da error
            if (mensajeError) mensajeError.classList.remove('oculto');
            if (linkPista) linkPista.classList.remove('oculto');
            if (inputPassword) inputPassword.value = '';
        }
    });
}

// 4. Evento para mostrar la alerta de la pista
if (linkPista) {
    linkPista.addEventListener('click', () => {
        alert("POSIIII, No te acuerdas de nuestra fecha especial 😭😭02/09/2033  Idola, Maquina, Fiera, Crack"); 
        
        // ¡Magia! Aquí activamos la llave para que la contraseña empiece a funcionar
        pistaVista = true; 
    });
}

// 5. Animación paso a paso (Solapa por solapa)
const solapas = document.querySelectorAll('.solapaArriba, .solapaAbajo, .solapaDerecha, .solapaIzquierda');
const carta = document.querySelector('.carta');
const contadorAmor = document.getElementById('contador-amor');
let solapasAbiertas = 0; // Nuestro contador de estado

// Le agregamos el evento de clic a cada una de las 4 solapas
solapas.forEach(solapa => {
    solapa.addEventListener('click', (evento) => {
        // Evitamos que un clic en la solapa active otras cosas
        evento.stopPropagation(); 

        // Si esta solapa en específico ya está abierta, ignoramos el clic
        if (solapa.classList.contains('abierta')) return;
        if (sfxSolapa) {
            sfxSolapa.currentTime = 0;
            sfxSolapa.play();
        }
        // Abrimos esta solapa y sumamos 1 al contador
        solapa.classList.add('abierta');
        solapasAbiertas++;

        // Verificamos si ya destapó las 4
        if (solapasAbiertas === 4) {
            if (musicaFondo) musicaFondo.play();
            // 1. Lanzamos la lluvia de fotos de inmediato
            const cantidadPorLado = 250; // <-- ¡Cambia este número a la cantidad de fotos que quieras!
            
            for (let i = 0; i < cantidadPorLado; i++) {
                // Ejecutamos pares ordenados cada 400 milisegundos para que hagan una fila perfecta
                setTimeout(() => {
                    crearCorazonFijo('izquierda');
                    crearCorazonFijo('derecha');
                }, i * 400); 
            }
            // 2. ¡NUEVO! Esperamos exactamente 10ms antes de que la carta empiece a crecer
            setTimeout(() => {
                carta.classList.add('revelada'); // La carta sube
                if (contadorAmor) {
                    contadorAmor.classList.add('subir'); // El contador también sube al mismo tiempo
                }
            }, 1005); 
            
            setTimeout(efectoEscribir, 1015);
        }
    });
});

// 6. Tus fotos y generador de corazones
const misFotos = ['imagenes/img1.jpeg', 'imagenes/img2.jpeg', 'imagenes/img3.jpeg', 'imagenes/img4.jpeg', 'imagenes/img5.jpeg', 'imagenes/img6.jpeg', 'imagenes/img7.JPG','imagenes/img8.jpeg'];
let contadorFotos = 0; 

function crearCorazonFijo(lado) {
    if (!sobreInteractivo) return;
    
    const corazon = document.createElement('img');
    corazon.classList.add('corazon-foto');
    
    // Saca la foto en orden
    corazon.src = misFotos[contadorFotos % misFotos.length];
    contadorFotos++;
    
    // POSICIONES FIJAS EXACTAS (Sin azar)
    if (lado === 'izquierda') {
        // Se pega exacto al borde izquierdo (Como la foto mide 75px, -75px la deja justo afuera)
        corazon.style.left = '-65px'; 
    } else if (lado === 'derecha') {
        // Se pega exacto al borde derecho (El sobre mide 300px, así que 300px la deja justo afuera)
        corazon.style.left = '290px'; 
    }
    
    sobreInteractivo.appendChild(corazon);
    
    // Se elimina cuando termina la animación para no consumir memoria
    setTimeout(() => { 
        corazon.remove(); 
    }, 2000);
}
// --- LÓGICA DE LA MÁQUINA DE ESCRIBIR ---
const elementoTexto = document.getElementById('texto-maquina');
// ¡Escribe aquí el mensaje real que quieres que se teclee!
const mensajeSecreto = "Un dia como hoy hace 2 años, algo cambio en nuestras vidas, los dos empezamos esta aventura juntos, los dos decidimos arriesgarnos a algo que no sabiamos como resultaria, empezamos con miedo, con insertidumbre y hoy luego de 2 años podemos darnos cuenta que lo bonito que es eso por lo que nos arriesgamos ese dia, tenemos dias buenos, dias malos pero siemrpe hay algo que domina en nosotros dos y eso es el amor y la decision de amarnos, sin importar que siempre encontramos la forma de demostrarnos nuestro amor, aunque sea un poquito siempre nos lo demostramos y nunca dejamos en duda nuestra desicion de amarnos, de acompañarnos, de cuidarnos y sobre todo de respetarnos. Te amo mucho mi Catito y nunca quiero que dudes de eso, se que no soy el novio perfecto y no estoy ni cerca de serlo pero creeme que todos los dias me esfuerzo para enamorarte mas y mas. Te amo mucho mi princesita hermosa. \nCon muchisimo amor: Titatito"; 

let mensajeEscrito = false; // Para evitar que se escriba dos veces si abre y cierra la carta

function efectoEscribir() {
    if (mensajeEscrito) return; // Si ya se escribió, no hace nada
    mensajeEscrito = true;
    
    let i = 0;
    elementoTexto.innerHTML = ''; // Nos aseguramos de que esté limpio
    
    // setInterval ejecuta esta función repetidamente
    const intervalo = setInterval(() => {
        if (i < mensajeSecreto.length) {
            elementoTexto.innerHTML += mensajeSecreto.charAt(i); // Agrega letra por letra
            i++;
        } else {
            clearInterval(intervalo); // Cuando termina, detiene el reloj
        }
    }, 50); // Velocidad: 50 milisegundos por letra. (Puedes subirlo o bajarlo a tu gusto)
}
const fechaInicio = new Date('2024-09-02T21:20:00'); 

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / 1000 / 60) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    const elReloj = document.getElementById('reloj');
    if (elReloj) {
        elReloj.innerText = `${dias} días, ${horas}h ${minutos}m ${segundos}s ❤️‍🩹`;
    }
}
setInterval(actualizarContador, 1000);

// --- FUNCIONALIDAD DE LA TERMINAL ---
function iniciarTerminal() {
    if (!pantallaTerminal) return;
    
    // Mostramos la ventana de la terminal
    pantallaTerminal.classList.remove('oculto');
    terminalLog.innerHTML = ''; 
    if (sfxCarga) {
        sfxCarga.currentTime = 0;
        sfxCarga.play();
    }
    // Capturamos los elementos de la barra
    const barraProgreso = document.getElementById('barra-progreso');
    const textoPorcentaje = document.getElementById('porcentaje-carga');
    let progreso = 0;

    // 1. ANIMACIÓN DE LA BARRA DE CARGA
    // Se ejecuta cada 50 milisegundos. 50ms * 100 = 5000ms (5 segundos en total)
    const intervaloCarga = setInterval(() => {
        progreso += 1;
        if (barraProgreso) barraProgreso.style.width = progreso + '%';
        if (textoPorcentaje) textoPorcentaje.innerText = progreso + '%';

        if (progreso >= 100) {
            clearInterval(intervaloCarga);
        }
    }, 90);

    // 2. TEXTOS DE LA CONSOLA (Terminan a los 3 segundos)
    const logs = [
        { texto: "Cargando besitos...", retardo: 300 },
        { texto: "[OK] Besitos cargados.", retardo: 1500 },
        { texto: "Aumentando paciencia...", retardo: 2800 },
        { texto: "Tapando canas...", retardo: 3800 },
        { texto: "Cargando Vic Sanchez...", retardo: 4400 },
        { texto: "Rafita en accion...", retardo: 5300 },
        { texto: "Mas besitos en camino...", retardo: 6000 },
        { texto: "Estacionando bomba de amor...", retardo: 6500 },
        // Esta es la última línea, aparece en el segundo 3. 
        { texto: "[SUCCESS] Todo el amor reunido. Abriendo sorpresa...", retardo: 7000 },
        { texto: ".............................", retardo: 8400 },
        { texto: ".............................", retardo: 8500 },
        { texto: ".............................", retardo: 8600 },
        { texto: ".............................", retardo: 8700 },
        { texto: ".............................", retardo: 8700 }
    ];

    logs.forEach(log => {
        setTimeout(() => {
            const linea = document.createElement('div');
            linea.className = 'log-line';
            
            if (log.texto.includes('[OK]')) {
                linea.innerHTML = log.texto.replace('[OK]', '<span class="log-ok">[OK]</span>');
            } else if (log.texto.includes('[SUCCESS]')) {
                linea.innerHTML = log.texto.replace('[SUCCESS]', '<span class="log-success">[SUCCESS]</span>');
            } else {
                linea.innerHTML = log.texto;
            }

            terminalLog.appendChild(linea);
            terminalLog.scrollTop = terminalLog.scrollHeight;
        }, log.retardo);
    });

    // 3. TRANSICIÓN A LA CARTA
    // Pasan los 3 segundos de texto + 2 segundos de pausa para leer = 5 segundos.
    // Le damos 200 milisegundos extra (5200) para que se vea el 100% antes de cambiar.
    setTimeout(() => {
        pantallaTerminal.classList.add('oculto');
        pantallaSobre.classList.remove('oculto');
        pantallaSobre.classList.add('entrada-animada');
    }, 10900);
}

if (inputPassword) {
    inputPassword.addEventListener('input', () => {
        if (sfxTecla) {
            sfxTecla.currentTime = 0; 
            sfxTecla.play();
        }
    });
}