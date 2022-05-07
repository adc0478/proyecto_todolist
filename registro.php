  <DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="css/registro.css" type="text/css" media="screen" title="no title" charset="utf-8"> 
    <link rel="stylesheet" href="css/estilos.css" type="text/css" media="screen" title="no title" charset="utf-8">
  </head>
   <body>
      <?php include ('paginas/menu.php');?>
      <div class="form_registro">
      <img src="iconos/add_user.png">
        <div class="contenido">
          <div> <label>Nombre</label><input type="text" value="" name="nombre" id="nombre"/></div>        
          <div> <label>Apellido</label><input type="text" value="" name="apellido" id="apellido"/></div>
          <div> <label>Correo</label><input type="email" value="" name="correo" id="correo"/></div>
          <div> <label>Clave</label><input type="password" value="" name="pass" id="pass"/></div>
        </div>
         <button class="btn_registro" onclick="registrar_usuario()">Registrar</button>
      </div> 
     <div id="contenido"><div id="salida"></div></div>
     <?php include ('paginas/footer.php');?>
   </body>
   <script src="js/registro.js" charset="utf-8"></script>
   <script src="js/nodos.js" charset="utf-8"></script>
   </html>
