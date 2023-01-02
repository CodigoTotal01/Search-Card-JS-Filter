// variables de nuestro select de html
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
// contenedor para mostrar los resultados
const resultado = document.querySelector("#resultado");
//Date permite trabajar con fechas y horas ---> metodo getFullYear();--> entrga la fecha actual de manera automatica, es decir nunca hay que meterle mano :D 
// lo emlpearemos para hacer la cuenta de que años tenemos neustros utomoviles 
const max = new Date().getFullYear();
// minimo de años que tendremos autos 
const min = max - 10;


//generando un objeto para almacenar los datos de la busqueda
const datosBusqueda = {
    marca: "",
    year: "",
    minimo: "",
    maximo: "",
    puertas: "",
    transmision: "",
    color: "",
}



// generar los años en el select 
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcionAños = document.createElement("option");
        opcionAños.value = i;
        opcionAños.textContent = i;
        year.appendChild(opcionAños);
    }
}


// Evetost de nuestro programa 
document.addEventListener("DOMContentLoaded", () => {
    //mustra los autos de neustra base de "datos"
    mostrarAutos(autos);
    llenarSelect();
});

// Limpieza del html 
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
// El evento change se activa cuando el elemento finaliza un cambio. --> empleable en inpust y para este caso un selec despues ede erder el foco de enfoque
// Event listener para los select de búsqueda

//eventos que ocurriran cuando cambie algo en los select 
marca.addEventListener("change", e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

// funcion para filtrar la marca del auto 
year.addEventListener("change", e =>{
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});

minimo.addEventListener("change", e =>{
    datosBusqueda.minimo=e.target.value;

    filtrarAuto();
    
});

color.addEventListener("change", e=>{
    datosBusqueda.color=e.target.value;

    filtrarAuto();
});

maximo.addEventListener("change", e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});


puertas.addEventListener("change", e=>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});


transmision.addEventListener("change", e=>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});
//funciones hijas de padre

function filtrarMarca(auto) {
    // destrugturing 
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}
function filtrarYear(auto){
    const {year} = datosBusqueda;
    if (year){
        return auto.year === year;
    }
    return auto;


}

//function for filter min price 
function filtrarMin(auto){
    const {minimo}= datosBusqueda;
    if (minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMax(auto){
    const {maximo} = datosBusqueda;
    if (maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

// filtrar puertas

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if (puertas){
        return auto.puertas === puertas;
    }
    return auto;
}


function filtrarColor(auto){
    const {color} = datosBusqueda;
    if (color){
        return auto.color === color;
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if (transmision){
        return auto.transmision=== transmision;
    }
    return auto;
}

// funcion maestra de filtrado
function filtrarAuto() {
    // constante de una array para filtrar nuestros datos 
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMin).filter(filtrarMax).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    
    if (resultado.length>0) {
        mostrarAutos(resultado);
    } else{
        noResultado();
    }
    console.log(resultado);
}






// itera arreglo de objetos auto
function mostrarAutos(autos) {
    limpiarHTML();
    autos.forEach(auto => {

        // destrugturing 
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        //creamos una variable que cree un elemto parrafo htm para mostrar nuestros datos de carrro 
        const autoHTML = document.createElement("p");
        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
    
    `;

        // insertando html en neustro documento 
        resultado.appendChild(autoHTML);
       
    });
   
}

//funcion para demostrar que no hay resoltadso discponibles 

function noResultado(){
    // limpiaremso el html primero
    limpiarHTML();
    const noResultado = document.createElement("div");
    noResultado.classList.add("alerta", "error");
    noResultado.textContent="No hay resultados para la pendejada solicitada";
    // despues de crearlo ahora se añadira en el  html ()
    resultado.appendChild(noResultado);
}