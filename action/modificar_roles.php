<?php 
session_start();
$usuario_activo = $_SESSION['identificacion'];
$id_grupo = $_POST['id_grupo'];
include ("../clases/roles.php");
include ("../clases/coneccion.php");  
$rol = new Roles();
$respuesta =1;
$permiso = $rol->consultar_rol($usuario_activo,$id_grupo);
if (isset($permiso[0])){
  if ($permiso[0]['creador']== 1 and $permiso[0]['id_usuario']== $usuario_activo){
    $datos_roles = explode (",",$_POST['datos_roles']); 
    $id_roles = $_POST['id_roles'];
    $respuesta = $rol->modificar_rol($datos_roles, $id_roles);
  }
}

echo $respuesta; 
?>
