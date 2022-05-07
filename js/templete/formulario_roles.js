
function crear_formulario_rol(grupo){
 let formulario_rol= ` 
 <div class="fondo">
 <div class="form_roles">
   <link src="css/formulario_roles.css">
   <h2>Administracion de roles</h2>

   <div class="fila_grupo">
     <label>Grupo trabajo<input type="text" value=${grupo} class="id_grupo"><label>
   </div>

   <div class="fila_user">
     <label>Mail<input type="text" class="usuario"></label>
     <img class="buscar_mail" src="iconos/search.png" onclick="listar_usuario()">
   </div>
   <div id=cuerpo>
     <div id="lista_usuarios"></div>

     <div id="permisos_usuarios">
       <div class="fila_checks">
         
       </div>
       <div class="identificadores">
          <label>ID rol  <input type="text" value="0" class="id_rol"></label>
       </div>
       <div class="fila_btn">
         <button class="btn_roles" onclick="guardar_rol()">Cargar</button>
         <button class="btn_roles" onclick="cerrar_roles('.fondo')">Cancelar</button>
       </div>
     </div>

   </div>
 </div></div>`
let cuerpo_base = document.querySelector('.contenido_form_roles');
cuerpo_base.innerHTML +=formulario_rol; 
listar_usuarios_por_roles(grupo);
cargar_check_default();
}
async function guardar_rol(){
  //listar lista de permisos
   let datos =[
     document.querySelector('.ch_adm').value,
     document.querySelector('.crear_tarea').value,
     document.querySelector('.borrar_tarea').value,
     document.querySelector('.editar_tarea').value,
     document.querySelector('.borrar_proyecto').value,
     document.querySelector('.editar_proyecto').value,
     document.querySelector('.crear_proyecto').value
];
  //fetch a end point
   let url ="action/modificar_roles.php";
   let info = new FormData();
   info.append("datos_roles",datos);
   info.append("id_roles",document.querySelector('.id_rol').value);
   info.append("id_grupo",document.querySelector('.id_grupo').value);
   let data = {
     body : info,
     method : "post"
   }
  //respuesta
    let response = await fetch(url,data);
    let respuesta = await response.text();
    if (respuesta === "0"){
      alert("Se agregaron los nuevos roles");
    }else{
      alert ("Hubo una falla al ingresar el nuevpo permiso")
    } 
  //limpiar roles y compo usuario

}
function respuesta_busqueda(valor){
  let url;
  if (valor=="1"){
    url="";
  }else{
    url="";
  }
  let salida ="<img src="+ url + ">";
  let contenedor = document.querySelector(".respuesta_busqueda");
  contenedor.innerHTML = salida;
}
async function listar_usuario(){
  //buscar lista del servidor
   let dato = new FormData();
  if (document.querySelector(".usuario").value != ""){
    let criterio = `mail like "%${document.querySelector(".usuario").value}%"`;
    dato.append("criterio", criterio);
  }
   dato.append("tabla", "usuarios");
   let url ="action/consultas_genericas.php";
   let cuerpo ={
      body:dato,
      method:'post'
   }
   let response = await fetch(url,cuerpo);
   let data = await response.json();
  //crear tabla 
   let td="";
  for (let i=0;data.length > i;i++){
    if (i%2 === 0){
    
    td += `<td onclick="editar(${data[i].id})" style="background-color:rgb(196,196,230)">${data[i].mail}</td>`;
    }else{

    td += `<td onclick="editar(${data[i].id})" >${data[i].mail}</td>`;
    }
    }


  //mostrar lista con botones de carga
  let tabla = `<div class="usuario_list">
     <img src="iconos/cerrarM.png" onclick="cerrar_roles('.usuario_list')">
    <table> ${td}</table></div>`;
  document.querySelector('body').innerHTML+= tabla;
}
function cargar_check_default(){
  let check = `
         <label><input type="checkbox" value="0" class="ch_adm" onclick="check_changes('.ch_adm')">Administarar grupos</label>
         <label><input type="checkbox" value="0" class="crear_tarea" onclick="check_changes('.crear_tarea')">Crear tarea</label>
         <label><input type="checkbox" value="0" class="borrar_tarea" onclick="check_changes('.borrar_tarea')">Borrar tarea</label>
         <label><input type="checkbox" value="0" class="editar_tarea" onclick="check_changes('.editar_tarea')">Editar tarea</label>
         <label><input type="checkbox" value="0" class="crear_proyecto" onclick="check_changes('.crear_proyecto')">Crear proyecto</label>
         <label><input type="checkbox" value="0" class="editar_proyecto" onclick="check_changes('.editar_proyecto')">Editar proyecto</label>
         <label><input type="checkbox" value="0" class="borrar_proyecto" onclick="check_changes('.borrar_proyecto')">Borrar proyecto</label>
  `;
  document.querySelector(".fila_checks").innerHTML=check;
}
async function editar (id_usuario){
  //cargar el usuario a la BD role sin ningun privilegio e informar resultado de la carga (sincronico)
  let url ="action/cargar_roles_default.php";
  let datos = new FormData();
  datos.append("id_usuario", id_usuario);
  datos.append("id_grupo", document.querySelector(".id_grupo").value);
  let parametros ={
    body:datos,
    method:"post"
  }
  let response = await fetch(url,parametros);
  let data = await response.text();
  if (data == "1"){
    //consultar la tabla roles con el id del grupo y listar en pantalla principal (asincronico)
    alert (data);
  }else{
   document.querySelector('#lista_usuarios table').remove();
   listar_usuarios_por_roles(document.querySelector(".id_grupo").value); 
  }

  
  cerrar_roles(".usuario_list");
}
async function listar_usuarios_por_roles(id_grupo){
    let td ="";
    let url_consulta = "action/consulta_roles_general.php";
    let datos = new FormData();
    datos.append("id_grupo", id_grupo);
    let parametros_consulta = {
      body:datos,
      method:"post"
    }
    let response_consulta = await fetch(url_consulta,parametros_consulta);
    let data_consulta = await response_consulta.json();
    if (data_consulta.length >0 ){
      for (let i=0; data_consulta.length>i;++i){
        td +=`<td onclick="obtener_permisos(${data_consulta[i]["id_grupo"]}, ${data_consulta[i]['id_usuario']})">${data_consulta[i]['mail']}</td>`;
      }
      let tabla = `<table>${td}</table>`;
      document.querySelector('#lista_usuarios').innerHTML +=tabla;
    }
}
async function obtener_permisos(id_grupo, id_usuario){
   //con el grupo y el usuario obtener la lista de permisos 
  cargar_check_default();
  let datos = new FormData();
  datos.append("id_grupo",id_grupo);
  datos.append("id_usuario", id_usuario);
  let opt = {
    method:"post",
    body:datos
  }
  let url ="action/consulta_roles_general.php";
  let response = await fetch(url,opt);
  let data = await response.json();
  //Representar los valores en la tabla de permiso
  if (data.length > 0){
         checkupdate(document.querySelector(".ch_adm"),data[0]['creador']);
         checkupdate(document.querySelector(".crear_tarea"),data[0]['crear_tarea']);
         checkupdate(document.querySelector(".borrar_tarea"),data[0]['borrar_tarea']);
         checkupdate(document.querySelector(".editar_tarea"),data[0]['editar_tarea']);
         checkupdate(document.querySelector(".crear_proyecto"),data[0]['crear_proyecto']);
         checkupdate(document.querySelector(".editar_proyecto"),data[0]['editar_proyecto']);
         checkupdate(document.querySelector(".borrar_proyecto"),data[0]['borrar_proyecto']);

  //Registar el usuario en edicion y el grupo
   document.querySelector(".id_rol").setAttribute("value",data[0]['id_rol']);
   document.querySelector(".usuario").setAttribute("value", data[0]["mail"]);
  }
}
function checkupdate(elemento,valor){
  if (valor == 1){
    elemento.setAttribute("value",1);
    elemento.setAttribute("checked",true);
  }else{
    elemento.setAttribute("value",0);
    elemento.removeAttribute("checked");
  }
}
function check_changes(elem){
  let elemento = document.querySelector(elem);
  if (elemento.value==1){
    elemento.setAttribute("value",0);
    elemento.removeAttribute("checked");
  }else{
    elemento.setAttribute("value",1);
    elemento.setAttribute("checked",true);
  }
}
function cerrar_roles(componente){
  document.querySelector(componente).remove();
}
