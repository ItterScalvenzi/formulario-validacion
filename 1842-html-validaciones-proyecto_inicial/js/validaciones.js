export function validar(input){
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }
}

const validadores = {
    nacimiento : (input) => validarNacimiento(input),
};

function validarNacimiento(input){
    const fechaNacimiento = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaNacimiento)){
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear()+18, fecha.getUTCMonth(), fecha.getUTCDate());
    return fechaActual>= diferenciaFechas;
}