async function lista_grupo_usuario(select,columna,columna_value){
  let url = "action/consultar_usuarios_segun_permiso.php";
  var opt ={
    method: "POST"
  };
  let response = await fetch (url,opt);
  let data = await response.json();
  let tabla ="";
  for (let i = 0; data.length > i;i++) {
    opt +=`<option value=${data[i][columna_value]}>${data[i][columna]}</td>`; 
  };
  document.querySelector(select).innerHTML=opt;
}
async function cargar_option_tipo(lista,select,columna,columna_value, criterio,campo_aSeleccionar){
  let DB_consulta = lista;
  var selector = select;
  var campo = columna;
  let indice=0;
  var valor = columna_value || columna;
  var tabla = new FormData();
  if (criterio != undefined){
    tabla.append("criterio", criterio);
  }
  tabla.append('tabla',DB_consulta);
  var url ="action/consultas_genericas.php";
  var opt={
    body:tabla,
    method:"post"
  } 

  let response = await fetch (url,opt);
  let data = await response.json();
  if (campo != undefined){
    while (document.querySelector(select).firstChild){
      document.querySelector(selector).removeChild(document.querySelector(selector).firstChild);
    }
    let opcion;
    document.querySelector(selector).innerHTML = "<option value=''></option>";
    for (let i=0; i< data.length;i++){
      opcion = `<option value=${data[i][valor]}>${data[i][campo]}</option>`;
      document.querySelector(selector).innerHTML +=opcion; 
      if (campo_aSeleccionar != undefined){
        if (campo_aSeleccionar == data[i][campo]){
          indice = i + 1;
        }
      }
    }
    document.querySelector(selector).selectedIndex=indice; 
  }
  return "ok";
}




function editar_proyecto(){
  //consultar as la BD toda la info necesaria
  let datos = new FormData();
  datos.append('tabla','proyectos');
  datos.append('criterio','idp=' + document.querySelector('.lista_proyecto').value);  
  let url ="action/consultas_genericas.php";
  let opt={
    body:datos,
    method:"post"
  };
  fetch (url,opt)
    .then(response => response.json())
    .then(data => traer_edicion(data))
}
function traer_edicion(data){
  //cargar en el container_form los datos obtenidos
  cargar_formulario_proyecto(data[0].idp,data[0].nombre,data[0].tipo);
}
function cargar_proyectos_relacionados(){
  cargar_option_tipo('proyectos','.lista_proyecto','nombre','idp', 'id_grupo = ' + document.querySelector('.lista_grupoTrabajo').value); 
}
function registrar_proyecto(){
  var formulario = new FormData();
  formulario.append('idP',document.querySelector('#id_proyecto').value);
  formulario.append('nombre',document.querySelector('#nombre_proyecto').value);
  formulario.append('idG',document.querySelector('#id_grupo').value);
  formulario.append('tipo',document.querySelector('#tipo_proyecto').value);
  var url ="action/registrar_proyecto.php";
  var opt = {
    body:formulario,
    method:"POST"
  };   

  fetch(url,opt)
    .then(response=>response.text())
    .then(data=>informe(data));
}
async function listar_tareas(){
  let salida ="";
  let ingreso = new FormData();
  ingreso.append('tabla', 'actividades');
  ingreso.append('criterio', 'idp=' + document.querySelector('.lista_proyecto').value);
  let url = "action/consultas_genericas.php";
  let opt = {
    body: ingreso,
    method:"POST"
  }
  if (document.querySelector('.lista_proyecto').value !=""){
      let respuesta = await fetch (url,opt);
      let datos = await respuesta.json();
    //Procesar datos
    if (datos.length >0){
      for (let i = 0; datos.length > i; i++) {
        salida += "<tr>"; 
        salida += `
            <td>${datos[i]['ida']}</td>
            <td>${datos[i]['idp']}</td>
            <td>${datos[i]['nombre_actividad']}</td>
            <td>${datos[i]['fecha_inicio']}</td>
            <td>${datos[i]['fecha_fin']}</td>
            <td>${datos[i]['tiempo_proyectado']}</td>
            <td>${datos[i]['tiempo_cumplido']}</td>
            <td class="btn-table">
            <button class="btn btn_tarea_edit"><img src="iconos/edit.png" alt=""/></button>
            <button class="btn btn_tarea_delete"><img src="iconos/delete.png" alt=""/></button>
            </td>
         `;
        salida += "</tr>"
      }
    }
  }
  document.querySelector(".table").remove();
  let cabecera_tabla =`
       <tr>
         <th>IDA</th>
         <th>IDP</th>
         <th>Nombre</th>
         <th>Fecha inicio</th>
         <th>Fecha fin</th>
         <th>T proyectado</th>
         <th>T cumplido</th>
       </tr>
     `;
  document.querySelector('.lista_tareas').innerHTML += "<table class='table'>"+ cabecera_tabla + salida + "</table>";

}
function informe (respuesta){
  alert (respuesta);  
  cargar_option_tipo('proyectos','.lista_proyecto','nombre','idp', 'id_grupo = ' + document.querySelector('.lista_grupoTrabajo').value); 
  cerrar_form();
}
function cerrar_form(){
  document.querySelector(".container_form").remove();
}
function inicio() {
  lista_grupo_usuario('.lista_grupoTrabajo','nombre_grupo','id_grupo');
  document.querySelector('.lista_proyecto').addEventListener('change',listar_tareas);
  document.querySelector('.lista_grupoTrabajo').addEventListener('change',listar_tareas);
}
window.onload = inicio;
