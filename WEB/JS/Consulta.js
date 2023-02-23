function mostrarColumna(tabla){

    document.getElementById('filtroCarta').innerHTML(
        
    )

    //Parámetros que le vamos a pasara al PHP
    let parametros = {
        "tabla" : tabla,
        "columna" : campo
    };

    $.ajax({
        //Le idicamos que le pasamos los parametros
        data: parametros,
        //url del php
        url: '/../PHP/MostrarCarta.php',
        //metódo
        type:'POST',

        //Aqui le decimos que en caso de éxito que ponga el mensaje
        success: function(mensaje){
            $('#mostrar').html(mensaje);
        }
    });
}