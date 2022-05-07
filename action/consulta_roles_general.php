<?php 
include ('../clases/roles.php');
include ('../clases/coneccion.php');
if (isset($_POST['id_usuario'])){
 $idu = $_POST['id_usuario'];
}else{
 $idu = "";
}
if (isset($_POST['id_grupo'])){
  $rol = new Roles();
  $salida = $rol->consultar_rol($idu,$_POST['id_grupo']);
}else{
  $salida = [];
}
echo json_encode($salida);
?>
