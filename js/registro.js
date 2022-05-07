function registrar_usuario(){
  let datos = new FormData();
  datos.append('nombre', document.querySelector('#nombre').value);
  datos.append('apellido', document.querySelector('#apellido').value);
  datos.append('correo', document.querySelector('#correo').value);
  datos.append('pass', document.querySelector('#pass').value);
  let url ="action/registro_usuario.php";
  let opt = {
    method:"POST",
    body:datos
  };
  fetch(url,opt)
    .then(response => response.text())
    .then(data => proceso(data) );
}
function limpiar_pantalla(){
  document.querySelector("#nombre").value = "";
  document.querySelector("#apellido").value = "";
  document.querySelector("#correo").value = "";
  document.querySelector("#pass").value = "";
}
function proceso (salida){
  let nodo = new nodos();
  if (salida === "1"){
    var id = "info";
    var texto = "Usted se ha registrado satisfactoriamente, solo queda que ingrese en la opcion login para acceder a todas las opciones";
    limpiar_pantalla();
  }else{
    var id ="error";
    var texto = "No se pudo hacer el registro, por favor verifique los datos ingresados";
  } 
  nodo.borrar ("salida","contenido"); 
  nodo.crear('div','salida','salida','contenido');
  nodo.crear("p",id,id,"salida"); 
  nodo.crearTexto(id,texto);
}

