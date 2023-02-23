<?php
// Conectamos a la base de datos
//'192.168.18.39'
$connection = mysqli_connect('localhost','TFG', 'RamonTFG', '100m');
$connection->set_charset("utf8");

// Verificamos si la conexión es exitosa
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

// Realizamos la consulta
$campo = $_POST["columna"];
$query = "SELECT * FROM ".$_POST['tabla'];

$result = mysqli_query($connection, $query);

// Mostramos el resultado
while ($row = mysqli_fetch_assoc($result)) {
    //echo $campo;
    echo $row[$campo];
}

// Cerramos la conexión
mysqli_close($connection);
?>
