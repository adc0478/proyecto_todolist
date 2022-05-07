function nodos(){
	this.crear = function (tipo,val_id,val_class,padre_id){
                var nod1 = document.createElement(tipo);
                nod1.setAttribute("id",val_id);
                nod1.setAttribute("class",val_class);
                document.getElementById(padre_id).appendChild(nod1);
	}
	this.atributos = function (val_id,atri,valor){
                document.getElementById(val_id).setAttribute(atri,valor);
	}
	this.borrar = function (val_id,padre_id){
		var x = document.getElementById(padre_id);
		var k = document.getElementById(val_id);
        x.removeChild(k);
	}
	this.crearTexto= function(padre_id,texto){
		var nod1 = document.createTextNode(texto);
                document.getElementById(padre_id).appendChild(nod1);
	}
        this.crear_etiqueta = function (padre_id,etiqueta){
           
           //padre_id es donde empieza a cargar las etiquetas
           //etiqueta es la etiqueta a cargar
           //ej: <div id="aa" class="ss"> $% este es un texto
           var valor; //es el vector que contiene todos los datos de la etiqueta ej. <div id="aa" class="bb">
                      //valor[0] es div
                      //valor[1] es id="aa"
                      //valor[2] es class="bb"
           var vector = etiqueta.split(new RegExp('<|>'));
           var padre = padre_id;
           var prop;
           var cla = "cla";
           var id = "id"
           var largo = vector.length;
           for (var k=1;largo>k;k++) {
               valor = vector[k].split(' '); //aqui separe todos los datos dentro de la etiqueta
                if (valor[0]!=''){
                        if (valor[0] == "$%"){
                         this.crearTexto(padre,eti); //debo identificar los textos con el caracter $% + espacio y el resto   
                        }else{
                         //busco dentro del vector valor el campo id y class
                         for (var i=0;valor.length>i;i++){
                             if (valor[i].split('=')[0]=="id"){
                               id = valor[i][1];  
                             }else if (valor[i].split('=')[0]=="class"){
                               cla = valor[i][1];   
                             }  
                         }
                         //creo la etiqueta
                         this.crear(valor[0],id,cla,padre);
                         padre = valor[0];
                         //cargo todos los atributos que faltaban
                         for (var j=1;valor.length=j;j++){
                                 prop = valor[j].split('=');
                                 if ((prop[0] !== 'id') && (prop[0] !== 'class')){
                                     this.atributos(padre,prop[0],prop[1]);
                                 }
                             
                         }
                        }
                }
           }
           
        };
}
