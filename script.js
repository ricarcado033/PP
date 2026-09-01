// ==========================================
// 1. CONFIGURACIÓN GENERAL
// ==========================================
const CONFIG = {
    contrasenaReal: "020924",
    fechaInicio: new Date('2024-09-02T21:20:00'),
    mensajePista: "POSIIII, No te acuerdas de nuestra fecha especial 😭😭02/09/2033  Idola, Maquina, Fiera, Crack",
    fotos: [
        'imagenes/img1.jpeg', 'imagenes/img2.jpeg', 'imagenes/img3.jpeg', 
        'imagenes/img4.jpeg', 'imagenes/img5.jpeg', 'imagenes/img6.jpeg', 
        'imagenes/img7.JPG',  'imagenes/img8.jpeg'
    ],
    cantidadFotosLluvia: 250,
    velocidadMaquina: 50, // ms por letra
    mensajeSecreto: "Un dia como hoy hace 2 años, algo cambio en nuestras vidas, los dos empezamos esta aventura juntos, los dos decidimos arriesgarnos a algo que no sabiamos como resultaria, empezamos con miedo, con insertidumbre y hoy luego de 2 años podemos darnos cuenta que lo bonito que es eso por lo que nos arriesgamos ese dia, tenemos dias buenos, dias malos pero siemrpe hay algo que domina en nosotros dos y eso es el amor y la decision de amarnos, sin importar que siempre encontramos la forma de demostrarnos nuestro amor, aunque sea un poquito siempre nos lo demostramos y nunca dejamos en duda nuestra desicion de amarnos, de acompañarnos, de cuidarnos y sobre todo de respetarnos. Te amo mucho mi Catito y nunca quiero que dudes de eso, se que no soy el novio perfecto y no estoy ni cerca de serlo pero creeme que todos los dias me esfuerzo para enamorarte mas y mas. Te amo mucho mi princesita hermosa. \nCon muchisimo amor: Titatito"
};

// ==========================================
// 2. ESTADO GLOBAL DE LA APLICACIÓN
// ==========================================
const ESTADO = {
    pistaVista: false,
    solapasAbiertas: 0,
    contadorFotos: 0,
    mensajeEscrito: false
};

// ==========================================
// 3. REFERENCIAS AL DOM
// ==========================================
const DOM = {
    inputPassword: document.getElementById('input-password'),
    btnIngresar: document.getElementById('btn-ingresar'),
    mensajeError: document.getElementById('mensaje-error'),
    pantallaBloqueo: document.getElementById('pantalla-bloqueo'),
    pantallaSobre: document.getElementById('pantalla-sobre'),
    linkPista: document.getElementById('link-pista'),
    sobreInteractivo: document.getElementById('sobre-interactivo'),
    musicaFondo: document.getElementById('musicafondo'),
    pantallaTerminal: document.getElementById('pantalla-terminal'),
    terminalLog: document.getElementById('terminal-log'),
    barraProgreso: document.getElementById('barra-progreso'),
    textoPorcentaje: document.getElementById('porcentaje-carga'),
    carta: document.querySelector('.carta'),
    contadorAmor: document.getElementById('contador-amor'),
    elementoTexto: document.getElementById('texto-maquina'),
    elReloj: document.getElementById('reloj'),
    solapas: document.querySelectorAll('.solapaArriba, .solapaAbajo, .solapaDerecha, .solapaIzquierda'),
    
    // Audios
    sfx: {
        tecla: document.getElementById('sfx-tecla'),
        error: document.getElementById('sfx-error'),
        carga: document.getElementById('sfx-carga'),
        solapa: document.getElementById('sfx-solapa')
    }
};

// ==========================================
// 4. FUNCIONES DE UTILIDAD
// ==========================================
const reproducirSonido = (sonido) => {
    if (sonido) {
        sonido.currentTime = 0;
        sonido.play().catch(() => {});
    }
};

// ==========================================
// 5. LÓGICA DE AUTENTICACIÓN
// ==========================================
DOM.btnIngresar?.addEventListener('click', () => {
    const valorIngresado = DOM.inputPassword?.value;

    if (ESTADO.pistaVista && valorIngresado === CONFIG.contrasenaReal) {
        DOM.pantallaBloqueo?.classList.add('oculto');
        iniciarTerminal();
    } else {
        reproducirSonido(DOM.sfx.error);
        DOM.mensajeError?.classList.remove('oculto');
        DOM.linkPista?.classList.remove('oculto');
        if (DOM.inputPassword) DOM.inputPassword.value = '';
    }
});

DOM.linkPista?.addEventListener('click', () => {
    alert(CONFIG.mensajePista); 
    ESTADO.pistaVista = true; 
});

DOM.inputPassword?.addEventListener('input', () => reproducirSonido(DOM.sfx.tecla));

// ==========================================
// 6. ANIMACIÓN DE LAS SOLAPAS Y SORPRESA
// ==========================================
DOM.solapas.forEach(solapa => {
    solapa.addEventListener('click', (evento) => {
        evento.stopPropagation(); 

        if (solapa.classList.contains('abierta')) return;
        
        reproducirSonido(DOM.sfx.solapa);
        solapa.classList.add('abierta');
        ESTADO.solapasAbiertas++;

        if (ESTADO.solapasAbiertas === 4) {
            iniciarSorpresa();
        }
    });
});

function iniciarSorpresa() {
    DOM.musicaFondo?.play().catch(() => {});
    
    animarLluviaFotos();

    // Tiempo antes de que la carta crezca
    setTimeout(() => {
        DOM.carta?.classList.add('revelada'); 
        DOM.contadorAmor?.classList.add('subir'); 
    }, 1005); 
    
    // Iniciar máquina de escribir
    setTimeout(efectoEscribir, 1015);
}

// ==========================================
// 7. EFECTOS VISUALES (FOTOS Y ESCRITURA)
// ==========================================
function animarLluviaFotos() {
    for (let i = 0; i < CONFIG.cantidadFotosLluvia; i++) {
        setTimeout(() => {
            crearCorazonFijo('izquierda');
            crearCorazonFijo('derecha');
        }, i * 400); 
    }
}

function crearCorazonFijo(lado) {
    if (!DOM.sobreInteractivo) return;
    
    const corazon = document.createElement('img');
    corazon.classList.add('corazon-foto');
    
    corazon.src = CONFIG.fotos[ESTADO.contadorFotos % CONFIG.fotos.length];
    ESTADO.contadorFotos++;
    
    corazon.style.left = lado === 'izquierda' ? '-65px' : '290px'; 
    DOM.sobreInteractivo.appendChild(corazon);
    
    setTimeout(() => corazon.remove(), 2000);
}

function efectoEscribir() {
    if (ESTADO.mensajeEscrito || !DOM.elementoTexto) return; 
    ESTADO.mensajeEscrito = true;
    
    let i = 0;
    DOM.elementoTexto.innerHTML = ''; 
    
    const intervalo = setInterval(() => {
        if (i < CONFIG.mensajeSecreto.length) {
            DOM.elementoTexto.innerHTML += CONFIG.mensajeSecreto.charAt(i);
            i++;
        } else {
            clearInterval(intervalo);
        }
    }, CONFIG.velocidadMaquina);
}

// ==========================================
// 8. RELOJ CONTADOR
// ==========================================
function actualizarContador() {
    if (!DOM.elReloj) return;
    
    const diferencia = new Date() - CONFIG.fechaInicio;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / 1000 / 60) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    DOM.elReloj.innerText = `${dias} días, ${horas}h ${minutos}m ${segundos}s ❤️‍🩹`;
}
setInterval(actualizarContador, 1000);

// ==========================================
// 9. LÓGICA DE LA TERMINAL DE CARGA
// ==========================================
function iniciarTerminal() {
    if (!DOM.pantallaTerminal) return;
    
    DOM.pantallaTerminal.classList.remove('oculto');
    if (DOM.terminalLog) DOM.terminalLog.innerHTML = ''; 
    
    reproducirSonido(DOM.sfx.carga);
    
    let progreso = 0;
    const intervaloCarga = setInterval(() => {
        progreso++;
        if (DOM.barraProgreso) DOM.barraProgreso.style.width = progreso + '%';
        if (DOM.textoPorcentaje) DOM.textoPorcentaje.innerText = progreso + '%';
        if (progreso >= 100) clearInterval(intervaloCarga);
    }, 90);

    const logsConsola = [
        { texto: "Cargando besitos...", retardo: 300 },
        { texto: "[OK] Besitos cargados.", retardo: 1500 },
        { texto: "Aumentando paciencia...", retardo: 2800 },
        { texto: "Tapando canas...", retardo: 3800 },
        { texto: "Cargando Vic Sanchez...", retardo: 4400 },
        { texto: "Rafita en accion...", retardo: 5300 },
        { texto: "Mas besitos en camino...", retardo: 6000 },
        { texto: "Estacionando bomba de amor...", retardo: 6500 },
        { texto: "[SUCCESS] Todo el amor reunido. Abriendo sorpresa...", retardo: 7000 },
        { texto: ".............................", retardo: 8400 },
        { texto: ".............................", retardo: 8500 },
        { texto: ".............................", retardo: 8600 },
        { texto: ".............................", retardo: 8700 },
        { texto: ".............................", retardo: 8700 }
    ];

    logsConsola.forEach(log => {
        setTimeout(() => {
            if (!DOM.terminalLog) return;
            const linea = document.createElement('div');
            linea.className = 'log-line';
            
            // Reemplazo visual de tags
            let contenido = log.texto;
            if (contenido.includes('[OK]')) contenido = contenido.replace('[OK]', '<span class="log-ok">[OK]</span>');
            if (contenido.includes('[SUCCESS]')) contenido = contenido.replace('[SUCCESS]', '<span class="log-success">[SUCCESS]</span>');
            
            linea.innerHTML = contenido;
            DOM.terminalLog.appendChild(linea);
            DOM.terminalLog.scrollTop = DOM.terminalLog.scrollHeight;
        }, log.retardo);
    });

    // Transición final hacia la sorpresa
    setTimeout(() => {
        DOM.pantallaTerminal?.classList.add('oculto');
        DOM.pantallaSobre?.classList.remove('oculto');
        DOM.pantallaSobre?.classList.add('entrada-animada');
    }, 10900);
}