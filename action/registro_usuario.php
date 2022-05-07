<?php
include ('../clases/login.php');
$tabla_us="usuarios";
if (isset($_POST['nombre']) and isset($_POST['apellido']) and isset($_POST['correo']) and isset($_POST['pass'])){
  if ($_POST['nombre']!="" and $_POST['apellido']!="" and $_POST['correo']!="" and $_POST['pass']!=""){
    $log = new Login($_POST['nombre'],$_POST['apellido'],$_POST['correo'],$_POST['pass'],$tabla_us);
    $salida = $log->registrar();
  }else{
    $salida = 0;
  }
}else{
  $salida = 0;
}
echo $salida;
?>
