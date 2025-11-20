document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el formulario
    const form = document.querySelector('form');

    // Agrega un evento para escuchar cuando se envía el formulario
    form.addEventListener('submit', function(event) {
        // Previene que el formulario se envíe de la manera tradicional
        event.preventDefault();

        // Obtiene los valores de los campos del formulario
        const recordatorio = document.querySelector('input[name="name"]').value;
        const dificultad = document.querySelector('input[name="Dificultadad"]:checked');
        const fechaLimite = document.getElementById('fecha-limite').value;

        // Verifica que se haya seleccionado una dificultad
        if (!dificultad) {
            alert("Por favor, selecciona una dificultad.");
            return;
        }

        // Crea un objeto con los datos del recordatorio
        const datosRecordatorio = {
            recordatorio: recordatorio,
            dificultad: dificultad.id, // Guarda el id del input seleccionado (facil, mediano, dificil)
            fechaLimite: fechaLimite,
            id: Date.now() // Agrega un identificador único basado en la fecha
        };

        // Obtiene los recordatorios existentes de localStorage o crea un array vacío
        let recordatoriosGuardados = JSON.parse(localStorage.getItem('recordatorios')) || [];

        // Agrega el nuevo recordatorio al array
        recordatoriosGuardados.push(datosRecordatorio);

        // Guarda el array actualizado en localStorage
        localStorage.setItem('recordatorios', JSON.stringify(recordatoriosGuardados));

        // Opcional: Muestra un mensaje de confirmación
        alert("¡Recordatorio guardado con éxito!");

        // Opcional: Limpia el formulario después de guardar
        form.reset();
    });
});


// CREAR LOGICA PARA RECUPERAR LA INFORMACION DE RECORDATORIOS GUARDADOS