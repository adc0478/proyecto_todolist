<?php 
$ida = $_POST['ida'];
$idp = $_POST['idp'];
$nombre = $_POST['nombre'];
$fecha_inicio = $_POST['fecha_inicio'];
$fecha_final = $_POST['fecha_final'];
$tiempo_proyectado = $_POST['tiempo_proyectado'];
$tiempo_cumplido = $_POST['tiempo_cumplido'];
//validar todos los campos
if (validar($nombre) and validar($idp) and validar ($fecha_inicio) and validar_tiempo($fecha_inicio) and validar_tiempo($fecha_final)) {
  //cargar en BD 
  include ("../clases/coneccion.php");
  $con = new Conexion();
  $fecha_final = formatear_time($fecha_final);
  $tiempo_proyectado = formatear_int($tiempo_proyectado);
  $tiempo_cumplido = formatear_int($tiempo_cumplido);
  if (validar($ida) === false){
    $query ="insert into actividades values (default,'$idp','$nombre','$fecha_inicio','$fecha_final',$tiempo_proyectado, $tiempo_cumplido)";
  }else{
    //aqui va el update
    $datos  = ", idp = $idp";
    $datos .= ", nombre_actividad = $nombre"; 
    $datos .= ", fecha_inicio = $fecha_inicio";
    $datos .= ", fecha_final = $fecha_final";
    $datos .= ", tiempo_proyectado = $tiempo_proyectado";
    $datos .= ", tiempo_cumplido = $tiempo_cumplido";
    $query = "update actividades set $datos where ida = $ida";
  }
  $con->sentencia_sql($query);
  $salida ="ok";
}else{
  $salida = "error";
}

echo $salida;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function validar($campo){
  if ($campo != "" ){
    return true;
  }else{
    return false;
  }
}
function formatear_int ($campo){
  if ($campo === ""){
    return 0;
  }else{
    return $campo; 
  }
}
function formatear_time($campo){
  if ($campo === ""){
    return '0000-00-00';
  }else{
    return $campo; 
  }
}
function validar_tiempo($campo){
  $patron ="/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/"; 
  if (preg_match($patron,$campo) === 1 xor validar($campo) === false){
    return true;
  }else{
    return false;
  }
}
?>
