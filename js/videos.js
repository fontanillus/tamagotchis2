let videoNacer = null;
let videoAlimentar = null;
let videoJugar = null;
let videoDormir = null;
let videoDuchar = null;
let videoReprender = null;
let videoAcariciar = null;
let gameOver = null;

// Única fuente de datos: para añadir una mascota solo se agrega otro objeto al array.
const mascotas = [
    {
        id: "minomi",
        nombre: "Minomi",
        creador: "Yolanda Fontanillas",
        imagen: "./img/minomi.png",
        claseImagen: "",
        etiqueta: "Dulce",
        colorAcento: "#c6d6a0",
        descripcion: "Un tamagotchi dulce y juguetón. Cuídalo, aliméntalo y mantenlo feliz en cada actividad.",
        descripcionJuego: "Minomi ya está listo para jugar contigo.",
        personalidad: "Minomi es muy dulce, le encanta recibir caricias y siempre está de buen humor, pero si lo reprendes se pone muy triste.",
        iconosEstado: {
            salud: "img/huella-dorada-minomi.png",
            felicidad: "img/huella-dorada-minomi.png",
            limpieza: "img/huella-dorada-minomi.png",
            energia: "img/huella-dorada-minomi.png"
        },
        claseIconoEstado: "h-3.5 w-3.5 drop-shadow-[0_0_4px_rgba(250,204,21,0.9)]",
        claseMedia: "",
        medios: {
            nacer: "img/nacer.mp4",
            alimentar: "img/alimentar.mp4",
            jugar: "img/jugar.mp4",
            dormir: "img/dormir.mp4",
            duchar: "img/duchar.mp4",
            reprender: "img/reprender.mp4",
            acariciar: "img/acariciar.mp4",
            gameOver: "img/sinenergia.mp4"
        }
    },
    {
        id: "lumi",
        nombre: "Lumi",
        creador: "Yordano Gil",
        imagen: "./img/juego.png",
        claseImagen: "",
        etiqueta: "Energética",
        colorAcento: "#7dd3fc",
        descripcion: "Una tamagotchi energética con estilo pixel; le encanta jugar y reaccionar a cada cuidado.",
        descripcionJuego: "Lumi ya está lista para jugar contigo.",
        personalidad: "Lumi es juguetona y cariñosa, le encanta que la cuiden con fotos bonitas y muchos mimos.",
        iconosEstado: {
            salud: "img/star.svg",
            felicidad: "img/star.svg",
            limpieza: "img/star.svg",
            energia: "img/star.svg"
        },
        claseIconoEstado: "h-3.5 w-3.5",
        claseMedia: "scale-125",
        medios: {
            nacer: "img/juego.png",
            alimentar: "img/comida.png",
            jugar: "img/juego.png",
            dormir: "img/sueño.png",
            duchar: "img/ducha.png",
            reprender: "img/regaño.png",
            acariciar: "img/caricia.png",
            gameOver: "img/muerte.png"
        }
    },
    {
        id: "tayo",
        nombre: "Tayo Tayo",
        creador: "Joel Moussi",
        imagen: "./img/tayotayo.jpg",
        claseImagen: "",
        etiqueta: "Estratega",
        colorAcento: "#fcd34d",
        descripcion: "Una mascota virtual con reglas claras y ritmo constante: cuida sus estados para no perder la partida.",
        descripcionJuego: "Tayo Tayo ya está listo para jugar contigo.",
        personalidad: "Tayo Tayo es constante y estratega: necesita equilibrio entre energía, salud, limpieza y felicidad.",
        iconosEstado: {
            salud: "corazon",
            felicidad: "estrella",
            limpieza: "gota",
            energia: "rayo"
        },
        claseIconoEstado: "",
        claseMedia: "",
        medios: {
            nacer: "img/pantalla-principal.webm",
            alimentar: "img/comiendo.webm",
            jugar: "img/jugar.webm",
            dormir: "img/dormir.webm",
            duchar: "img/ducha.webm",
            reprender: "img/reprender.webm",
            acariciar: "img/assets_videos_acariciar.webm",
            gameOver: "img/juego-terminado.webm"
        }
    }
];

const actualizarConfiguracionMascota = (idMascota) => {
    // find busca el objeto cuyo id coincide con la mascota seleccionada.
    const configuracion = mascotas.find((mascota) => mascota.id === idMascota) || mascotas[0];
    const nombre = configuracion.nombre;

    // Expone la configuración elegida a la lógica general del juego.
    window.configuracionMascota = configuracion;

    // Cada recurso multimedia se guarda junto al mensaje que debe mostrar.
    videoNacer = {
        video: configuracion.medios.nacer,
        mensaje: "Tu Tamagotchi ha nacido."
    };
    videoAlimentar = {
        video: configuracion.medios.alimentar,
        mensaje: `${nombre} ha comido.`
    };
    videoJugar = {
        video: configuracion.medios.jugar,
        mensaje: `${nombre} se divierte jugando.`
    };
    videoDormir = {
        video: configuracion.medios.dormir,
        mensaje: `${nombre} está durmiendo.`
    };
    videoDuchar = {
        video: configuracion.medios.duchar,
        mensaje: `${nombre} se está duchando.`
    };
    videoReprender = {
        video: configuracion.medios.reprender,
        mensaje: `${nombre} ha sido reprendido.`
    };
    videoAcariciar = {
        video: configuracion.medios.acariciar,
        mensaje: `${nombre} ha sido acariciado.`
    };
    gameOver = {
        video: configuracion.medios.gameOver,
        mensaje: `${nombre} se ha quedado sin salud y energía.<br>Fin del juego.`
    };
};
