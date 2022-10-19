
const modelos =
{
    "BMW Group": ["BMW M135i xDrive ", "BMW Serie 1 (3 puertas)" ,"BMW Serie 3 Sedán ","Nuevo BMW X2 M35i ", "BMW Z4 M40i"],
    "Ford": ["Ford Bronco", "CorollaFord Explorer" , "Ford GT", "Ford Mustang", "Ford Ranger"],
    "Renault Nissan": ["Nissan Frontier", "NISSAN SENTRA" , "Nissan Versa" , "Nuevo Nissan Kicks", "Nissan Qashqai"],
};

var registros = [];

let nombre = document.getElementById('nombre');
let dui = document.getElementById('dui');
let nit = document.getElementById('nit');

let marca = document.getElementById('marca');
let modelo = document.getElementById('modelo');
let year = document.getElementById('year');
let colores = document.getElementById('colores');
let placa = document.getElementById('placa');
let descripcion = document.getElementById('descripcion');


//Asociando función que manejará el evento load al cargar la página
if (window.addEventListener) {
    window.addEventListener("load", iniciar, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", iniciar);
}

function iniciar() {

    addOptions("marca", Object.keys(modelos)); //Se agregan la marcas

    addOptions("modelo", modelos["Honda"]); //Solo mandar el nombre del array
    mostrarDatosTabla();
    var btnAgregar = document.getElementById("btnAgregar");
    if (btnAgregar.addEventListener) {
        btnAgregar.addEventListener("click", function () {
            console.log("click");
            agregarRegistro();
        }, false);
    }
    else if (btnAgregar.attachEvent) {
        btnAgregar.attachEvent("onclick", function () {
            agregarRegistro();
        });
    }
}

function agregarRegistro() {

    var txtNombre = nombre.value;
    var txtDui = dui.value;
    var txtNit = nit.value;
    var txtPlaca = placa.value;

    if (txtNombre.length > 0 && txtDui.length > 0 && txtNit.length > 0 && txtPlaca.length > 0) {

        var duiEXP = /^[0-9]{8}-[0-9]{1}$/;
        var duiResult = duiEXP.test(txtDui);
        console.log("duiResult", duiResult);

        var nitEXP = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$/;
        var nitResult = nitEXP.test(txtNit);
        console.log("nitResult", nitResult);

        var placaEXP = /^[0-9]{3}-[0-9]{3}$/;
        var placaResult = placaEXP.test(txtPlaca);
        console.log("placaResult", placaResult);

        if (duiResult == true && nitResult == true && placaResult == true) {

            registros.push(
                {
                    'nombre': txtNombre,
                    'dui': txtDui,
                    'nit': txtNit,
                    'marca': marca.value,
                    'modelo': modelo.value,
                    'year': year.value,
                    'colores': colores.value,
                    'placa': txtPlaca,
                    'descripcion': descripcion.value,
                }
            );

            localStorage.setItem('registros', JSON.stringify(registros));
            mostrarDatosTabla();
        } else {
            console.log("Validaciones incorrectas");
        }

    } else {
        console.log("Faltan datos");
    }

}

function mostrarDatosTabla() {

    registros = JSON.parse(localStorage.getItem('registros'));
    if(registros !== null){
        console.log("registros", registros);

    var tabla = document.getElementById('tabla');

    tabla.innerHTML = "";

    var tblRegistros = "";

    if (registros.length > 0){

        registros.forEach((elemento) => {

            tblRegistros += "\t<tr>\n";

            tblRegistros += "\t\t<td>" + elemento.nombre + "</td>\n";
            tblRegistros += "\t\t<td>" + elemento.dui + "</td>\n";
            tblRegistros += "\t\t<td>" + elemento.nit + "</td>\n";
            tblRegistros += "\t\t<td>" + elemento.marca + "</td>\n";
            tblRegistros += "\t\t<td>" + elemento.modelo + "</td>\n";

            tblRegistros += "\t\t<td>" + elemento.year + "</td>\n";
            tblRegistros += "\t\t<td>" + elemento.colores + "</td>\n";
            tblRegistros += "\t\t<td>" + elemento.placa + "</td>\n";
            tblRegistros += "\t\t<td>" + elemento.descripcion + "</td>\n";

            tblRegistros += "\t\t</tr>\n";

        });
    }

    tabla.innerHTML = tblRegistros;
    }else{
        registros=[];
    }
}

marca.addEventListener("change", () => {

    //Se eliminan todos los opciones anteriores
    var options = document.querySelectorAll('#modelo option');
    options.forEach(o => o.remove());

    addOptions("modelo", modelos[marca.value]); //Solo mandar el nombre del array

});

// Función para agregar opciones a un <select>
function addOptions(domElement, array) {
    var select = document.getElementsByName(domElement)[0];

    for (value in array) {
        var option = document.createElement("option");
        option.text = array[value];
        select.add(option);
    }
}

