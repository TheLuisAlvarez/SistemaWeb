-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para bd_sistemaweb
CREATE DATABASE IF NOT EXISTS `bd_sistemaweb` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `bd_sistemaweb`;

-- Volcando estructura para tabla bd_sistemaweb.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `rol_id` int(11) NOT NULL AUTO_INCREMENT,
  `rol_nombre` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `rol_estado` enum('ACTIVO','INACTIVO') COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`rol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla bd_sistemaweb.rol: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` (`rol_id`, `rol_nombre`, `rol_estado`) VALUES
	(1, 'Administrador', 'ACTIVO');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;

-- Volcando estructura para procedimiento bd_sistemaweb.SP_VERIFICAR_USUARIO
DELIMITER //
CREATE PROCEDURE `SP_VERIFICAR_USUARIO`(IN USUARIO VARCHAR(15))
SELECT * FROM usuario WHERE usuario_nombre = USUARIO//
DELIMITER ;

-- Volcando estructura para tabla bd_sistemaweb.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_nombre` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `usuario_contrasena` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `usuario_correo` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `usuario_intento` int(11) DEFAULT NULL,
  `usuario_estado` enum('ACTIVO','INACTIVO') COLLATE utf8_spanish_ci DEFAULT NULL,
  `rol_id` int(11) DEFAULT '0',
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `usuario_nombre` (`usuario_nombre`),
  UNIQUE KEY `usuario_correo` (`usuario_correo`),
  KEY `FK_usuario_rol` (`rol_id`),
  CONSTRAINT `FK_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla bd_sistemaweb.usuario: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`usuario_id`, `usuario_nombre`, `usuario_contrasena`, `usuario_correo`, `usuario_intento`, `usuario_estado`, `rol_id`) VALUES
	(1, 'admin', '$2y$10$pIj.3ZzwSja1Io56kpqCzO.urcVHQMtQMMwasMScvGMzSm.aq3EPC', NULL, NULL, 'ACTIVO', 1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
