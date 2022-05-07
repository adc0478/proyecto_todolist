<?php
$tabla_us = "usuarios";
if (isset($_POST['usuario']) and isset($_POST['pass'])){
  include ('../clases/login.php');
  $log = new Login("","",$_POST['usuario'],$_POST['pass'],$tabla_us);
  $resultado = $log->ingresar();
  echo $resultado;
}
?>
