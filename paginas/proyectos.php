<link rel="stylesheet" href="css/proyectos.css" type="text/css" media="screen" title="no title" charset="utf-8">
<div class="reservado"></div>
<!--Barra grupo trabajo -->
<div class="container_grupoTrabajo">
 <h2>Grupo de trabajo</h2>
 <div class="barra_grupoTrabajo">
     <div>
      <button class="btn btn_proyecto_add" onclick="crear_formulario_grupo('nuevo')" > <img src="iconos/add.png" alt=""/>  </button>
      <button class="btn btn_proyecto_edit" onclick="crear_formulario_grupo('edicion')" ><img src="iconos/edit.png" alt=""/></button>
      <button class="btn btn_proyecto_delete"><img src="iconos/delete.png" alt=""/></button>
    </div>

   <select  class="lista_grupoTrabajo" onchange="cargar_proyectos_relacionados()">

   </select>
 </div>

</div>

<!--Barra proyectos -->
<div class="container_Bproyecto">
  <h2>Proyecto</h2>
  <div class="barra_proyecto">
    <div>
      <button class="btn btn_proyecto_add" onclick="cargar_formulario_proyecto('','',0)"> <img src="iconos/add.png" alt=""/>  </button>
      <button class="btn btn_proyecto_edit" onclick="editar_proyecto()"><img src="iconos/edit.png" alt=""/></button>
      <button class="btn btn_proyecto_delete" onclick=""><img src="iconos/delete.png" alt=""/></button>
    </div>
    <select class="lista_proyecto">
    </select>
  </div>
</div>
<!--Barra tareas -->
<div class="container_Btarea">
  <h2>Tareas</h2>
  <div class="barra_tarea">
    <div>
      <button class="btn btn_tarea_add" onclick="crear_formulario_tareas()"><img src="iconos/add.png" alt=""/></button>
      <button class="btn btn_tarea_add" ></button>
      <button class="btn btn_tarea_add" ></button>
    </div>
    <div class="tabla_tarea">
    </div>
  </div>
</div>

<div class="tareas">
  <!--Barra estadisticas -->
  <div class="barra_estadistica">

  </div>
  <!--Barra listas tareas -->
  <div class="lista_tareas">
      <table class="table"></table>
  </div>
</div>
<div class="contenido_form_grupo"></div>
<div class="contenido_form_roles"></div>
<div class="contenido_form_tareas"></div>
<script src="js/templete/formulario_grupo_trabajo.js"></script>
