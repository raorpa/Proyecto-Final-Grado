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

$idGen = 0;

// Mostramos el resultado
//Tabla montaditos
switch ($_POST['tabla']){
    case 'montaditos':

        echo "<table class='table table-striped'>
        <thead>
            <tr>
                <th colspan=4 style='text-align: center'>MONTADITOS</th>
            </tr>
            <tr>
                <th>NÚMERO</th>
                <th>DESCRIPCIÓN</th>
                <th>PRECIO</th>
                <th>AÑADIR/QUITAR</th>
            </tr>
        </thead>
        <tbody>";

        while ($row = mysqli_fetch_assoc($montaditos)) {
            //echo $campo;
            echo "
                <tr>
                    <td id='".$idGen."num'>".$row['NUM']."</td>
                    <td id='".$idGen."nom'>".$row['DESCRIPCION']."</td>
                    <td id='".$idGen."pre'>".$row['PRECIO']."€</td>
                    <td style='text-align:center'><input type='button' class='btn btn-success' value='+' onclick='añadir(".$idGen.")'>
                    <input type='button' class='btn btn-danger' value='-' onclick='quitar(".$idGen.")'></td>
                </tr>
        ";
        $idGen = $idGen +1;
        }
        echo "    </tbody>
        </table>";
    break;

    //tabla aperitivos
    case 'aperitivos':
        echo "<table class='table table-striped'>
                <thead>
                    <tr>
                        <th style='text-align: center' colspan=3>APERITIVOS</th>
                    </tr>
                    <tr>
                        <th>APERITIVO</th>
                        <th>PRECIO</th>
                        <th>AÑADIR/QUITAR</th>
                    </tr>
                </thead>
                <tbody>";

                while ($row = mysqli_fetch_assoc($aperitivos)) {
                    //echo $campo;
                    echo "
                        <tr>
                            <td id='".$idGen."nom'>".$row['nombre']."</td>
                            <td id='".$idGen."pre'>".$row['precio']."€</td>
                            <td style='text-align:center'><input type='button' class='btn btn-success' value='+' onclick='añadir(".$idGen.")'>
                            <input type='button' class='btn btn-danger' value='-' onclick='quitar(".$idGen.")'></td>
                        </tr>
                ";
                $idGen = $idGen +1;
                }
            echo "    </tbody>
                </table>";
    break;

    //tabla tablas
    case 'tablas':
        echo "<table class='table table-striped'>
                <thead>
                    <tr>
                        <th style='text-align: center' colspan=3>TABLAS</th>
                    </tr>
                    <tr>
                        <th>NOMBRE</th>
                        <th>PRECIO</th>
                        <th>AÑADIR/QUITAR</th>
                    </tr>
                </thead>
                <tbody>";

                while ($row = mysqli_fetch_assoc($tablas)) {
                    //echo $campo;
                    echo "
                        <tr>
                            <td id='".$idGen."nom'>".$row['nombre']."</td>
                            <td id='".$idGen."pre'>".$row['precio']."€</td>
                            <td style='text-align:center'><input type='button' class='btn btn-success' value='+' onclick='añadir(".$idGen.")'>
                            <input type='button' class='btn btn-danger' value='-' onclick='quitar(".$idGen.")'></td>
                        </tr>
                ";
                $idGen = $idGen +1;
                }
            echo "    </tbody>
                </table>";
    break;

    //tabla ensaladas
    case 'ensaladas':
        echo "<table class='table table-striped'>
                <thead>
                    <tr>
                        <th style='text-align: center' colspan=4>ENSALADAS</th>
                    </tr>
                    <tr>
                        <th>NOMBRE</th>
                        <th>PRECIO</th>
                        <th>AÑADIR/QUITAR</th>
                    </tr>
                </thead>
                <tbody>";

                while ($row = mysqli_fetch_assoc($ensaladas)) {
                    //echo $campo;
                    echo "
                        <tr>
                            <td id='".$idGen."nom'>".$row['nombre']."</td>
                            <td id='".$idGen."pre'>3.50€</td>
                            <td style='text-align:center'><input type='button' class='btn btn-success' value='+' onclick='añadir(".$idGen.")'>
                            <input type='button' class='btn btn-danger' value='-' onclick='quitar(".$idGen.")'></td>
                        </tr>
                ";
                $idGen = $idGen +1;
                }
            echo "    </tbody>
                </table>";
    break;

    //tabla bebidas
    case 'bebidas':
        echo "<table style='text-align: center' class='table table-striped'>
                <thead>
                    <tr>
                        <th colspan=3>BEBIDAS</th>
                    </tr>
                    <tr>
                        <th>NOMBRE</th>
                        <th>PRECIO</th>
                        <th>AÑADIR/QUITAR</th>
                    </tr>
                </thead>
                <tbody>";

                while ($row = mysqli_fetch_assoc($bebidas)) {
                    //echo $campo;
                    echo "
                        <tr>
                            <td id='".$idGen."nom'>".$row['nombre']."</td>
                            <td id='".$idGen."pre'>".$row['precio']."€</td>
                            <td style='text-align:center'><input type='button' class='btn btn-success' value='+' onclick='añadir(".$idGen.")'>
                            <input type='button' class='btn btn-danger' value='-' onclick='quitar(".$idGen.")'></td>
                        </tr>
                ";
                $idGen = $idGen +1;
                }
            echo "    </tbody>
                </table>";
    break;
}




// Cerramos la conexión
mysqli_close($connection);
?>
