<?php
    class conexion_prueba {
        private $servidor;
        private $usuario;
        private $contrasena;
        private $basedatos;
        public $conexion_prueba;

        public function __construct(){
            $this -> servidor = "192.168.10.219";
            $this -> usuario = "pruebas";
            $this -> contrasena = "22.04.2021";
            $this -> basedatos = "seafrost_w";
        }

        function conectar_prueba(){
            $this -> conexion_prueba = new mysqli($this -> servidor, $this -> usuario, $this -> contrasena, $this -> basedatos);
            $this -> conexion_prueba -> set_charset("utf8");
        }

        function cerrar_prueba(){
            $this -> conexion_prueba -> close();
        }
    }
?>