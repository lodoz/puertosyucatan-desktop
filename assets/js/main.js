/* Scrolling
-------------------------------------------------------*/
var $window = $(window);
// API de API para traer el json con la informacion de los buques
var buques = {
    url: 'https://www.sparp.com.mx/Accesoft/api/ProgramacionBuques',
    query: ''
};

$window.scroll(function() {
    scrollToTop();
});

/* Scrolling
-------------------------------------------------------*/
$(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 0
    }, 500);
});

/* Show badge scroll top
-------------------------------------------------------*/
function scrollToTop() {
    var scroll = $window.scrollTop();
    var $backToTop = $("#back-to-top");
    if (scroll >= 100) {
        $backToTop.addClass("show");
    } else {
        $backToTop.removeClass("show");
    }
}

function update(){
  var countPuerto = 0;
  var countEstadia = 0;
  var countRemolcadores = 0;
  // Llamar la API de API
    $.get( buques.url, buques.query)
        // Success
        .done( function (res) {
            // Empty Element
            $('#buques').empty();

            // Populate array of latest Buques
            var ultimosBuques = [];

            //Poner la cabecera
            $('#arribos').append(
              '<div id="arribos" class="row pt-5 mb-4">'+
                '<div class="col">'+
                  '<h2 class="mb-4 font-weight-normal">Arribos programados</h2>'+
                  '<div class="card border-0">'
            );

            // Ciclo sobre los buques
            $.each( res, function (i, buque) {
                // Add to latest Buque
                ultimosBuques.push( buque );
                // Add Buque HTML
                if(buque.Estado == 'PROGRAMADO')
                {
                    $('#arribos').append(
                      '<div class="card-body">'+
        								'<div class="row">'+
        									'<div class="col-12 col-md">'+
        										'<b>'+ buque.Buque +'</b><br>'+
        										'<b>Agencia naviera:</b> '+ buque.Agencia + '<br>'+
        										'<b>Carga:</b> ' + buque.Producto +
        									'</div>'+
        									'<div class="col-12 col-md">'+
        										'<b>Posición autorizada:</b> ' + buque.PosicionAutorizada +'<br>'+
        										'<b>Procedencia:</b> ' + buque.Procedencia +
        									'</div>'+
        									'<div class="col-12 col-md-2">'+
        										'<b>ESL:</b> ' + buque.Eslora + '<br>'+
        										'<b>CAL:</b> ' + buque.Calado + '<br>'+
        										'<b>TON:</b> ' + buque.Tonelaje +
        									'</div>'+
        									'<div class="col-12 col-md-2">'+
        										'<b>ETA:</b> ' + buque.ETA + '<br>'+
        										'<b>ETD:</b> ' + buque.ETD +
        									'</div>'+
        									'<div class="col-12 col-md-2 pt-4 pt-md-0 d-flex justify-content-center align-items-center">'+
        										'<span class="text-success">'+
                            '<svg class="bi bi-check2" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>'+
                            ' Autorizado</span>'+
        									'</div>'+
        								'</div>'+
        							'</div>'
                    );
              }
              else
              {
                var divEstado = 'collapsePuerto';
                if(buque.Estado == 'ENPUERTO'){
                  countPuerto +=1;
                }
                else if(buque.Estado == 'REMOLCADOR'){
                  countRemolcadores +=1;
                  divEstado = 'collapseRemolcadores';
                }
                else if (buque.Estado == 'PROLONGADA'){
                  countEstadia +=1;
                  divEstado = 'collapseEstadia';
                }

                $('#'+divEstado+'').append(
                '<div class="card-body"><div class="row"><div class="col-2 col-md-1 text-center d-flex justify-content-center align-items-center">' +
                '<img src="https://www.countryflags.io/'+ buque.Bandera.substring(0, 2) +'/flat/32.png" alt="'+ buque.Bandera +'" title="'+ buque.Bandera +'" loading="lazy" class="img-fluid">'+
                '</div><div class="col-10 col-md"><b>'+ buque.Buque +'</b><br>'+
                '<b>Carga:</b> '+ buque.Producto + '<br></div>'+
                '<div class="offset-2 col-10 offset-md-0 col-md"><b>Posición:</b> '+ buque.Posicion + '<br>'+
                '<b>Puerto:</b> ' + buque.Puerto + '</div>'+
                '<div class="offset-2 col-10 offset-md-0 col-md"><b>Arribo:</b> ' + buque.Arribo + '<br>'+
                '<b>Atraque:</b>  '+ buque.Atraque + '</div>'+
                '<div class="offset-2 col-10 offset-md-0 col-md"><b>ETD:</b> 1' + buque.ETD + '</div>'+
                '</div></div>'
              );
              }
            });

            //Cerrar estructura html
            $('#arribos').append('</div></div></div>');

            //Actualizar countRemolcadores
            $('#countPuerto').append('<small>('+ countPuerto +')</small>');
            $('#countRemolcadores').append('<small>('+ countRemolcadores +')</small>');
            $('#countEstadia').append('<small>('+ countEstadia +')</small>');

            //Actualizar fecha
            var today = new Date();
            var meses = new Array ("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            var factualizada = dd + ' de ' + meses[Number(mm)-1] + ' ' + yyyy;
            $('#fechaActualizacion').text(factualizada);
        })

        // Failure
        .fail(function(){

            $('.alert').slideDown();
            setTimeout( function() { $('.alert').slideUp() }, 2000);
        })

        // Complete
        .always(function() {

        });

    // Prevent submission if originates from click
    return false;
}

$(document).ready(function(){
  update();
  });
