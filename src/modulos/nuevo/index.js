

import Handlebars from 'handlebars';
import { guid } from '../../utils';

import template from './template.html';

let mensaje = '';

let database;

export default (_database) => {
  database = _database;
  render();
};

const crearNuevaOpinion = (e) => {

  e.preventDefault();

  const opinion = {
    	id: guid(),
    	articulo: document.getElementById('articulo').value,
    	calificacion: document.getElementById('calificacion').value,
	comentario: document.getElementById('comentario').value,
	empresa: document.getElementById('empresa').value,
	fecha: document.getElementById('fecha').value,
	nombre: document.getElementById('nombre').value,
  };
console.log(opinion);
  database.ref(`opiniones/${opinion.id}`).set({
    fecha: opinion.fecha,
    nombre: opinion.nombre,
    empresa: opinion.empresa,
    articulo: opinion.articulo,
    comentario: opinion.comentario,
    calificacion: opinion.calificacion,
  })
  .then(() => {
    mensaje = 'Opinion guardada correctamente!';
    render();
  });

  return false;
};

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({mensaje});
	document.getElementById('boton-nuevo').onclick = crearNuevaOpinion;
}
