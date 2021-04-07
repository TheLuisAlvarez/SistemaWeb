<?php
    $con = password_hash('123', PASSWORD_DEFAULT,['cost'=>10]);
    echo $con;
?>