<?php 
if (isset($_POST['id_grupo']) and isset($_POST['id_usuario'])){
  include ("../clases/coneccion.php");
  include ("../clases/roles.php");
  $lista =[$_POST['id_grupo'],$_POST['id_usuario'],0,0,0,0,0,0,0];
  $roles1 = new Roles();
  $respuesta = $roles1->cargar_rol($lista);
  echo $respuesta;
}
?>
