-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-10-2025 a las 16:42:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `atlas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migration_versions`
--

CREATE TABLE `migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` longtext DEFAULT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `project`
--

INSERT INTO `project` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'API Symfony', 'Desarrollo de API REST con Symfony', '2025-10-22 16:45:58', '2025-10-22 16:45:58'),
(2, 'App Móvil', 'Aplicación móvil React Native', '2025-10-22 16:45:58', '2025-10-22 16:45:58'),
(3, 'Dashboard Admin', 'Panel de administración', '2025-10-22 16:45:58', '2025-10-22 16:45:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `hours` decimal(6,2) NOT NULL,
  `date` date NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `status` varchar(50) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `task`
--

INSERT INTO `task` (`id`, `user_id`, `project_id`, `title`, `description`, `hours`, `date`, `created_at`, `updated_at`, `status`) VALUES
(1, 1, 1, 'Crear entidades', 'Crear las entidades User, Project, Task', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'completed'),
(2, 1, 1, 'Configurar rutas API', 'Configurar los endpoints de la API', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'in_progress'),
(3, 1, 2, 'Diseñar interfaz login', 'Diseñar la pantalla de login móvil', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'pending'),
(4, 1, 2, 'Implementar autenticación', 'Sistema de login y registro', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'pending'),
(5, 2, 3, 'Crear dashboard principal', 'Vista principal del admin', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'completed'),
(6, 2, 3, 'Reportes de proyectos', 'Generar reportes mensuales', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'in_progress'),
(7, 2, 1, 'Testing API', 'Pruebas unitarias de endpoints', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'pending'),
(8, 2, 2, 'Implementar autenticación', 'Sistema de login y registro', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'pending'),
(9, 2, 3, 'Crear dashboard principal', 'Vista principal del admin', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'completed'),
(10, 3, 3, 'Reportes de proyectos', 'Generar reportes mensuales', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'in_progress'),
(11, 3, 1, 'Testing API', 'Pruebas unitarias de endpoints', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'pending'),
(12, 3, 2, 'Implementar autenticación', 'Sistema de login y registro', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'pending'),
(13, 3, 3, 'Crear dashboard principal', 'Vista principal del admin', 0.00, '0000-00-00', '2025-10-22 16:45:58', '2025-10-22 16:45:58', 'completed');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `created_at`, `updated_at`) VALUES
(1, 'David Pacheco', 'david@empresa.com', '2025-10-22 16:45:58', '2025-10-22 16:45:58'),
(2, 'María López', 'maria@empresa.com', '2025-10-22 16:45:58', '2025-10-22 16:45:58'),
(3, 'Carlos Ruiz', 'carlos@empresa.com', '2025-10-22 16:45:58', '2025-10-22 16:45:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_project_rate`
--

CREATE TABLE `user_project_rate` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `rate` decimal(10,2) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user_project_rate`
--

INSERT INTO `user_project_rate` (`id`, `user_id`, `project_id`, `rate`, `currency`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 45.00, 'USD', '2025-10-22 16:45:58', '2025-10-22 16:45:58'),
(2, 1, 2, 50.00, 'USD', '2025-10-22 16:45:58', '2025-10-22 16:45:58'),
(3, 1, 3, 40.00, 'USD', '2025-10-22 16:45:58', '2025-10-22 16:45:58'),
(4, 2, 1, 35.00, 'USD', '2025-10-22 16:45:58', '2025-10-22 16:45:58'),
(5, 2, 2, 42.00, 'USD', '2025-10-22 16:45:58', '2025-10-22 16:45:58'),
(6, 3, 3, 38.00, 'USD', '2025-10-22 16:45:58', '2025-10-22 16:45:58');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `migration_versions`
--
ALTER TABLE `migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indices de la tabla `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_527EDB25A76ED395` (`user_id`),
  ADD KEY `IDX_527EDB25166D1F9C` (`project_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_project_rate`
--
ALTER TABLE `user_project_rate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_66B18B23A76ED395` (`user_id`),
  ADD KEY `IDX_66B18B23166D1F9C` (`project_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user_project_rate`
--
ALTER TABLE `user_project_rate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `task`
  ADD CONSTRAINT `FK_527EDB25166D1F9C` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `FK_527EDB25A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_project_rate`
--
ALTER TABLE `user_project_rate`
  ADD CONSTRAINT `FK_66B18B23A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
  ADD CONSTRAINT `FK_66B18B23166D1F9C` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);
COMMIT;

