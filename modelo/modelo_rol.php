<?php
    class Modelo_Rol{
        private $conexion;

        function __construct(){
            require_once 'modelo_conexion.php';
            $this -> conexion = new conexion();
            $this -> conexion -> conectar();
        }

        function Listar_rol(){
            $sql = "call SP_LISTAR_ROL";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)){
                while($consulta_vu = mysqli_fetch_assoc($consulta)){
                        $arreglo["data"][] = $consulta_vu;

                    }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }
    }
?>