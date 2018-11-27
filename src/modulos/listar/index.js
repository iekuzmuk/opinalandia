
import Handlebars from 'handlebars';

import template from './template.html';

let database;

let opiniones = [];

export default (_database) => {
	database = _database;
	opiniones = [];
	listarOpiniones();
}

const listarOpiniones = () => {
	const lista = database
					.ref('/opiniones')
					.once("value")
					.then((datos_opiniones) => {
						
						datos_opiniones.forEach((element) => {
							const datosOpinion = element.val();
							datosOpinion.id = element.key;
							opiniones.push(datosOpinion);
						});
						
						render();
					});
}

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ opiniones });
}
