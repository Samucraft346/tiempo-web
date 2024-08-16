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
            let horaActual = new Date().getHours();
            
            const prob_tormentaHoy = (data.pronostico.hoy.prob_tormenta.reduce((acc, valor) => acc + valor, 0)) / data.pronostico.hoy.prob_tormenta.length ;
            const prob_tormentaMañana = (data.pronostico.manana.prob_tormenta.reduce((acc, valor) => acc + valor, 0)) / data.pronostico.manana.prob_tormenta.length ;

            // Unir y procesar los datos de hoy y mañana
            const pronosticosHoy = datahoy.temperatura.map((item, index) => ({
                hora: index,  // Ajustar si es necesario
                temperatura: item,
                estadoCielo: datahoy.estado_cielo_descripcion[index],
                humedad: prob_tormentaHoy,
                lluvia: datahoy.precipitacion[index],
                viento: datahoy.viento[index]
            }));
        

            const pronosticosManana = datamañana.temperatura.map((item, index) => ({
                hora: index,  // Ajustar si es necesario
                temperatura: item,
                estadoCielo: datamañana.estado_cielo_descripcion[index],
                humedad: prob_tormentaMañana,
                lluvia: datamañana.precipitacion[index],
                viento: datamañana.viento[index]
            }));

            const pronostico = pronosticosHoy.concat(
                pronosticosManana.map((item, index) => ({
                    ...item,
                    hora: index + pronosticosHoy.length
                }))
            );
            
            console.log(pronostico)
        }

        crearTablaTiempo(datahoy, datamañana);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

tableData();
