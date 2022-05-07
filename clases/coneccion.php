<?php 
// Coneccion a BD
class Conexion{
  private $BD;

  public function __construct()
  {
    include ('../config/config_conexion.php');
    $this->BD = new mysqli($servidor,$usuarioBD,$claveBD,$BD);
  }
  public function sentencia_sql ($query){
    $respuesta ="";
    $tipo = strtoupper(substr($query,0,6));
    switch ($tipo) {
    case 'INSERT':
    case 'DELETE':
      $this->BD->query($query);
      $respuesta = $this->BD->errno;
      break;
    case 'UPDATE':
      $this->BD->query($query);
      $respuesta = $this->BD->errno;
      break;
    case "SELECT":
      $respuesta = array();
      $salida = $this->BD->query($query);
      if ($salida){ 
        while ($fila=$salida->fetch_assoc()){
          $respuesta[]=$fila;
        } 
      }
      break;
    default:

      break;
    }  
    return $respuesta;
  }
  public function __destruct()
  {
    $this->BD->close();
  }
}

?>
