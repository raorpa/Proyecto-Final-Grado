// variables Globales
var menus=[];
var menu=[];
var menuGuardar=[];
var menusGuardar = [];
var pedido = [];
var cookie = [];

//Funciones de Cookies
// Function to get a cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
  
  // Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }
  
  // Function to delete a cookie
function deleteCookie(name) {
      setCookie(name, '', -1);
  }
  
//Funciones Botones principales
//OTON VER LA CARTA
function mostrarCarta(tabla){
    //Parámetros que le vamos a pasara al PHP
    let parametros = {
        "tabla" : tabla
    };
    //En este caso no tiene sentido poner más que la tabla a la que hacemos la consulta
    $.ajax({
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

function mostrarFiltroCarta(){
    limpiarInterfaz();
    document.getElementById('filtroCarta').className = "navbar navbar-expand-md navbar-light bg-light sb-4 justify-content-md-center";
    document.getElementById('filtroCarta').innerHTML =
    "<input type=\"button\" class=\"btn btn-outline-dark btn-mg col-1\" value=\"Montaditos\" onclick=\"mostrarCarta('montaditos')\">"+
    "<div class='col-1'></div>"+
    "<input type=\"button\" class=\"btn btn-outline-dark btn-mg col-1\" value=\"Aperitivos\" onclick=\"mostrarCarta('aperitivos')\">"+
    "<div class='col-1'></div>"+
    "<input type=\"button\" class=\"btn btn-outline-dark btn-mg col-1\" value=\"Tablas\" onclick=\"mostrarCarta('tablas')\">"+
    "<div class='col-1'></div>"+
    "<input type=\"button\" class=\"btn btn-outline-dark btn-mg col-1\" value=\"Ensaladas\" onclick=\"mostrarCarta('ensaladas')\">"+
    "<div class='col-1'></div>"+
    "<input type=\"button\" class=\"btn btn-outline-dark btn-mg col-1\" value=\"Bebidas\" onclick=\"mostrarCarta('bebidas')\">"

    
}

//BOTON CREAR MENU
function mostrarCartaMenu(tabla){
    //menu = [];
    //Parámetros que le vamos a pasara al PHP
    let parametros = {
        "tabla" : tabla
    };
    //En este caso no tiene sentido poner más que la tabla a la que hacemos la consulta
    $.ajax({
        data: parametros,
        //url del php
        url: '/../PHP/MostrarCartaMenu.php',
        //metódo
        type:'POST',        

        //Aqui le decimos que en caso de éxito que ponga el mensaje
        success: function(mensaje){
            $('#mostrar').html(mensaje);
        }
    });
}

//funcion que muestra el filtro de la carta y la cabecera del menú que estamos creando
function filtroMenu(){
    //Se muestran los botones para filtrar
    document.getElementById('filtroCarta').className = "navbar navbar-expand-md navbar-light bg-light sb-4 justify-content-md-center";
    document.getElementById('filtroCarta').innerHTML =
    "<input type=\"button\" class=\"btn btn-outline-dark btn-mg col-1\" value=\"Montaditos\" onclick=\"mostrarCartaMenu('montaditos')\">"+
    "<div class='col-1'></div>"+
    "<input type=\"button\" class=\"btn btn-outline-dark btn-mg col-1\" value=\"Aperitivos\" onclick=\"mostrarCartaMenu('aperitivos')\">"+
    "<div class='col-1'></div>"+
    "<input type=\"button\" class=\"btn btn-outline-dark btn-mg col-1\" value=\"Tablas\" onclick=\"mostrarCartaMenu('tablas')\">"+
    "<div class='col-1'></div>"+
    "<input type=\"button\" class=\"btn btn-outline-dark btn-mg col-1\" value=\"Ensaladas\" onclick=\"mostrarCartaMenu('ensaladas')\">"+
    "<div class='col-1'></div>"+
    "<input type=\"button\" class=\"btn btn-outline-dark btn-mg col-1\" value=\"Bebidas\" onclick=\"mostrarCartaMenu('bebidas')\">";

    //se muestra el campo nombre menu y el botón guardar menu
    document.getElementById('cajaCreaMenu').innerHTML =
    "<div class='navbar navbar-expand-md navbar-white bg-white sb-4 justify-content-md-center' >"+
        "<input type='button' class='btn btn-white'>"+
    "</div>"+

    "<div class='navbar navbar-expand-md navbar-white bg-white sb-4 justify-content-md-center' >"+
        "<input type='button' class='btn btn-white btn-lg col-2' disabled value='Menú'>"+
    "</div>"+
    
    "<div class='input-group mb-3 float-right'>"+
        "<input type='text' class='form-control' placeholder='Nombre del menú' id='nomMenu'>"+
        "<input type='button' value='Guardar Menú' onclick='guardarMenu()' id='saveMenu'>"+
        "<input type='button' value='Limpiar' onclick='limpiarMenu()' id='clearMenu'>"+
    "</div>"+
    "<div id='menuCreando'>"+    
    "</div>";

    mostrarMenuCreando();
}

//funcion que muestra lo que haya en la variable global menú
function mostrarMenuCreando(){

    var html;
    var total = 0;

    menu.sort();

    html = "<table class='table col-5'><tr><th>Número</th><th>Producto</th><th></th><th>Precio</th><th>Unidades</th></tr>";

    menu.forEach(elem => {
        total = total + Number(elem[2].replace("€","")) * elem [3];
        html = html + 
        "<tr>"+
            "<td>"+elem[0]+"</td>"+
            "<td colspan='2' class=''>"+elem[1]+"</td>"+
            "<td>"+elem[2]+"</td>"+
            "<td>"+elem[3]+"</td>"+
        "</tr>";
    });

    html = html + "<tr><td colspan = '2'>Total</td><td></td><td>"+total.toFixed(2)+"€</td></tr></table>";
    document.getElementById('menuCreando').innerHTML = html;
}

//función que obtiene los datos del producto que queremos añadir al menú
function obtenerProducto(id){
        //variables
    var producto;
    //eso se hace porque solamente tienen número los montaditos, si es una ensalada, por ejemplo, no tiene y daría fallo, en ese caso se pondría 0
    var numMontadito;
    try{
        numMontadito = document.getElementById(id+'num').innerText;
    }catch{
        numMontadito = 0;
    };
    //se obtiene el nombre y el precio del producto que se ha seleccionado.
    var nomProducto = document.getElementById(id+'nom').innerText;
    var preProducto = document.getElementById(id+'pre').innerText;


    //añadimos 00 al número de montadito si es menor a 10 y 0 para los menores de 100 para que estén ordenados y tengan los mismo dígitos
    //si el número de montadito es 0 quiere decir que no es un montadito, por lo que no tienen número, entonces se quita para que no salga en el menú
    if(numMontadito < 10 && numMontadito != 0){
        producto = ["00"+numMontadito, nomProducto, preProducto, 1];
    }else if(numMontadito < 100 && numMontadito != 0){
        producto = ["0"+numMontadito, nomProducto, preProducto, 1];
    }else if(numMontadito == 0){
        producto = [" ", nomProducto, preProducto, 1];
    }else{
        producto = [numMontadito, nomProducto, preProducto, 1];
    }

    return producto;
}

//funcion que añade un producto al menú que estamos creando o editando
function añadir(id){
    //variables
    var producto = obtenerProducto(id);    
    var yaEsta = false;

    //añadimos 1 a la cantidad de producto en caso de existir ya en el mennú
    for(i = 0; i < menu.length; i++){
        if(menu[i][1] == producto[1]){
            menu[i][3] = menu[i][3] + 1;
            yaEsta = true;
        }
    };

    //añadimos el producto  al menú unícamente si no está ya
    if(yaEsta){ //si ya está, hay que actualizar la variable global que guarda en string
        menuGuardar = [];
        menu.forEach(pro =>{
            menuGuardar.push(JSON.stringify(pro));
        });
    }else{
        menuGuardar.push(JSON.stringify(producto));
        menu.push(producto);
    };
    
    //actualizamos el menú que se muestra en pantalla
    mostrarMenuCreando("cajaCreaMenu");

}

//función que quita un producto del menú que estamos creando
function quitar(id){
    var producto = obtenerProducto(id);


    for(i = 0; i < menu.length; i++){
        if(menu[i][1] == producto[1]){
            menu[i][3] = menu[i][3] - 1;
            menuGuardar = [];

            menu.forEach(pro =>{
                menuGuardar.push(JSON.stringify(pro));
            });

            if(menu[i][3]<= 0){
                menu.splice(i,1);
                menuGuardar.splice(i,1);
            }            
        }
    };

    mostrarMenuCreando("cajaCreaMenu");
}

//en vez de guardar una cookie con todos los menus, guardar una cookie con el nombre de todas cookies y una cookie por cada menú
function guardarMenu(){
    //obtenermos las cookies actuales
    var aux = getCookie('menus');
    var sobrescribir = false;
    var menuExistente = false;

    //si no había cookies no se guardan en la variable Golbal
    if(aux != null){
        menusGuardar= JSON.parse(aux);
    }

    //guardamos el nombre que hay en el campo del nombre del menu
    var nombreMenu = document.getElementById('nomMenu').value;

    if(nombreMenu == "" || nombreMenu == null){
        alert('Por favor, elige un nombre');
    }else{
        //Añadimos el menu a los menus si no está ya
        menusGuardar.forEach(elem=>{
            if (elem == nombreMenu){            
                sobrescribir=confirm("Ya existe un menú con ese nombre.¿Quieres sobreescribirlo?");
                menuExistente = true;
                alert("Menú guardado.");
            }
        })

        if(!menuExistente){
            menusGuardar.push(nombreMenu ,JSON.stringify(menuGuardar));        
            //guardamos los menus en las cookies
            setCookie('menus', JSON.stringify(menusGuardar), 7);
            alert("Menú guardado");
        }else{
            if (sobrescribir){
                for(i = 0; i < menusGuardar.length; i++){
                    if (menusGuardar[i] == nombreMenu){
                        menusGuardar[i+1] = JSON.stringify(menuGuardar);
                        setCookie('menus', JSON.stringify(menusGuardar), 7);
                    }
                }
            }
        }   
        //guardamos los menus en las cookies
        setCookie('menus', JSON.stringify(menusGuardar), 7);
    }   
    menuGuardar = [];
}

//funcion que borra un menú
function borrarMenu(nombre){

    var decision = confirm("El menú "+menus[nombre]+" será borrado para siempre. Además, el pedido actual que tuvieras también será borrado. ¿Desea continuar?");
    var aux = getCookie('menus');
    console.log(aux);
    var menusJSON = JSON.parse(getCookie('menus'));
    //console.log(menusJSON);

    if(decision){
        menusJSON.splice(nombre, 2);
        setCookie('menus', JSON.stringify(menusJSON), 7);
        deleteCookie('pedido');
    }

    pintarMenusEditar("mostrar");
}

//funcion que limpia la variable global menu
function limpiarMenu(){
    menu = [];
    mostrarMenuCreando();
    document.getElementById('nomMenu').value = "";
}

//funcion que obtiene la colección menus de los datos que hay en las cookies
function obtenerMenusCookies(){
    //Se inician las variables
    menus=[];
    var aux = getCookie('menus'); //obtenemos la Cookie

    if(aux == null){
        
    }else{
        var auxMenu=[];
        menusGuardar = JSON.parse(aux); //Convertimos la cookie en una colección de menus 

        //
        for(i = 0; i < menusGuardar.length; i++){
            aux = menusGuardar[i]; //aux = nombre del menú
            i++;
            auxMenu.push(aux, JSON.parse(menusGuardar[i])); //auxMenu = [nombre, menú, nombre, menu,...]
        }; 

        for(i = 0; i < auxMenu.length; i++){
            menu = []; //reiniciar menu global

            //console.log(auxMenu[i]); 
            i++; //i=1,3,5,7 ...
            auxMenu[i].forEach(prod=>{ //por cada producto del menú (el menú está en las posiciones impares)
                menu.push(JSON.parse(prod)) //añadimos el producto al menú global convirtiendo el JSON en un array [número, nombre, precio, cantidad]
            });   
            
            menus.push(auxMenu[i-1], menu); //añadimos el nombre del menú y el menú en la global menus
        };

    }   

}

//Se pintan los menús que haya en menus a la hora de editarlos
function pintarMenusEditar(caja){
    obtenerMenusCookies();
    var total = 0;

    if(menus.length == 0){
        pintarNoMenu();
    }else{
        limpiarInterfaz();
        var cajaHTML = document.getElementById(caja);
        var html = "";

        for(i = 0; i < menus.length ; i++){
            total = 0;
            if(i % 2 == 0){ //si el número es par pintamos el nombre de la tabla
                html+=
                "<table class='table col-5 table-light table-striped'>"+
                    "<tr>"+
                        "<th colspan = '3'>"+menus[i]+"</th>"+
                        "<th id='botonMenu"+i+"'><input type='button' class='btn btn-info' value='Editar' onclick='editarMenu("+i+","+(i+1)+")'>"+
                        "<input type='button' value='Borrar' class='btn btn-danger' onclick='borrarMenu("+i+")'></th>"+
                    "</tr>"+
                    "<tr>"+
                        "<td>Número</td>"+
                        "<td>Descipción</td>"+
                        "<td>Precio</td>"+
                        "<td>Cantidad</td>"+
                    "</tr>";
            }else{ //pintamos el cuerpo de la tabla
                menu = menus[i];
                menu.sort();
                html+="<body>";
                menu.forEach(prod=>{
                    total = total + Number(prod[2].replace("€","")) * prod[3];
                    html+="<tr>";                
                    prod.forEach(caracteristica =>{
                        html+="<td>"+caracteristica+"</td>";
                    });
                    html+="</tr>";
                });
                html+="<tr><th>Total</th><td></td><th>"+total.toFixed(2)+"€</th><th></th></tr></body></table>";                    
            };
        };
        cajaHTML.innerHTML= html;
    }
    menu = [];
}

//funcion que nos lleva a editar el menú que queramos
function editarMenu(nomMenu, numMenu){
    menu=menus[numMenu];
    nomMenu = menus[nomMenu];
    menuGuardar = [];
    console.log(menu);
    menu.forEach(prod=>{
        menuGuardar.push(JSON.stringify(prod));
    });

    console.log(menuGuardar);

    mostrarCartaMenu('montaditos'); 
    filtroMenu();
    mostrarMenuCreando();
    document.getElementById('nomMenu').value = nomMenu;
}

//está función limpia los divs donde se pintan las cosas
function limpiarInterfaz(){
    document.getElementById('filtroCarta').innerHTML = "";
    document.getElementById('mostrar').innerHTML = "";
    document.getElementById('cajaCreaMenu').innerHTML="";

}

//funcion para ver el pedido total y añadirle menús
function pedidoTotal(){
    limpiarInterfaz();
    pintarMenusEditar("cajaCreaMenu");
    obtenerMenusCookies();
    try{
        cookie = JSON.parse(getCookie('pedido'));
    }catch{
        cookie = [];
    }

    try{
        pintarPedido();
    }catch{}   

    if(menus.length == 0){
        pintarNoMenu();
    }else{
        var botonMenu = "";       
        for(i=0; i< menus.length; i++){
            if(i % 2 == 0){
                botonMenu = document.getElementById('botonMenu'+i);
                botonMenu.innerHTML="<input type='button' class='btn btn-success' value='Añadir' onclick='aniadirMenu("+i+")'>"+
                "<input type='button' value='Quitar' class='btn btn-danger' onclick='quitarMenu("+i+")'>";
            }
        }
    }
    menu = [];
}

//función que añade un menú al pedido
function aniadirMenu(id){    

    //para añadir un menú guardamos la posición que ocupa dicho menú en la colección menus y la añadimos a la colección cookie que guardaremos en la cookie 'pedido'
    try{
        cookie = JSON.parse(getCookie('pedido'));
    }catch{
    }    
    cookie.push(id+1);
    setCookie('pedido', JSON.stringify(cookie), 7);
      
    pintarPedido();
}

function quitarMenu(id){
    cookie = JSON.parse(getCookie('pedido'));
    var i = 0;

    for(i = 0; i<cookie.length;i++){
        if(id+1 == cookie[i]){
            cookie.splice(i,1);
            i = cookie.length;
                     
        }
    }
        

    setCookie('pedido', JSON.stringify(cookie), 7);
    pintarPedido();
}

//función que avisa de que no hay menús guardados
function pintarNoMenu(){
    limpiarInterfaz();
    document.getElementById('mostrar').innerHTML = "<h2>No hay menús almacenados en tus cookies, ve a <input type='button' "+
    "onclick = \"mostrarCartaMenu('montaditos'); filtroMenu()\" value = 'Crear Menú' class='btn-lg'>"+
    " y crea tu menú!!!</h2>";
}

function pintarPedido(){
    var html;
    var pedidoGuardado = JSON.parse(getCookie('pedido'));
    var flag = false;
    pedido = [];
    var total = 0;
    
    //creamos el pedido a raiz de los menus almacenados en la cookie pedido
    pedidoGuardado.forEach(men=>{
        obtenerMenusCookies();
        menu = menus[men];
        menu.forEach(prod =>{
           for(i = 0; i<pedido.length; i++){
                if(pedido[i][1] == prod[1]){                   
                    pedido[i][3] = pedido[i][3] + prod[3];
                    flag = true;
                }
            }
            if(!flag){
                pedido.push(prod);
            }
            flag = false;
        })
        
    })

    html = 
    "<table class='table table-info table-striped'>"+
        "<thead>"+
            "<tr>"+
                "<th>Número</th>"+
                "<th>Descipción</th>"+
                "<th>Precio</th>"+
                "<th>Cantidad</th>"+
            "</tr>"+
        "</thead>"+
        "<tbody>";
    pedido.sort();
    pedido.forEach(prod =>{
        total = total + Number(prod[2].replace("€","")) * prod[3];
        html+="<tr>";                
        prod.forEach(caracteristica =>{
            html+="<td>"+caracteristica+"</td>";
        });
        html+="</tr>";        
    })
    html+="<tr><th>Total</th><th></th><th>"+total.toFixed(2)+"€</th><th></th></tr></tbody></table>";

    document.getElementById("mostrar").innerHTML = html;
}




//BORRAR
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

function borrartodo(){
    deleteCookie('pedido');
}

function verCookies(){
    console.log(getCookie('pedido'));
}