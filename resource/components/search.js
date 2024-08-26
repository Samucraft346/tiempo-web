const urlSeach = 'https://www.el-tiempo.net/api/json/v2/provincias';

async function fetchData() {
    const options = {
        method: 'GET',
    };

    try{
        const response = await fetch(urlSeach, options);
        const data = await response.json(); // Parsear la respuesta JSON
        console.log(data)

        const datosProvincias = data.provincias;

        datosProvincias.forEach(item => {
            datosProvincias.forEach(item => {
            let span = document.createElement('div');

            span.textContent = `${item.COMUNIDAD_CIUDAD_AUTONOMA}, ${item.NOMBRE_PROVINCIA}`;

            let padre = document.getElementById('input-container');
            padre.appendChild(span);

            padre.appendChild(document.createTextNode(' ')); // Añade un espacio
        });

        });

    } catch (error) {
        console.error('Error al obtener datos:', error);
    };
};

fetchData();