async function tableData() {
    const options = {
        method: 'GET',
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Parsear la respuesta JSON
        
        const datahoy = data.pronostico.hoy;
        const datamañana = data.pronostico.manana;

        function crearTablaTiempo(datahoy, datamañana) {
            // Seleccionar los elementos de la tabla
            const thead = document.querySelector('.for-hour-table-head tr');
            const tbody = document.querySelector('.for-hour-table-body');
        
            // Seleccionar las filas existentes para agregar nuevas celdas
            const filaEstadoCielo = tbody.querySelector('#table-weather');
            const filaTemperatura = tbody.querySelector('#table-temperature');
            const filaHumedad = tbody.querySelector('#table-humidity').parentNode.parentNode;
            const filaLluvia = tbody.querySelector('#table-rain');
            const filaViento = tbody.querySelector('#table-wind');
        
            // Obtener la hora actual
            const horaAtrasada = (new Date().getHours()) - 2;
            const horaActual = new Date().getHours() + ':00';
            
            const prob_tormentaHoy = (data.pronostico.hoy.prob_tormenta.reduce((acc, valor) => acc + valor, 0)) / data.pronostico.hoy.prob_tormenta.length ;
            const prob_tormentaMañana = (data.pronostico.manana.prob_tormenta.reduce((acc, valor) => acc + valor, 0)) / data.pronostico.manana.prob_tormenta.length ;

            // Supongamos que 'data' contiene la información necesaria
            const grades_now = data.temperatura_actual;

            // Encuentra el índice de coincidencia
            const cuincidenciGrades = data.pronostico.hoy.temperatura;
            let indiceCoincidencia = -1;

            for (let i = 0; i < cuincidenciGrades.length; i++) {
                if (cuincidenciGrades[i] === grades_now) {
                    indiceCoincidencia = i;
                    break;
                }
            }

            // Hora actual para ajustar los horarios

            // Pronósticos de hoy
            const pronosticosHoy = datahoy.temperatura.map((item, index) => ({
                hora: index, // Ajustar si es necesario
                temperatura: item,
                estadoCielo: datahoy.estado_cielo_descripcion[index],
                humedad: prob_tormentaHoy,
                lluvia: datahoy.precipitacion[index],
                viento: datahoy.viento[index]
            }));

            // Pronósticos de mañana
            const pronosticosManana = datamañana.temperatura.map((item, index) => ({
                hora: index, // Ajustar si es necesario
                temperatura: item,
                estadoCielo: datamañana.estado_cielo_descripcion[index],
                humedad: prob_tormentaMañana,
                lluvia: datamañana.precipitacion[index],
                viento: datamañana.viento[index]
            }));

            // Función para ajustar la hora y reiniciar después de 24
            const ajustarHora = (hora) => hora % 24;
            

            // Ajusta las horas para los pronósticos de hoy
            const pronosticosHoyAjustados = pronosticosHoy.map((item, index) => {
                let horaAjustada = index;
                if (index >= indiceCoincidencia) {
                    horaAjustada = index - indiceCoincidencia + horaAtrasada;
                } else {
                    horaAjustada = index + pronosticosHoy.length - indiceCoincidencia + horaAtrasada;
                }
                return {
                    ...item,
                    hora: `${ajustarHora(horaAjustada)}:00`
                };
            });

            // Ajusta las horas para los pronósticos de mañana
            const pronosticosMananaAjustados = pronosticosManana.map((item, index) => {
                let horaAjustada = index + pronosticosHoy.length;
                horaAjustada = horaAjustada + horaAtrasada;
                return {
                    ...item,
                    hora: `${ajustarHora(horaAjustada)}:00`
                };
            });

            // Combina los datos de hoy y mañana
            const pronosticosFiltrados = [];
            const cuincidenciHour = horaActual;

            // Usar un bucle for para iterar sobre el array
            for (let i = 0; i < pronosticosHoyAjustados.length; i++) {
            const item = pronosticosHoyAjustados[i];
            
            // Verificar si la hora de item está en cuincidenciHour y es mayor o igual a la hora actual
            if (cuincidenciHour.includes(item.hora) && item.hora >= horaActual) {
                pronosticosFiltrados.push(item);
            }
            }

            // Mostrar resultados filtrados
            pronosticosFiltrados.forEach(item => {
            console.log(`Hora: ${item.hora}, Temperatura: ${item.temperatura}`);
            });


        }

        crearTablaTiempo(datahoy, datamañana);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

tableData();
