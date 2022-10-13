export function validar(input){
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoInput, input);
    }
}

const tipoDeErrores =[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre:{
        valueMissing : "El campo nombre no puede estar vacio",   
    },
    email:{
        valueMissing: "El campo email no puede estar vacio",
        typeMismatch: "El correo no es válido",
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra mayúscula, una minúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento:{
        valueMissing: "El campo fecha no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    }
}

function mostrarMensajeDeError(tipoInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            console.log(error);
            console.log(mensajesDeError[tipoInput][error]);
            mensaje = mensajesDeError[tipoInput][error];
        }
    });
    return mensaje;
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