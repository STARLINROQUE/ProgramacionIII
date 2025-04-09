let currentPage = 1;
let formData = {
    datosPersonales: {},
    familiares: [],
    condicionesSalud: {},
    internamientos: []
};

// Función para cambiar de página
function showPage(page) {
    document.querySelectorAll(".form-page").forEach(p => p.classList.remove("active"));
    document.getElementById(`page${page}`).classList.add("active");
    updateProgress(page);
    updateHeader(page);
}

// Avanzar de página
function nextPage(page) {
    showPage(page + 1);
}

// Retroceder de página
function prevPage(page) {
    showPage(page - 1);
}

// Actualizar la barra de progreso
function updateProgress(page) {
    let progressBar = document.getElementById("progress-bar");
    let width = (page - 1) * 20; 
    progressBar.style.width = `${width}%`;
}

// Actualizar encabezado con el nombre
function updateHeader(page) {
    if (page === 1) {
        let nombre = document.getElementById("nombre").value;
        if (nombre) {
            document.getElementById("nombreEncabezado").textContent = `Formulario de Datos - ${nombre}`;
        } else {
            document.getElementById("nombreEncabezado").textContent = `Formulario de Datos`;
        }
    }
}

// Añadir familiar
function addFamiliar() {
    let nombre = document.getElementById("famNombre").value;
    let parentesco = document.getElementById("famParentesco").value;
    let edad = document.getElementById("famEdad").value;

    if (nombre && parentesco && edad) {
        formData.familiares.push({ nombre, parentesco, edad });
        actualizarFamiliares();
        document.getElementById("famNombre").value = "";
        document.getElementById("famParentesco").value = "";
        document.getElementById("famEdad").value = "";
    }
}

// Mostrar lista de familiares
function actualizarFamiliares() {
    let lista = document.getElementById("listaFamiliares");
    lista.innerHTML = "";
    formData.familiares.forEach(fam => {
        let li = document.createElement("li");
        li.textContent = `${fam.nombre} - ${fam.parentesco} - ${fam.edad} años`;
        lista.appendChild(li);
    });
}

// Guardar datos y mostrar resumen
function guardarDatos() {
    // Guardar datos personales
    formData.datosPersonales = {
        nombre: document.getElementById("nombre").value,
        edad: document.getElementById("edad").value
    };

    // Guardar condiciones de salud
    formData.condicionesSalud = {
        enfermedad: document.getElementById("enfermedad").value,
        tiempo: document.getElementById("tiempoEnfermedad").value
    };

    // Guardar internamientos
    let fecha = document.getElementById("fechaInternamiento").value;
    let centro = document.getElementById("centroMedico").value;
    let diagnostico = document.getElementById("diagnostico").value;

    if (fecha && centro && diagnostico) {
        formData.internamientos.push({ fecha, centro, diagnostico });
    }

    // Guardar en LocalStorage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Llamar a la función para actualizar la página 5
    actualizarResumen();

    // Completar la barra de progreso y reiniciar al inicio
    document.getElementById("progress-bar").style.width = "100%";
    setTimeout(() => {
        alert("Datos guardados correctamente");
        showPage(1); // Volver al inicio
        document.getElementById("progress-bar").style.width = "0%"; // Reiniciar barra
    }, 1000); // Después de 1 segundo vuelve al inicio
}

// Función para actualizar la visualización del resumen
function actualizarResumen() {
    let data = JSON.parse(localStorage.getItem("formData"));

    if (data) {
        // Mostrar datos personales
        document.getElementById("resNombre").textContent = data.datosPersonales.nombre || "No registrado";
        document.getElementById("resEdad").textContent = data.datosPersonales.edad || "No registrado";

        // Mostrar familiares
        let tablaFamiliares = document.getElementById("tablaFamiliares").getElementsByTagName('tbody')[0];
        data.familiares.forEach(fam => {
            let row = tablaFamiliares.insertRow();
            row.insertCell(0).textContent = fam.nombre;
            row.insertCell(1).textContent = fam.parentesco;
            row.insertCell(2).textContent = fam.edad;
        });

        // Mostrar condiciones de salud
        document.getElementById("resEnfermedad").textContent = data.condicionesSalud.enfermedad || "No registrado";
        document.getElementById("resTiempoEnfermedad").textContent = data.condicionesSalud.tiempo || "No registrado";

        // Mostrar internamientos
        let tablaInternamientos = document.getElementById("tablaInternamientos").getElementsByTagName('tbody')[0];
        data.internamientos.forEach(intern => {
            let row = tablaInternamientos.insertRow();
            row.insertCell(0).textContent = intern.fecha;
            row.insertCell(1).textContent = intern.centro;
            row.insertCell(2).textContent = intern.diagnostico;
        });
    }
}

showPage(currentPage);
