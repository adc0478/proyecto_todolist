


function crear_formulario_grupo(tipo){
  let id;
  let nombre;
  if (tipo === "edicion"){
    id = document.querySelector(".lista_grupoTrabajo").value;
    let combo = document.querySelector(".lista_grupoTrabajo");
    nombre = combo.options[combo.selectedIndex].text;
  }else{
    id = "";
    nombre = "";
  }; 
  let cuerpo = document.querySelector('.contenido_form_grupo');
  let dato =`
     
     <div class="container_grupo_trabajo">
        <div class="form_grupo_trabajo">
          <h3>Grupo de trabajo</h3>
          <div class="campos">
            <div><label>ID</label><input type="text" class="id_grupo_test" id="id_grupo" value="${id}"></div>
            <div><label>Nombre grupo</label><input type="text"  id="nombre_grupo" value="${nombre}"></div>
          </div>
          <div class="comandos">
            <button onclick="crear_grupo()">Cargar</button>
            <button onclick="cerrar('.container_grupo_trabajo')">Cancelar</button>
            <button class="btn_user" onclick="crear_formulario_rol(${id})">Agregar user</button>
          </div>
          <div class="respuesta"></div>
        </div>
     </div>

    `;
  cuerpo.innerHTML+=dato;
  if (document.querySelector(".id_grupo_test").value == 0){
    document.querySelector(".btn_user").style.display="none";
  }
}
function cerrar (form){
   let formulario = document.querySelector(form);
   formulario.remove();
}
function crear_grupo(){
  let datos = new FormData();
  datos.append("id_grupo", document.querySelector(".id_grupo_test").value);
  datos.append("nombre_grupo", document.querySelector("#nombre_grupo").value);
  let url ="action/crear_grupo.php";
  let opt ={
    body:datos,
    method:"post"
  };
  fetch(url,opt)
    .then(response=>response.text())
    .then(data=>respuesta(data));
}
function respuesta(data){
  let salida;
  if(data==="ok"){
    salida ="<p style='color:green;text-align:center'>Se agrego el nuevo grupo</p>";
  }else{
    salida ="<p style='color:red;text-align:center'>Error !! por favor verificar los datos ingresados</p>";
  }
  document.querySelector(".respuesta").innerHTML = salida;
  lista_grupo_usuario('.lista_grupoTrabajo','nombre_grupo','id_grupo');
}
