<?php
    require '../../modelo/modelo_rol.php';
    $MR = new Modelo_Rol();
    
    $idrol = htmlspecialchars($_POST['idrol'], ENT_QUOTES, 'UTF-8');
    $estado = htmlspecialchars($_POST['estado'], ENT_QUOTES, 'UTF-8');
    $consulta = $MR->Modificar_Estado_Rol($idrol,$estado);
    echo $consulta;
?>