
$(document).ready(function () {
    //alert('cualquier cosa');
//listarcitas();   

//llamar Modales para esta clase 
$('#modales').load('modal_crear_Actualizar_paciente.html');

formularioPacModal();
$("#btnPaciente").click(function(){
        $("#Modal_Crear_Paciente").modal('show');
 });

//
//desactivar_formulario();
var hoy1 = new Date();
$("#fech_nac").attr('max',""+hoy1.getFullYear() + "-"+hoy1.getMonth()+1 + "-" +hoy1.getDate());
});
var hoy = new Date();

let paciente_modal=()=>{
   $("#iddepartamento").val('5');
   fecha_actual();
}



var dirconfig= 'http://172.16.20.166/medic/public/configuraciones/';

var calcular_edad=()=>{
   var fech_nac = new Date($('#fech_nac').val());
    var edad = hoy.getFullYear() - fech_nac.getFullYear();
    var m = hoy.getMonth() - fech_nac.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < fech_nac.getDate())) {
        edad--;
    }
    $('#edad').val(edad);
}

function fecha_actual(){
    var dia=hoy.getDate();
    if(dia<10){
        dia= "0"+dia;
    }
    var mes=hoy.getMonth()+1;
    if(mes<10){
        mes= "0"+mes;
    }
    console.log(hoy.getFullYear() + "-"+mes + "-" +dia);
    $("#fech_nac").attr('max',""+hoy.getFullYear() + "-"+mes + "-" +dia); 
}

//funcion listar datos de la tabla el orden lo decide el controlador 
var listarcitas=()=>{
    $.ajax({
        url: 'http://172.16.20.166/medic/public/Admision/paciente',//url del servicio web a consultar
        type: 'GET',//tipo de servicio
        headers: {
            'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJodHRwOlwvXC9sb2NhbGhvc3RcL0NJNCIsImlhdCI6MTYyODA5MTQ3NywiZXhwIjoxNjI4MDkyNDc3LCJkYXRhIjp7Im5vbWJyZSI6ImRlc2Fycm9sbG8yIn19.2E-3Rny4I1A7GE1fxcqUV0IFS6SoxKxZguxySukcqOo'
        },//token de Atorizacion
        success: function (respuesta) {
            console.log(respuesta);
            $.each(respuesta, function (i,item) {
                $("#tbody").append(`<tr id="tr_${item.id}">
                    <td class="td_${item.id}">${item.documento}</td>
                    <td class="td_${item.id}">${item.primer_nombre + '' + item.segundo_nombre + ' ' + item.primer_apellido + ' ' + item.segundo_apellido}</td>
                    <td class="td_${item.id}">${item.email}</td>
                    <td class="td_${item.id}">${item.telefono}</td>
                    <td><button class="btn btn-warning btn-sm"  onclick="pasarparametros('${item.nombre}','${item.apellido}','${item.correo}','${item.telefono}',${item.id})">Editar</button></td>
                    <td><button class="btn btn-warning btn-sm"  onclick="paciente_modal()">Eliminar</button></td>
                    
                </tr>`)
            })
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
}
var mostrarpaciente=()=>{
    var documento =$('#fbp_documento').val();
    console.log(documento);
    //alert(documento);
    $("#tbody").empty();
    $.ajax({
        url: 'http://172.16.20.166/medic/public/Admision/paciente/show/'+documento,
        type: 'GET',
        success: function (respuesta) {
            console.log(respuesta);
            
            $.each(respuesta, function (i,item) {
                $("#tbody").append(`<tr id="tr_${item.id}">
                    <td class="td_${item.id}">${item.documento}</td>
                    <td class="td_${item.id}">${item.primer_nombre + '' + item.segundo_nombre + ' ' + item.primer_apellido + ' ' + item.segundo_apellido}</td>
                    <td class="td_${item.id}">${item.email}</td>
                    <td class="td_${item.id}">${item.telefono}</td>
                    <td><button class="btn btn-warning btn-sm"  onclick="pasarparametros('${item.nombre}','${item.apellido}','${item.correo}','${item.telefono}',${item.id})">Editar</button></td>
                    <td><button class="btn btn-warning btn-sm"  onclick="paciente_modal()">Eliminar</button></td>
                    
                </tr>`)
            })
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
}

var selecter = (urls, idselect,infselect) =>{

    $.ajax({
        url: urls,
        type: 'GET',
        success: function (respuesta) {
            console.log(respuesta);
            $("#"+idselect).empty().append('<option selected disabled value="">'+infselect+'</option>');
            $.each(respuesta, function (i,item) {
                $("#"+idselect).append(`<option value="${item.id}" >${item.descripcion}</option>`);
            })
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
}

var lista_ciudades =(idciudad,idcampo)=>{
    var iddepartamento= $('#'+idcampo).val();
    selecter(dirconfig+'Parametros/Listar_provicias/'+iddepartamento,idciudad, 'Seleccione Ciudad');
}

var formularioPacModal =()=> {
    //llamada de servicio independiente que llena los campos select
   selecter(dirconfig+'Parametros/Listar_tiopodocumento','id_tipo_documento','Tipo documento');
   selecter(dirconfig+'Sexos/Listar_sexo','id_sexo', 'Sexo');
   selecter(dirconfig+'Parametros/Listar_grupocultural','id_grupo_cultural', 'Gupo Cultural');
   selecter(dirconfig+'Parametros/listar_est_civil','id_estado_civil','Estado Civil');
   selecter(dirconfig+'Parametros/Listar_discapacidades','id_discapacidad','Discapacidad');
   selecter(dirconfig+'Parametros/Listar_departamento','iddepartamento', 'Deparatamento Nacimiento');
   selecter(dirconfig+'Parametros/Listar_departamento','iddepartamento2', 'Departamento Recidencia');
   selecter(dirconfig+'Parametros/Listar_provicias/none','id_ciudad_exp_docume', 'Lugar de Expedicion');
   
   
}
var desactivar_formulario=()=>{
   
    $('#fpac .Cformulario').attr('disabled', 'disabled');
    $('#fpac .Cformulario').attr('list','autocompleteOff').attr('autocomplete','off');
   
}
var activar_formulario=()=>{
    $('#fpac .Cformulario').removeAttr('disabled', 'disabled');
}
