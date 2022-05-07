function ingresar_login(){
  let mis_datos = new FormData();
  mis_datos.append('usuario', document.querySelector('.usuario').value);
  mis_datos.append('pass', document.querySelector('.pass').value);

  let  opt ={
    method:"POST",
    body:mis_datos
  };
  let url = "action/login.php";
  fetch(url,opt)
    .then(respuesta=>respuesta.text())
    .then(data => redireccion(data));
}
function ingresar_registro(){
  window.location.href="registro.php";
}
function redireccion (data){
  if (data === "1"){
    window.location.href="index.php"
  }else{
    window.location.href="index.php?destino=login&log=no";
  }
}
