<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

$archivo = fopen('data.txt', 'r');
$numRegistros = 0;

while (($line = fgets($archivo)) !== false) {
    $contenido = unserialize($line);

    if (isset($contenido['nombre'])) {
        $numRegistros = $numRegistros + 1;
    }
}

?>