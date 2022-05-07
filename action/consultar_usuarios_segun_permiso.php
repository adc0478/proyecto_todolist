<?php
include ('../clases/coneccion.php');
session_start();
$user = $_SESSION['identificacion'];
$con =new Conexion();
$query = 'select * from roles join grupos on roles.id_grupo = grupos.id_grupo where roles.id_usuario ='. $user;
$resultado = $con->sentencia_sql($query);
echo json_encode($resultado);  
?>
