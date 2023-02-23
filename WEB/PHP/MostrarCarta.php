<?php
// Conectamos a la base de datos
$connection = mysqli_connect('localhost', 'TFG', 'RamonTFG', '100m');
$connection->set_charset("utf8");

// Verificamos si la conexión es exitosa
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

// Creamos las consultas de las tablas
$queryMontaditos = "SELECT * FROM montaditos";
$queryBebidas = "SELECT * FROM bebidas";
$queryAperitivos = "SELECT * FROM aperitivos";
$queryTablas = "SELECT * FROM tablas";
$queryEnsaladas = "SELECT * FROM ensaladas";

//hacemos las consultas en la base de datos
$montaditos = mysqli_query($connection, $queryMontaditos);
$aperitivos = mysqli_query($connection, $queryAperitivos);
$tablas = mysqli_query($connection, $queryTablas);
$ensaladas = mysqli_query($connection, $queryEnsaladas);
$bebidas = mysqli_query($connection, $queryBebidas);

// Mostramos el resultado
//Tabla montaditos
switch ($_POST['tabla']){
    case 'montaditos':

        echo "<table class='table table-striped'>
        <thead>
            <tr>
                <th colspan=3 style='text-align: center'>MONTADITOS</th>
            </tr>
            <tr>
                <th>NÚMERO</th>
                <th>DESCRIPCIÓN</th>
                <th>PRECIO</th>
            </tr>
        </thead>
        <tbody>";

        while ($row = mysqli_fetch_assoc($montaditos)) {
            //echo $campo;
            echo "
                <tr>
                    <td>".$row['NUM']."</td>
                    <td>".$row['DESCRIPCION']."</td>
                    <td>".$row['PRECIO']."€</td>
                </tr>
        ";
        }
        echo "    </tbody>
        </table>";
    break;

    case 'aperitivos':
        echo "<table class='table table-striped'>
                <thead>
                    <tr>
                        <th colspan=2 style='text-align: center'>APERITIVOS</th>
                    </tr>
                    <tr>
                        <th>APERITIVO</th>
                        <th>PRECIO</th>
                    </tr>
                </thead>
                <tbody>";

                while ($row = mysqli_fetch_assoc($aperitivos)) {
                    //echo $campo;
                    echo "
                        <tr>
                            <td>".$row['nombre']."</td>
                            <td>".$row['precio']."€</td>
                        </tr>
                ";
                }
            echo "    </tbody>
                </table>";
    break;

    case 'tablas':
        echo "<table class='table table-striped'>
                <thead>
                    <tr>
                        <th colspan=3 style='text-align: center'>TABLAS</th>
                    </tr>
                    <tr>
                        <th>NOMBRE</th>
                        <th>MONTADITOS</th>
                        <th>PRECIO</th>
                    </tr>
                </thead>
                <tbody>";

                while ($row = mysqli_fetch_assoc($tablas)) {
                    //echo $campo;
                    echo "
                        <tr>
                            <td>".$row['nombre']."</td>
                            <td>".$row['m1'].", ".$row['m2'].", ".$row['m3'].", ".$row['m4']." y ".$row['m5']."</td>
                            <td>".$row['precio']."€</td>
                        </tr>
                ";
                }
            echo "    </tbody>
                </table>";
    break;

    case 'ensaladas':
        echo "<table class='table table-striped'>
                <thead>
                    <tr>
                        <th colspan=3 style='text-align: center'>ENSALADAS</th>
                    </tr>
                    <tr>
                        <th>NOMBRE</th>
                        <th>DESCRIPCIÓN</th>
                        <th>PRECIO</th>
                    </tr>
                </thead>
                <tbody>";

                while ($row = mysqli_fetch_assoc($ensaladas)) {
                    //echo $campo;
                    echo "
                        <tr>
                            <td>".$row['nombre']."</td>
                            <td>".$row['DESCRIPCION']."</td>
                            <td>3.50€</td>
                        </tr>
                ";
                }
            echo "    </tbody>
                </table>";
    break;

    case 'bebidas':
        echo "<table class='table table-striped'>
                <thead>
                    <tr>
                        <th colspan=2 style='text-align: center'>BEBIDAS</th>
                    </tr>
                    <tr>
                        <th>NOMBRE</th>
                        <th>PRECIO</th>
                    </tr>
                </thead>
                <tbody>";

                while ($row = mysqli_fetch_assoc($bebidas)) {
                    //echo $campo;
                    echo "
                        <tr>
                            <td>".$row['nombre']."</td>
                            <td>".$row['precio']."€</td>
                        </tr>
                ";
                }
            echo "    </tbody>
                </table>";
    break;
}




// Cerramos la conexión
mysqli_close($connection);
?>
