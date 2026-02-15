<?php
    $pdo_rdbms = "mysql";
    $pdo_server_name = "localhost";
    $pdo_database_name = "jomai_jannel_wedding";
    $pdo_username = "root";
    $pdo_password = "T3st_jomysql_cloud";
    $pdo_dsn = $pdo_rdbms.":host=".$pdo_server_name.";dbname=".$pdo_database_name.";";
    $pdo_db_connection = new PDO($pdo_dsn, $pdo_username, $pdo_password);
?>