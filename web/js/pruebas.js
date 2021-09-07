//main execute
$(document).ready(function(){
    //alert('cualquier cosa');
    listar();
});

// funcion guardar post
function guardar(){
    var nombre= $('#nombre').val();
    var apellido = $('#apellido').val();
    var telefono= $('#telefono').val();
    var correo=$('#correo').val();
    console.log(nombre, apellido, telefono, correo);
    const data = JSON.stringify(
            {
                'nombre': nombre,
                'apellido':apellido,
                'telefono':telefono,
                'correo':correo
            }
        );
        console.log(data);
    $.ajax({
        url: 'http://172.16.20.166/medic/public/configuraciones/cliente/create',
        type:'POST',
        data:data,
        success: function(respuesta) {
           console.log(respuesta)
           socket.emit('socket update', respuesta);
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        },complete:function(){
            var formulario =document.getElementById("f1");
            formulario.reset();
        }
    });
}

//funcion listar datos de la tabla el orden lo decide el controlador 
function listar(){
    let swich=0;
    $.ajax({
        url: 'http://172.16.20.166/medic/public/configuraciones/cliente/',
        type:'GET',
        success: function(respuesta) {
           // console.log(respuesta);
                $.each(respuesta, function(i, item){
                    if(swich<1){
                        arreglo=Object.keys(item);
                    console.log(arreglo);
                    swich = 1;
                    }
                    arreglo=Object.values(item);
                    console.log(arreglo);
                    $("#tbody").append(`<tr id="tr_${item.id}">
                    <td class="td_${item.id}">${item.nombre}</td>
                    <td class="td_${item.id}">${item.apellido}</td>
                    <td class="td_${item.id}">${item.correo}</td>
                    <td class="td_${item.id}">${item.telefono}</td>
                    <td><button class="btn btn-warning btn-sm"  onclick="pasarparametros('${item.nombre}','${item.apellido}','${item.correo}','${item.telefono}',${item.id})">Editar</button></td>
                    <td><button class="btn btn-warning btn-sm"  onclick="eliminar(${item.id})">Eliminar</button></td>
                    
                </tr>`)
                })
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}

//funcion para usar el formulario id=f1 para actualizar
function pasarparametros(nombre,apellido,correo,telefono, id){
    $('#nombre').val(nombre);
    $('#apellido').val(apellido);
    $('#telefono').val(telefono);
    $('#correo').val(correo);
    $('#id').val(id);
    $("#btn-guardar").attr('onclick','editar()');    
    $("#td_id").attr('rol','william');
}

//funcion que elimina un registro de la tabla 
function eliminar(id){
    console.log(id);
     $.ajax({
        url: 'http://172.16.20.166/medic/public/configuraciones/cliente/delete/'+id,
        type:'get',
        success: function(respuesta) {
           console.log(respuesta)
           socket.emit('socket update', respuesta);
        },
        error: function() {
            console.log("No se pudo eliminar registro");
        }
    });
}

//funcion que edita un registro de la tabla 
function editar(){
    var nombre= $('#nombre').val();
    var apellido = $('#apellido').val();
    var telefono= $('#telefono').val();
    var correo=$('#correo').val();
    var id=$('#id').val();
    
    console.log(nombre, apellido, telefono, correo);
    
    const data = JSON.stringify(
            {
                'nombre': nombre,
                'apellido':apellido,
                'telefono':telefono,
                'correo':correo,
                'id':id
            }
        );
        
    $.ajax({
        url: 'http://172.16.20.166/medic/public/configuraciones/cliente/updated',
        type:'POST',
        data:data,
        success: function(respuesta) {
           console.log(respuesta)
           socket.emit('socket update', respuesta);
         },
        error: function() {
            console.log("No se ha podido obtener la información");
        },complete:function(){
            $("#btn-guardar").attr('onclick','guardar()');
            var formulario =document.getElementById("f1");
            formulario.reset();
            
        }
    });
   
}

