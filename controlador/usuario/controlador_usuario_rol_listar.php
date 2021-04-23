<?php
    require '../../Modelo/modelo_usuario.php';
    $MUP = new Modelo_Usuario_Prueba();
    $cod = htmlspecialchars($_POST['cod_usr'], ENT_QUOTES, 'UTF-8');
    $consulta = $MUP->listar_usuario_rol($cod);
    
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