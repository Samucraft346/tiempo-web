async function fetchData() {
  const url = 'https://www.el-tiempo.net/api/json/v2/provincias/19/municipios/19001';
  const options = {
    method: 'GET',
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); // Parsear la respuesta JSON
    console.log(data)

    // Obtener la localización y mostrar en el DOM
    const location = data.municipio.NOMBRE;
    document.getElementById('location').textContent = location;

    // Obtener la localización y mostrar en el DOM
    const location_province = data.municipio.NOMBRE_PROVINCIA;
    document.getElementById('location_province').textContent = location_province;

    // Obtener y mostrar los grados actuales en el DOM
    const grades_now = data.temperatura_actual;
    document.getElementById('grades_now').textContent = grades_now + 'ºC';

    // Comparar la temperatura actual con las temperaturas pronosticadas para hoy
    const pronosticoHoy = data.pronostico.hoy.temperatura;
    let indiceCoincidencia = -1;

    for (let i = 0; i < pronosticoHoy.length; i++) {
      if (pronosticoHoy[i] === grades_now) {
        indiceCoincidencia = i;
        break;
      }
    }

    // Obtener la sensacion termica y mostrar en el DOM
    const termic_sensation = data.pronostico.hoy.sens_termica[indiceCoincidencia];
    document.getElementById('termic_sensation').innerHTML += termic_sensation + 'ºC';

    // Obtener min termico y mostrar en el DOM
    const grades_min = data.temperaturas.min;
    document.getElementById('grades_min').innerHTML += grades_min + 'ºC';

    // Obtener min termico y mostrar en el DOM
    const grades_max = data.temperaturas.max;
    document.getElementById('grades_max').innerHTML += grades_max + 'ºC';

    // Obtener estado del tiempo y mostrarlo en DOM
    const weather_state = data.pronostico.hoy.estado_cielo_descripcion[indiceCoincidencia]
    const weather_state_description = data.pronostico.hoy.estado_cielo_descripcion[indiceCoincidencia]
    switch (true) {
      case weather_state === 'Nuboso':
        document.getElementById('state').setAttribute('src', '/resource/estados_tiempo/nublado.png');
        document.getElementById('weather_description').textContent = weather_state_description;
      break
      case weather_state === 'Despejado':
        document.getElementById('state').setAttribute('src', '/resource/estados_tiempo/sol.png');
        document.getElementById('weather_description').textContent = weather_state_description;
        break;
      case weather_state === 'Muy nuboso':
        document.getElementById('state').setAttribute('src', '/resource/estados_tiempo/muy_nublado.png');
        document.getElementById('weather_description').textContent = weather_state_description;
        break;
      case weather_state === 'Cubierto':
        document.getElementById('state').setAttribute('src', '/resource/estados_tiempo/nublado.png');
        document.getElementById('weather_description').textContent = weather_state_description;
        break;
      default:
        if (weather_state.includes('nuboso')) {
          document.getElementById('state').setAttribute('src', '/resource/estados_tiempo/nublado.png');
          document.getElementById('weather_description').textContent = weather_state_description;
        } else if (weather_state.includes('lluvia')) {
          document.getElementById('state').setAttribute('src', '/resource/estados_tiempo/lluvia.png');
          document.getElementById('weather_description').textContent = weather_state_description;
        } else if (weather_state.includes('tormenta')) {
          document.getElementById('state').setAttribute('src', '/resource/estados_tiempo/tormenta.png');
          document.getElementById('weather_description').textContent = weather_state_description;
        } else if (weather_state.includes('nieve')) {
          document.getElementById('state').setAttribute('src', '/resource/estados_tiempo/nieve.png');
          document.getElementById('weather_description').textContent = weather_state_description;
        } else if (weather_state.includes('granizo')) {
          document.getElementById('state').setAttribute('src', '/resource/estados_tiempo/granizo.png');
          document.getElementById('weather_description').textContent = weather_state_description;
        }
        break;
    }

    // Obtener prob. lluvia y mostrarlo en DOM
    const prob_lluvia = data.lluvia
    document.getElementById('prob_lluvia').textContent = 'Prob. lluvia: ' + prob_lluvia + '%'

    // Obtener lluvia y mostrarlo en DOM
    const lluvia = data.precipitacion
    document.getElementById('lluvia').textContent = 'Lluvia: ' + lluvia + ' l/m2'

    // Obtener humedad y mostrarlo en DOM
    const humedad = data.humedad
    document.getElementById('humedad').textContent = 'Humedad: ' + humedad + '%'

    // Obtener viento y mostrarlo en DOM
    const viento = data.viento
    document.getElementById('viento').textContent = 'Viento: ' + viento + 'km/h'

    // Obtener uv y mostrarlo en DOM
    const uv = data.proximos_dias[0].uv_max
    document.getElementById('uv').textContent = 'Índice max. uv: ' + uv

    // Obtener viento y mostrarlo en DOM
    const sunrise = data.pronostico.hoy['@attributes'].orto
    document.getElementById('sunrise').textContent = sunrise

    // Obtener sun y mostrarlo en DOM
    const sunset = data.pronostico.hoy['@attributes'].ocaso
    document.getElementById('sunset').textContent = sunset

  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

fetchData(); // Llamar a la función async
