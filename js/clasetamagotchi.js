class Tamagotchi {
    // Atributos privados: solo se usan desde dentro de la clase.
    #felicidad;
    #salud;
    #limpieza;
    #energia;
    #enVida;

    constructor(nombre, descripcion, imagen) {
        // Atributos públicos: se pueden consultar directamente desde fuera.
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;

        // Los estados comienzan con valores aleatorios entre 1 y 10.
        this.#salud = Math.floor(Math.random() * 10) + 1;
        this.#felicidad = Math.floor(Math.random() * 10) + 1;
        this.#limpieza = Math.floor(Math.random() * 10) + 1;
        this.#energia = Math.floor(Math.random() * 10) + 1;
        // Todo Tamagotchi comienza vivo.
        this.#enVida = true;
    }

    // Los getters permiten consultar atributos privados.
    get felicidad() {
        return this.#felicidad;
    }

    // Los setters permiten modificarlos de forma controlada.
    set felicidad(valor) {
        this.#felicidad = this.#limitarValor(valor);
    }

    get salud() {
        return this.#salud;
    }

    set salud(valor) {
        this.#salud = this.#limitarValor(valor);
    }

    get limpieza() {
        return this.#limpieza;
    }

    set limpieza(valor) {
        this.#limpieza = this.#limitarValor(valor);
    }

    get energia() {
        return this.#energia;
    }

    set energia(valor) {
        this.#energia = this.#limitarValor(valor);
    }

    get enVida() {
        return this.#enVida;
    }

    alimentar() {
        this.energia += 3;
        this.felicidad += 2;
        this.limpieza -= 1;
        this.comprobarVida();
    }

    jugar() {
        this.felicidad += 2;
        this.energia -= 2;
        this.limpieza -= 2;
        this.comprobarVida();
    }

    dormir() {
        this.energia += 5;
        this.salud += 2;
        this.comprobarVida();
    }

    duchar() {
        this.salud += 3;
        this.limpieza = 10;
        this.comprobarVida();
    }

    reprender() {
        this.felicidad -= 3;
        this.salud -= 2;
        this.comprobarVida();
    }

    acariciar() {
        this.felicidad += 4;
        this.comprobarVida();
    }

    // El temporizador llama a este método cada 5 segundos.
    restarVida() {
        this.salud -= 1;
        this.felicidad -= 1;
        this.limpieza -= 1;
        this.energia -= 1;
        this.comprobarVida();
    }

    // Muere únicamente cuando salud y energía llegan a cero.
    comprobarVida() {
        if (this.#salud === 0 && this.#energia === 0) {
            this.#enVida = false;
        }
    }

    // Evita que los estados bajen de 0 o superen 10.
    #limitarValor(valor) {
        return Math.max(0, Math.min(10, valor));
    }
}
