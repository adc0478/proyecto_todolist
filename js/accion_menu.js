
function abrir_menu(){
	document.querySelector('#menu').setAttribute('class', 'menu');
  document.querySelector('#btn_abrir').style.display="none";
	document.querySelector('#btn_cerrar').style.display="block";
}
function cerrar_menu(){
	document.querySelector('#btn_abrir').style.display="block";
	document.querySelector('#btn_cerrar').style.display="none";
	document.querySelector('#menu').removeAttribute('class')
}

