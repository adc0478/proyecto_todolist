<?php
session_start();
$tabla ="proyectos";
include ('../clases/coneccion.php');
$con = new Conexion();
$idP=$_POST['idP'];
$nombre=$_POST['nombre'];
$idG=$_POST['idG'];
$tipo=$_POST['tipo'];
$salida = 0;
if (isset($_SESSION['identificacion'])) {
  $permisos = validad_usuario_permisos($_SESSION['identificacion'],$idG); 
  //validar 
  if ($nombre !="" ){
    //obtener permisos
    //enviar a la BD
    if ($idP!="" and $permisos[0]['editar_proyecto']== 1 ) {
      $query = "update $tabla set nombre='$nombre', tipo='$tipo' where idp=$idP";
      $con->sentencia_sql($query);
      $salida =1;
    }else if ($permisos[0]['crear_proyecto'] == 1){
      $query = "select * from $tabla where nombre='$nombre'";
      $consulta = $con->sentencia_sql($query);
      if (!isset($consulta[0]['nombre'])){
        $query ="insert into $tabla values(default,'$nombre','$tipo',$idG)";
        $con->sentencia_sql($query);
        $salida =1;
      }
    }

    //Procesar respuesta
  }
}
echo $salida;

function validad_usuario_permisos($user,$idgrupo){
  include ('../clases/roles.php');
  $permiso = new Roles();
  return $permiso-> consultar_rol($user,$idgrupo);  
}
?>
