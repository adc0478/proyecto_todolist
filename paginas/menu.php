<!DOCTYPE html>
<html>
<head>
  <meta name="generator" content="HTML Tidy for HTML5 for Linux version 5.7.45">
  <link rel="stylesheet" href="css/menu.css">
  <title></title>
</head>
<body>
  <a href="#" id="btn_menu"><img src="iconos/menu.png" alt="" id="btn_abrir" onclick="abrir_menu()"> <img src="iconos/cerrarM.png" alt="" id="btn_cerrar" onclick="cerrar_menu()"></a>
  <div class="contenedor_menu">
    <ul id="menu">
      <li>
        <a href="">inicio</a>
      </li>
      <li>
        <a href="index.php?destino=mis_tareas">Mis tareas</a>
      </li>
      <li>
        <a href="">Panel de control</a>
      </li><?php session();?>
    </ul>
  </div>
  <script src="js/accion_menu.js"></script> <?php 
  function session(){
  if (isset($_SESSION['usuario'])){
    echo   '<li><a href="index.php?destino=cerrar">Cerrar sesion</a></li>';
  }else{
    echo '<li><a href="index.php?destino=login">Login</a></li>';
  }
  }
  ?>
</body>
</html>
