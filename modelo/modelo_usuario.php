<?php
    class Modelo_Usuario{
        private $conexion;

        function __construct(){
            require_once 'modelo_conexion.php';
            $this -> conexion = new conexion();
            $this -> conexion -> conectar();
        }

        function Verificar_Usuario($usuario, $contrasena){
            $sql = "call SP_VERIFICAR_USUARIO('$usuario')";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)){
                while($consulta_vu = mysqli_fetch_array($consulta)){
                    if(password_verify($contrasena, $consulta_vu['usuario_contrasena'])){
                        $arreglo[] = $consulta_vu;
                    }
                    return $arreglo;
                    $this->conexion->cerrar();
                }
            }
        }
    
    }

    
    class Modelo_Usuario_Prueba{
        private $conexion_prueba;

        function __construct(){
            require_once 'modelo_conexion_prueba.php';
            $this -> conexion_prueba = new conexion_prueba();
            $this -> conexion_prueba -> conectar_prueba();
        }

        function listar_usuario(){
            $sql ="SELECT DISTINCT cod_usr, usuario from v_acceso";
            $arreglo = array();
            if ($consulta = $this->conexion_prueba->conexion_prueba->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion_prueba->cerrar_prueba();
            }
        }
    }

?>