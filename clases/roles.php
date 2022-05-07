<?php


class Roles 
{
  private $tabla;
  private $con;
  function __construct()
  {
    $this->con_rol = new Conexion();     
    $this->tabla_rol="roles"; 
  }  
  function cargar_rol($listaArray){
    $salida =1;
    $dato="default";
    $consulta = $this->consultar_rol($listaArray[1],$listaArray[0]);
      if (!isset($consulta[0])){
        foreach ($listaArray as $value) {
          $dato .=",$value";
        }
        $query="insert into $this->tabla_rol values ($dato)";  
        $salida = $this->con_rol->sentencia_sql($query);
      } 
    return $salida;  
  }
  public function modificar_rol($listaRoles, $rol){
    $sets  = "creador=$listaRoles[0]";
    $sets .= ", crear_tarea=$listaRoles[1]";
    $sets .= ", borrar_tarea=$listaRoles[2]";
    $sets .= ", editar_tarea=$listaRoles[3]";
    $sets .= ", borrar_proyecto=$listaRoles[4]";
    $sets .= ", editar_proyecto=$listaRoles[5]";
    $sets .= ", crear_proyecto=$listaRoles[6]";
    $query = "update roles set $sets where id_rol=$rol";
    $salida = $this->con_rol->sentencia_sql($query);
    return $salida;
  }
  public function consultar_rol($usuario,$grupo){
    if ($usuario=="" and $grupo=="") {
      $query ="Select * from $this->tabla_rol left join usuarios on ($this->tabla_rol.id_usuario = usuarios.id) ";
    }elseif ($grupo !="" and $usuario ==""){
      $query ="Select * from $this->tabla_rol left join usuarios on ($this->tabla_rol.id_usuario = usuarios.id) where id_grupo=$grupo";
    }else{
      $query = "Select * from $this->tabla_rol left join usuarios on ($this->tabla_rol.id_usuario = usuarios.id) where id_grupo=$grupo and id_usuario=$usuario";
    }
    return $this->con_rol->sentencia_sql($query);
  }
}

?>
