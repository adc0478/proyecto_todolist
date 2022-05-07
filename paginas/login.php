<link rel="stylesheet" href="css/login.css" type="text/css" media="screen" title="no title" charset="utf-8">


  <div class="form_login"> 
   <img class="logo" src="iconos/face.png" alt="">
   <div> <label>Usuario</label><input type="text" value="" name="usuario" class="usuario" id=""/></div> 
   <div> <label>Password</label><input type="password" value="" name="pass" class="pass"/></div>
    <div>
      <button onclick="ingresar_login()">Ingresar</button> 
      <button onclick="ingresar_registro()">Registrar</button> 
    </div>
  </div>
<?php
if (isset($_GET['log'])){
  if ($_GET['log'] == "no"){
    echo "<p class='error'><img src='iconos/warning.png'>Error de ingreso, por favor verificar usuario y contraseña</p>";
  }
}
?>
<script src="js/login.js" charset="utf-8"></script>    
