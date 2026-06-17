let tamagotchi = null;
let temporizadorId = null;
let indiceMascotaSeleccionada = 0;

// Mapeo centralizado del único documento HTML.
const elementos = {
    vistaSeleccion: document.getElementById("vistaSeleccion"),
    vistaJuego: document.getElementById("vistaJuego"),
    selectorMascota: document.getElementById("selectorMascota"),
    btnMascotaAnterior: document.getElementById("btnMascotaAnterior"),
    btnMascotaSiguiente: document.getElementById("btnMascotaSiguiente"),
    indicadoresCarrusel: document.getElementById("indicadoresCarrusel"),
    contadorMascotas: document.getElementById("contadorMascotas"),
    btnVolver: document.getElementById("btnVolver"),
    preview: document.getElementById("preview"),
    descripcionJuego: document.getElementById("descripcionJuego"),
    mensaje: document.getElementById("mensaje"),
    actividades: document.getElementById("actividades"),
    infoMascota: document.getElementById("infoMascota"),
    nombreMascota: document.getElementById("nombreMascota"),
    creadorMascota: document.getElementById("creadorMascota"),
    imagenMascota: document.getElementById("imagenMascota"),
    personalidad: document.getElementById("personalidad"),
    salud: document.getElementById("salud"),
    felicidad: document.getElementById("textoFelicidad"),
    limpieza: document.getElementById("textoLimpieza"),
    energia: document.getElementById("textoEnergia"),
    valorSalud: document.getElementById("valorSalud"),
    valorFelicidad: document.getElementById("valorFelicidad"),
    valorLimpieza: document.getElementById("valorLimpieza"),
    valorEnergia: document.getElementById("valorEnergia"),
    btnAlimentar: document.getElementById("alimentar"),
    btnJugarConMascota: document.getElementById("jugarConMascota"),
    btnDormir: document.getElementById("dormir"),
    btnDuchar: document.getElementById("duchar"),
    btnReprender: document.getElementById("reprender"),
    btnAcariciar: document.getElementById("acariciar")
};

// El array mascotas se declara en videos.js y se reutiliza aquí.

const pintarEstado = (clave, valor) => {
    const icono = window.configuracionMascota?.iconosEstado?.[clave];
    const iconos = {
        corazon: "&#10084;&#65039;",
        estrella: "&#11088;",
        gota: "&#128167;",
        rayo: "&#9889;"
    };

    if (icono && /\.(svg|png|jpe?g|webp|gif)$/i.test(icono)) {
        const claseIcono = window.configuracionMascota.claseIconoEstado || "h-4 w-4";
        return Array.from(
            { length: valor },
            () => `<img src="${icono}" alt="" class="inline-block shrink-0 ${claseIcono}">`
        ).join("");
    }

    if (icono && iconos[icono]) {
        return Array.from(
            { length: valor },
            () => `<span class="shrink-0">${iconos[icono]}</span>`
        ).join("");
    }

    return "";
};

const mostrarEstado = (mensajeTexto = "", mediaSrc = "", mediaAlt = "") => {
    if (!tamagotchi) return;

    elementos.salud.innerHTML = pintarEstado("salud", tamagotchi.salud);
    elementos.felicidad.innerHTML = pintarEstado("felicidad", tamagotchi.felicidad);
    elementos.limpieza.innerHTML = pintarEstado("limpieza", tamagotchi.limpieza);
    elementos.energia.innerHTML = pintarEstado("energia", tamagotchi.energia);

    elementos.valorSalud.innerText = tamagotchi.salud;
    elementos.valorFelicidad.innerText = tamagotchi.felicidad;
    elementos.valorLimpieza.innerText = tamagotchi.limpieza;
    elementos.valorEnergia.innerText = tamagotchi.energia;
    elementos.mensaje.innerHTML = mensajeTexto;

    if (mediaSrc) {
        const esImagen = /\.(png|jpe?g|gif|webp|svg)$/i.test(mediaSrc);
        const claseMedia = window.configuracionMascota.claseMedia || "";

        elementos.imagenMascota.innerHTML = esImagen
            ? `<img src="${mediaSrc}" alt="${mediaAlt}" class="block h-full max-h-full w-full max-w-full rounded-2xl object-contain ${claseMedia}">`
            : `<video src="${mediaSrc}" aria-label="${mediaAlt}" class="block h-full max-h-full w-full max-w-full rounded-2xl object-contain ${claseMedia}" autoplay loop muted playsinline></video>`;
    }
};

const detenerTemporizador = () => {
    if (temporizadorId !== null) {
        clearInterval(temporizadorId);
        temporizadorId = null;
    }
};

const comprobarFinDelJuego = () => {
    if (!tamagotchi) return false;

    tamagotchi.comprobarVida();

    if (tamagotchi.enVida) return false;

    detenerTemporizador();
    desactivarBotones();
    mostrarEstado(gameOver.mensaje, gameOver.video, `${tamagotchi.nombre}: fin del juego`);
    return true;
};

// Cada ejecución del temporizador disminuye las cuatro propiedades.
const bajarValores = () => {
    if (!tamagotchi) return;

    tamagotchi.restarVida();

    mostrarEstado(`${tamagotchi.nombre} pierde energía poco a poco.`);
    comprobarFinDelJuego();
};

const iniciarTemporizador = () => {
    detenerTemporizador();
    temporizadorId = setInterval(bajarValores, 5000);
};

const ejecutarAccion = (accion, recurso, textoAlternativo) => {
    if (!tamagotchi) return;

    tamagotchi[accion]();
    mostrarEstado(recurso.mensaje, recurso.video, textoAlternativo);
    comprobarFinDelJuego();
};

const alimentar = () => {
    ejecutarAccion("alimentar", videoAlimentar, "Mascota alimentada");
};

const jugar = () => {
    ejecutarAccion("jugar", videoJugar, "Mascota jugando");
};

const dormir = () => {
    ejecutarAccion("dormir", videoDormir, "Mascota durmiendo");
};

const duchar = () => {
    ejecutarAccion("duchar", videoDuchar, "Mascota duchándose");
};

const reprender = () => {
    ejecutarAccion("reprender", videoReprender, "Mascota reprendida");
};

const acariciar = () => {
    ejecutarAccion("acariciar", videoAcariciar, "Mascota acariciada");
};

const listeners = [
    { boton: elementos.btnAlimentar, handler: alimentar },
    { boton: elementos.btnJugarConMascota, handler: jugar },
    { boton: elementos.btnDormir, handler: dormir },
    { boton: elementos.btnDuchar, handler: duchar },
    { boton: elementos.btnReprender, handler: reprender },
    { boton: elementos.btnAcariciar, handler: acariciar }
];

const activarBotones = () => {
    // Se elimina primero para evitar escuchadores duplicados al reiniciar.
    listeners.forEach(({ boton, handler }) => {
        boton.disabled = false;
        boton.classList.remove("opacity-50", "cursor-not-allowed");
        boton.removeEventListener("click", handler);
        boton.addEventListener("click", handler);
    });
};

const desactivarBotones = () => {
    // Al terminar se retiran los escuchadores exigidos por la rúbrica.
    listeners.forEach(({ boton, handler }) => {
        boton.disabled = true;
        boton.classList.add("opacity-50", "cursor-not-allowed");
        boton.removeEventListener("click", handler);
    });
};

const crearTamagotchi = (idMascota) => {
    // Primero carga sus datos y después crea la instancia con estado propio.
    actualizarConfiguracionMascota(idMascota);

    const configuracion = window.configuracionMascota;
    tamagotchi = new Tamagotchi(
        configuracion.nombre,
        configuracion.personalidad,
        configuracion.imagen
    );

    elementos.descripcionJuego.innerText = configuracion.descripcionJuego;
    elementos.nombreMascota.innerText = `Tamagotchi: ${configuracion.nombre}`;
    elementos.creadorMascota.innerText = `Creado por: ${configuracion.creador}`;
    elementos.personalidad.innerText = tamagotchi.descripcion;
    elementos.mensaje.innerHTML = "";
    elementos.infoMascota.classList.remove("hidden");
    elementos.actividades.classList.remove("hidden");
    elementos.nombreMascota.classList.remove("hidden");
    elementos.creadorMascota.classList.remove("hidden");
    elementos.imagenMascota.classList.remove("hidden");

    activarBotones();
    mostrarEstado(videoNacer.mensaje, videoNacer.video, `${configuracion.nombre} ha nacido`);
    iniciarTemporizador();
};

const iniciarJuego = (idMascota) => {
    const mascotaElegida = mascotas.find((mascota) => mascota.id === idMascota);

    if (!mascotaElegida) return;

    // Cambia de la selección al juego sin navegar a otro HTML.
    elementos.vistaSeleccion.classList.add("hidden");
    elementos.vistaJuego.classList.remove("hidden");
    document.title = `Tamagotchi ${mascotaElegida.nombre}`;
    crearTamagotchi(mascotaElegida.id);
    window.scrollTo(0, 0);
};

const volverASeleccion = () => {
    detenerTemporizador();
    desactivarBotones();
    tamagotchi = null;
    elementos.vistaJuego.classList.add("hidden");
    elementos.vistaSeleccion.classList.remove("hidden");
    elementos.mensaje.innerHTML = "";
    elementos.imagenMascota.innerHTML = "";
    document.title = "Minomi y amigos";
    renderPreview();
    window.scrollTo(0, 0);
};

const renderPreview = () => {
    // Renderizar desde datos evita escribir una tarjeta distinta por mascota.
    const mascota = mascotas[indiceMascotaSeleccionada];
    // Mantiene sincronizados el selector por nombre y el carrusel.
    elementos.selectorMascota.value = mascota.id;

    elementos.preview.innerHTML = `
        <article class="mx-auto w-full max-w-md rounded-2xl border border-[#c6d6a0]/60 bg-slate-900/90 p-3 text-center shadow-[0_0_30px_rgba(198,214,160,0.18)] sm:p-4">
            <img src="${mascota.imagen}" alt="Vista previa de ${mascota.nombre}" class="mx-auto h-32 w-32 rounded-2xl bg-slate-950/35 object-cover transition-transform sm:h-40 sm:w-40 ${mascota.claseImagen}" style="outline:2px solid ${mascota.colorAcento}66; box-shadow:0 8px 24px ${mascota.colorAcento}40;">
            <span class="mt-2 inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide" style="border-color:${mascota.colorAcento}66; color:${mascota.colorAcento};">${mascota.etiqueta}</span>
            <h2 class="mt-1 text-xl font-extrabold text-[#e8f3ff] sm:text-2xl">${mascota.nombre}</h2>
            <p class="mt-0.5 text-[11px] font-semibold text-[#b7c6d9] sm:text-xs">Creado por: ${mascota.creador}</p>
            <p class="mx-auto mt-1 min-h-10 max-w-sm text-xs leading-relaxed text-[#f1f7ff] sm:text-sm">${mascota.descripcion}</p>
            <button type="button" data-jugar="${mascota.id}" class="mt-3 rounded-full border border-[#e8f3c9]/80 bg-[#c6d6a0] px-7 py-2 text-xs font-extrabold uppercase tracking-wide text-[#0f172a] transition hover:scale-105 hover:bg-[#d8e7b5]">
                Jugar con ${mascota.nombre}
            </button>
        </article>
    `;

    elementos.indicadoresCarrusel.innerHTML = mascotas
        .map((item, indice) => {
            const activa = indice === indiceMascotaSeleccionada;
            const claseActiva = activa
                ? "w-7 bg-[#c6d6a0]"
                : "w-2.5 bg-cyan-100/35 hover:bg-cyan-100/60";

            return `<button type="button" data-indice-mascota="${indice}" aria-label="Mostrar ${item.nombre}" aria-current="${activa}" class="h-2.5 rounded-full transition-all ${claseActiva}"></button>`;
        })
        .join("");

    elementos.contadorMascotas.innerText = `${indiceMascotaSeleccionada + 1} / ${mascotas.length}`;
};

const manejarClickPreview = (event) => {
    const botonJugar = event.target.closest("button[data-jugar]");

    if (botonJugar) {
        iniciarJuego(botonJugar.dataset.jugar);
    }
};

const cambiarMascota = (desplazamiento) => {
    // El módulo permite avanzar de la última mascota a la primera.
    indiceMascotaSeleccionada = (
        indiceMascotaSeleccionada + desplazamiento + mascotas.length
    ) % mascotas.length;

    renderPreview();
};

const irMascotaAnterior = () => {
    cambiarMascota(-1);
};

const irMascotaSiguiente = () => {
    cambiarMascota(1);
};

const manejarClickIndicadores = (event) => {
    const indicador = event.target.closest("[data-indice-mascota]");

    if (indicador) {
        indiceMascotaSeleccionada = Number(indicador.dataset.indiceMascota);
        renderPreview();
    }
};

const manejarCambioSelector = () => {
    const nuevoIndice = mascotas.findIndex(
        (mascota) => mascota.id === elementos.selectorMascota.value
    );

    if (nuevoIndice >= 0) {
        indiceMascotaSeleccionada = nuevoIndice;
        renderPreview();
    }
};

const manejarTecladoCarrusel = (event) => {
    if (elementos.vistaSeleccion.classList.contains("hidden")) return;

    if (event.key === "ArrowLeft") {
        cambiarMascota(-1);
    }

    if (event.key === "ArrowRight") {
        cambiarMascota(1);
    }
};

// Punto de entrada: prepara la interfaz y asigna los escuchadores iniciales.
const main = () => {
    // Las opciones se generan para que el selector también sea escalable.
    elementos.selectorMascota.innerHTML = mascotas
        .map((mascota) => `<option value="${mascota.id}">${mascota.nombre}</option>`)
        .join("");

    elementos.btnVolver.addEventListener("click", volverASeleccion);
    elementos.preview.addEventListener("click", manejarClickPreview);
    elementos.selectorMascota.addEventListener("change", manejarCambioSelector);
    elementos.btnMascotaAnterior.addEventListener("click", irMascotaAnterior);
    elementos.btnMascotaSiguiente.addEventListener("click", irMascotaSiguiente);
    elementos.indicadoresCarrusel.addEventListener("click", manejarClickIndicadores);
    document.addEventListener("keydown", manejarTecladoCarrusel);

    renderPreview();
};

main();
