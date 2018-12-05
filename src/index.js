import Navigo from 'navigo';
import firebase from 'firebase';
import catchLinks from 'catch-links';

import listar from './modulos/listar';
import nuevo from './modulos/nuevo';
import $ from 'jquery';
import firebaseConfig from 'firebase.config';

//import './index.scss';

firebase.initializeApp(firebaseConfig);

const database = firebase.database();


var root = null;
var useHash = false;

var router = new Navigo(root, useHash);

router
	.on({
		'listar': () => listar(database),
		'nuevo': () => nuevo(database),
	})
	.resolve();


catchLinks(window, function (href) {
    router.navigate(href);
});

// login de google - login de google

var provider = new firebase.auth.GoogleAuthProvider();


// This gives you a Google Access Token. You can use it to access the Google API.


$('#login').click(function(){
	firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
		console.log(result.user);
		guardarDatos(result.user);
	 $('#login').hide(); //TEST JQUERY BUTTON
	//$('#root').append("<h1>"+result.displayName+"</h1>");
});
});

function guardarDatos(user){
	var usuario = {
		uid: user.uid,
		nombre: user.displayName,
		email: user.email,
		foto: user.photoURL
	}
firebase.database().ref("testdatosGmail/"+user.uid).set(usuario)//actualiza el usuario si esta sino lo agrega.. asino hay duplicados
}

//login de google
/*
$('#login').click(function(){
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
});*/

