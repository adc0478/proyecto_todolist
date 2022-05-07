<?php 
class Login
{
  private $nombre;
  private $apellido;
  private $correo;
  private $clave;
  private $clave_hash;
  private $tabla;
  function __construct($nombre,$apellido,$correo,$clave,$tabla)
  {
    $this->nombre = $nombre;
    $this->apellido = $apellido;
    $this->correo = $correo;
    $this->clave = $clave;
    $this->tabla = $tabla;
  }
  public function registrar(){
    include ('../clases/coneccion.php');
    $con = new Conexion(); 
    //verificar que el correo no este guardado
    $query = "select * from $this->tabla WHERE correo = '$this->correo'";
    $respuesta = $con->sentencia_sql($query); 
    //si el correo es nuevo registrar en BD
    if (!isset($respuesta[0]['correo'])){
      $this->clave_hash = password_hash($this->clave,PASSWORD_DEFAULT,array('cost'=>4));  
      $query = "insert into $this->tabla values(default,'$this->nombre','$this->apellido','$this->correo','$this->clave_hash')";
      $respuesta = $con->sentencia_sql($query);
      if ($respuesta==0) {
        return 1;  
      }else{
        return 0;
      }
    } else{
      return 0;
    }
  }
  public function ingresar(){
    include ('../clases/coneccion.php');
    $con = new Conexion();
    $query  = "select * from $this->tabla WHERE mail = '$this->correo' ";
    $respuesta = $con->sentencia_sql($query);
    if (isset($respuesta[0]['mail'])){
      if (password_verify($this->clave,$respuesta[0]['clave'])){
        session_start();
        $_SESSION['usuario']=$this->correo;
        $_SESSION['identificacion'] = $respuesta[0]['id'];
        return 1;
      }else{
        return 0;
      } 
    }else{
      return 0;
    } 
  } 
  public function cerrar_session(){
    unset($_SESSION['usuario']);
  } 
}

?>
