<?php
include ('../clases/coneccion.php');

if (isset($_POST['tabla'])){
  $tabla = $_POST['tabla'];
  $con =new Conexion();
  if (isset($_POST['criterio'])) {
    $query = "select * from $tabla where ". $_POST['criterio'];
  }else{
    $query = "select * from $tabla";
  }
  $resultado = $con->sentencia_sql($query);
  echo json_encode($resultado);  
}
?>
