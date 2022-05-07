async function cargar_formulario_proyecto(idp,nombre,tipo){
  let id_grupo = document.querySelector(".lista_grupoTrabajo").value ;
  let proyecto = `
<div class="container_form" id="container_form">
   <div class="form">
    <input type="text" value="${idp}" name="" id="id_proyecto" placeholder="Identificador proyecto"/>
    <input type="text" value="${nombre}" name="" id="nombre_proyecto" placeholder="Nombre proyecto"/>
    <input type="text" value="${id_grupo}" name="" id="id_grupo" placeholder="Identificacion grupo" disabled style="text-align: center;"/>
    <select name="" id="tipo_proyecto">
    </select>   
    <button onclick="registrar_proyecto()">Cargar</button>
    <button onclick="cerrar_form()">Cancelar</button>
   </div> 
</div>`;
  let cuerpo = document.querySelector(".reservado");
  cuerpo.innerHTML += proyecto;
  let salida = await cargar_option_tipo('tipos', '#tipo_proyecto', 'valor',undefined,undefined,tipo);
  
  }
