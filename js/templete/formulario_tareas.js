function crear_formulario_tareas(idTarea){
  let id = idTarea || "";
  let cuerpo = document.querySelector(".contenido_form_tareas");
  let idp = document.querySelector(".lista_proyecto").value;
  let datos =`

  <div class="formulario">
          <h1>Ingreso/modificacion de tareas</h1>

          <div class="formulario_tarea">
            <div class="campo">
              <label>Id actividad</label>
              <input type="text" value="" name="" id="ida"/>
            </div>
            <div class="campo">
              <label>Id proyecto</label>
              <input type="text" value='${idp}' name="" id="idp"/>
            </div>             
            <div class="campo">
              <label>Nombre actividad</label>

              <input type="text" value="" name="" id="nombre"/>
            </div> 
            <div class="campo">

              <label>fecha inicio</label>
              <div><input type="datetime-local" value="" name="" id="fecha_inicio"/>
              <button onclick="cargar_tiempo('fecha_inicio')" class="btn_time btn_fecha_inicio">c</button></div>
            </div>
            <div class="campo">
              <label>Fecha final</label>
              <div><input type="datetime-local" value="" name="" id="fecha_final"/> 
              <button onclick="cargar_tiempo('fecha_final')" class="btn_time">c</button></div>
            </div>
            <div class="campo">
              <label>tiempo proyectado</label>
              <input type="number" value="" name="" id="tiempo_proyectado"/>
            </div>
            <div class="campo">
              <label>Tiempo cumplido</label>
              <input type="number" value="" name="" id="tiempo_cumplido"/>
            </div>

          </div>
          <div class="comandos_tarea">
            <button onclick="registrar_tarea()">Cargar</button>
            <button onclick="cerrar_form_tarea()">Cancelar</button>
          </div>
  </div>`;
  if (idp != ""){
    cuerpo.innerHTML = datos;
    if (document.querySelector("#fecha_inicio").value != ""){
      document.querySelector("#btn_fecha_inicio").setAttribute("display","none");
    }
  }
}
function cargar_tiempo(id){
  document.querySelector('#' + id).value = fecha_formulario();
}
function fecha_formulario(){
  let tiempo = new Date();
  let fecha_formateada = tiempo.getFullYear();
  fecha_formateada += "-" + redondear(tiempo.getMonth());
  fecha_formateada += "-" + redondear(tiempo.getDate());
  fecha_formateada += "T" + redondear(tiempo.getHours());
  fecha_formateada += ":" + redondear(tiempo.getMinutes());
  return fecha_formateada;
}
function redondear(valor){
  if (valor < 10){
    return "0" + valor;
  }else{
    return valor;
  }
}
function cerrar_form_tarea(){
  document.querySelector(".formulario").remove();
}
function registrar_tarea(){  
  let datos = new FormData();
  datos.append("ida",document.querySelector("#ida").value);
  datos.append("idp",document.querySelector("#idp").value);
  datos.append("nombre",document.querySelector("#nombre").value);
  datos.append("fecha_inicio",document.querySelector("#fecha_inicio").value);
  datos.append("fecha_final",document.querySelector("#fecha_final").value);
  datos.append("tiempo_proyectado",document.querySelector("#tiempo_proyectado").value);
  datos.append("tiempo_cumplido",document.querySelector("#tiempo_cumplido").value);
  let url ="action/registro_tarea.php";
  let opt = {
    method:"POST",
    body:datos
  };
  fetch(url,opt)
    .then(response => response.text())
    .then(data => pros_respuesta(data) );
}
function pros_respuesta(entrada){
  if (entrada==="ok"){
    alert ("Se registra correctamente la tarea");
    document.querySelector(".formulario").remove();
    //actualiza lista de tarea
    listar_tareas();
  }else{
    alert("Ups algo fallo, su tarea no fue registrada"); 
  }
}
