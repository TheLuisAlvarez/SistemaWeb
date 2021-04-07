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

        function Registrar_Rol($rol,$estado){
            $sql = "call SP_REGISTRAR_ROL('$rol','$estado')";
            if ($consulta = $this->conexion->conexion->query($sql)) {
                if ($row = mysqli_fetch_array($consulta)){
                        return $id= trim($row[0]);
                }
                $this->conexion->cerrar();
            }
        }

        function Modificar_Estado_Rol($idrol,$estado){
            $sql = "call SP_MODIFICAR_ESTADO_ROL('$idrol','$estado')";
            if ($consulta = $this->conexion->conexion->query($sql)){
                return 1;
            }else{
                return 0;
           }
        }
    
    }
?>