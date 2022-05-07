
<?php
  session_start();
  if ($_GET['destino']=="cerrar"){
    unset($_SESSION['usuario']);
  }
?>
<DOCTYPE >
<html lang="es
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="css/estilos.css" type="text/css" media="screen" title="no title" charset="utf-8">
<link rel="stylesheet" href="css/formulario_grupo_trabajo.css" type="text/css" media="screen" title="no title" charset="utf-8">
<link rel="stylesheet" href="css/formulario_roles.css" type="text/css" media="screen" title="no title" charset="utf-8">
<link rel="stylesheet" href="css/formulario_nuevo_proyecto.css" type="text/css" media="screen" title="no title" charset="utf-8">
<link rel="stylesheet" href="css/formulario_tarea.css" type="text/css" media="screen" title="no title" charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<rga una secion por default/head>
<body>
<?php
   include ('config/rutas.php');
   include ('paginas/menu.php');
   if (isset ($_SESSION['usuario'])){
      if (isset($_GET['destino'])) {
        include ($ruta[$_GET['destino']]);
      }     
   }else{
     include('paginas/login.php');
   }
   include ('paginas/footer.php');
  ?>
</body>
<script src="js/index.js" charset="utf-8"></script>
<script src="js/templete/formulario_roles.js"></script>
<script src="js/templete/formulario_registro_proyecto.js"></script>
<script src="js/templete/formulario_tareas.js"></script>
</html>
