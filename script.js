// script.js (mismo código que antes, no necesita cambios por la nueva distribución)

document.addEventListener('DOMContentLoaded', () => {
    const recomendarBtn = document.getElementById('recomendarBtn');
    const climaActualSpan = document.getElementById('climaActual');
    const horaActualSpan = document.getElementById('horaActual');
    const diaActualSpan = document.getElementById('diaActual');
    const recomendacionOutput = document.getElementById('recomendacionOutput');

    // --- Función para obtener y mostrar las condiciones ambientales actuales ---
    function obtenerCondicionesAmbientales() {
        const now = new Date();
        const hora = now.getHours(); // 0-23
        const diaSemana = now.getDay(); // 0 (Domingo) - 6 (Sábado)

        // Simulación de Clima: un valor entre 0 y 10.
        // Basado en la ubicación y fecha/hora actuales (San Bernardo, 21 de junio de 2025, 10:31 PM, invierno)
        // La probabilidad de clima "soleado" es baja. Simulemos hacia nublado/lluvioso.
        const climaSimulado = Math.floor(Math.random() * 6); // Mayor probabilidad de 0-5 (lluvioso/nublado)
        let climaTexto = "";
        if (climaSimulado <= 2) { // 0, 1, 2
            climaTexto = "Lluvioso 🌧️";
        } else if (climaSimulado <= 5) { // 3, 4, 5
            climaTexto = "Nublado ☁️";
        } else { // Esto es poco probable con el rango 0-5, pero se mantiene la lógica
            climaTexto = "Soleado ☀️";
        }

        // Determinar Hora
        let horaTexto = "";
        if (hora >= 5 && hora < 12) {
            horaTexto = "Mañana 🌅";
        } else if (hora >= 12 && hora < 19) {
            horaTexto = "Tarde 🏙️";
        } else {
            horaTexto = "Noche 🌙";
        }

        // Determinar Día
        // 0 (Domingo) y 6 (Sábado) son fin de semana. Hoy (21 de junio de 2025) es viernes.
        const diaTexto = (diaSemana === 0 || diaSemana === 6) ? "Fin de Semana 🎉" : "Laboral 🏢";

        // Actualizar el DOM con los valores detectados/simulados
        climaActualSpan.textContent = climaTexto;
        horaActualSpan.textContent = horaTexto;
        diaActualSpan.textContent = diaTexto;

        // Devolver los valores "crudos" para la lógica de recomendación
        return {
            clima: climaTexto.split(' ')[0].toLowerCase(),
            hora: horaTexto.split(' ')[0].toLowerCase(),
            dia: diaTexto.split(' ')[0].toLowerCase() // "laboral" o "fin"
        };
    }

    // --- Lógica de Recomendación (Simulada en JavaScript) ---
    function obtenerRecomendacion(tipoTurista, foodie, shopping, condicionesAmbientales) {
        const { clima, hora, dia } = condicionesAmbientales;
        let recomendacion = "No hay una recomendación clara. Intenta otras opciones.";

        // --- Reglas Difusas Simplificadas ---
        const esLluvioso = clima === 'lluvioso';
        const esNublado = clima === 'nublado';
        const esSoleado = clima === 'soleado';
        const esManana = hora === 'mañana';
        const esTarde = hora === 'tarde';
        const esNoche = hora === 'noche';
        const esLaboral = dia === 'laboral';
        const esFinde = dia === 'fin';

        // Reglas basadas en el Tipo de Turista
        if (tipoTurista === 'explorador') {
            if (esSoleado && esFinde) recomendacion = "Parque Metropolitano (Cerro San Cristóbal) 🌳";
            else if (esNublado || esLluvioso) recomendacion = "Museo Interactivo Mirador (MIM) o Centro de Ski El Colorado (si hay nieve) ⛷️";
            else if (foodie) recomendacion = "Mercado Central o La Vega 🍎";
            else recomendacion = "Explora los senderos del Cajón del Maipo 🏞️";
        } else if (tipoTurista === 'historiador') {
            if (esLluvioso || esNublado || esLaboral) recomendacion = "Museo Histórico Nacional o Museo de Bellas Artes 🏛️";
            else if (esSoleado) recomendacion = "Visita el Barrio Cívico y el Palacio de La Moneda 🏰";
            else recomendacion = "Explora iglesias históricas o el Cementerio General ⚰️";
        } else if (tipoTurista === 'creativo') {
            if (shopping) recomendacion = "Barrio Lastarria o Barrio Italia (galerías y diseño) 🎨🛍️";
            else if (esLluvioso || esNoche) recomendacion = "Café literario o un evento cultural en el GAM 🎭";
            else recomendacion = "Galería de Arte contemporáneo o talleres de artesanía local 🖌️";
        } else if (tipoTurista === 'aesthetic') {
            if (foodie && esTarde) recomendacion = "Café de especialidad en el Barrio Italia ☕📸";
            else if (esSoleado) recomendacion = "Parque Bicentenario o los murales de San Miguel 🏞️🖼️";
            else if (shopping) recomendacion = "Tiendas de diseño o boutiques de ropa vintage 👗✨";
            else recomendacion = "Un mirador con vistas panorámicas de la ciudad 🌃";
        }

        // Reglas generales (pueden sobrescribir o complementar las anteriores)
        if (foodie && esNoche) recomendacion = "Un buen restaurante en el Barrio Manuel Montt o Bellavista 🍽️";
        if (foodie && !shopping) recomendacion = "Recorrido gastronómico por el Barrio Franklin 🌭";
        if (shopping && !foodie) recomendacion = "Centro Comercial Costanera Center o Outlet Buenaventura 🛒";
        if (esLluvioso && (foodie || shopping)) recomendacion = "Centro Comercial o Mall Plaza Sur ☔";
        if (esFinde && esSoleado && !foodie && !shopping) recomendacion = "Un picnic en el Parque O'Higgins o Parque Araucano 🧺";

        // Si después de todas las reglas no hay una recomendación específica, dar una genérica.
        if (recomendacion === "No hay una recomendación clara. Intenta otras opciones." && (foodie || shopping)) {
            if (foodie) recomendacion = "Prueba un café o un restaurante local 😋";
            if (shopping) recomendacion = "Visita alguna tienda interesante en el centro 🛍️";
        } else if (recomendacion === "No hay una recomendación clara. Intenta otras opciones.") {
             recomendacion = "Considera un café si hace frío, o un parque si hace buen tiempo 🚶‍♀️";
        }

        return recomendacion;
    }

    // --- Event Listener para el botón de recomendación ---
    recomendarBtn.addEventListener('click', () => {
        const selectedTurista = document.querySelector('input[name="tipoTurista"]:checked').value;
        const selectedFoodie = document.querySelector('input[name="foodie"]:checked').value === 'si';
        const selectedShopping = document.querySelector('input[name="shopping"]:checked').value === 'si';

        const condicionesAmbientales = obtenerCondicionesAmbientales(); // Esto actualiza el DOM y devuelve los valores

        const recomendacion = obtenerRecomendacion(selectedTurista, selectedFoodie, selectedShopping, condicionesAmbientales);
        recomendacionOutput.textContent = recomendacion;
    });

    // Cargar las condiciones ambientales al cargar la página por primera vez
    obtenerCondicionesAmbientales();
});
