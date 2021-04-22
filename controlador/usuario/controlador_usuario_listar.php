<?php
    require '../../Modelo/modelo_usuario.php';
    $MUP = new Modelo_Usuario_Prueba();
    $consulta = $MUP->listar_usuario();
    
    if($consulta){
        echo json_encode($consulta);
    }else{
        echo '{
		    "sEcho": 1,
		    "iTotalRecords": "0",
		    "iTotalDisplayRecords": "0",
		    "aaData": []
		}';
    }
?>