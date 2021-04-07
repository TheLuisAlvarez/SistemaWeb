<?php
    require '../../modelo/modelo_rol.php';
    $MR = new Modelo_Rol();
    
    $rol = htmlspecialchars($_POST['rol'], ENT_QUOTES, 'UTF-8');
    $estado = htmlspecialchars($_POST['estado'], ENT_QUOTES, 'UTF-8');
    $consulta = $MR->Registrar_Rol($rol,$estado);
    echo $consulta;
?>