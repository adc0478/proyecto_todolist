<?php
session_start();
$salida ="nook";
$tabla ="grupos";
if (isset($_SESSION['identificacion'])){
  include ("../clases/coneccion.php");
  $con = new Conexion();
  $id = $_POST['id_grupo'];
  $nombre = $_POST['nombre_grupo'];
  $id_user = $_SESSION['identificacion'];
  $query_consulta ="select * from $tabla where nombre_grupo = '$nombre'";
  $consulta = $con->sentencia_sql($query_consulta);
  if ($consulta[0]['nombre_grupo'] != $nombre){
    if ($id != "" ){
     $query = "update $tabla set nombre_grupo = '$nombre' where id_grupo = $id"; 
    }else{
      $query="insert into $tabla values (default,'$nombre',$id_user)";
    } 
    $respuesta = $con->sentencia_sql($query);
    if ($respuesta=="0"){
      $salida ="ok";
      if ($id == ""){
        $query = "select * from $tabla where nombre_grupo = '$nombre'";
        $consulta_cargado = $con->sentencia_sql($query);
        $id_grupo = $consulta_cargado[0]['id_grupo'];
        //registrar roles
        include ("../clases/roles.php");
        $rol = new Roles();
        $lista =array($id_grupo,$id_user,1,1,1,1,1,1,1);
        $salida = $rol->cargar_rol($lista);
      }
    }
  }
}
echo $salida;
?>
