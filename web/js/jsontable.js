$(document).ready(function () {
    // How old are you?
var m = moment("08-09-2020", "MM-DD-YYYY");

console.log('You are '+m.fromNow() + ' old'); // You are 23 years ago old

// Oops. We better leave the "ago" part out:
console.log('You are '+m.fromNow(true) + ' old'); // You are 23 years old

// When will the next world cup be?
console.log( moment('June 12th, 2014','MMM DD YYYY').fromNow() ); // in 2 years

// What will be the date 7 days from now?
console.log( moment().add('days',7).format('MMMM Do, YYYY') ); // September 7th, 2012
   
});

let tabla=()=>{
    var urls= $('#urls').val();// solo es valido si tiene como respuesta json   
$.ajax({
    url: urls,//url del servicio a consultar
    type:'get',//tipo de servicio a consultar
   // data:data,//dato opcional que se envia al servicio
    beforeSend:function (){},
    headers: {'Authorization':''},//token de Atorizacion
    success: function(respuesta) {     
    $.each(respuesta, function (i,item) {
        if(i<1){
            arreglo=Object.keys(item).toString();
            arreglo=`<thead>
                        <tr>
                            <th scope="col">`+arreglo.replaceAll(',',`</th>
                            <th scope="col">`)+`</th>
                        </tr>
                     </thead>
                     <tbody id="tbody">
                     </tbody>`;
            console.log(arreglo);
            $("#table").empty().append(arreglo);
        }
        arreglo=Object.values(item).toString();
        arreglo= ` <tr id="tr_${item.ID}"> 
                        <td scope="row" class="td_${item.ID}">
                        `+ arreglo.replaceAll(',',`</td>
                        <td scope="row" class="td_${item.ID}">`)+`
                        </td>
                        </tr>`;
        $("#tbody").append(arreglo);
        console.log(arreglo);
    });
   
    },
    error: function() {
        console.log('');//si se desea enviar respuesta a consola del error
    },complete:function(){
      

    }
});
}
