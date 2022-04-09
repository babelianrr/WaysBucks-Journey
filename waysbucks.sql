-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2022 at 12:30 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `waysbucks`
--

-- --------------------------------------------------------

--
-- Table structure for table `beverages`
--

CREATE TABLE `beverages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `beverages`
--

INSERT INTO `beverages` (`id`, `name`, `price`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Ice Coffee Palm Sugar', 32000, '1649407218829-icecoffeepalmsugar.png', '2022-04-08 06:58:30', '2022-04-08 08:40:18'),
(2, 'Ice Coffee Green Tea', 32000, '1649401124621-icecoffeegreentea.png', '2022-04-08 06:58:44', '2022-04-08 06:58:44'),
(3, 'Hanami Latte', 31000, '1649401137267-hanamilatte.png', '2022-04-08 06:58:57', '2022-04-08 06:58:57');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220212124307-create-user.js'),
('20220212124345-create-beverage.js'),
('20220212124359-create-topping.js'),
('20220213145612-create-transaction.js');

-- --------------------------------------------------------

--
-- Table structure for table `toppings`
--

CREATE TABLE `toppings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `toppings`
--

INSERT INTO `toppings` (`id`, `name`, `price`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Coconut', 4000, '1649407387107-coconut.png', '2022-04-08 06:59:14', '2022-04-08 08:43:07'),
(2, 'Mango', 5000, '1649407286668-mango.png', '2022-04-08 08:41:26', '2022-04-08 08:41:26');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `postal` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Incomplete',
  `beverageId` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `toppingId` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `userId`, `name`, `phone`, `address`, `postal`, `status`, `beverageId`, `qty`, `toppingId`, `price`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Bayu Perkasa', '08123456789', 'Jl. Gatot Subroto Jakarta', '12000', 'Completed', 1, 1, 1, 34000, '2022-04-08 07:24:38', '2022-04-08 08:47:11'),
(2, 2, NULL, NULL, NULL, NULL, 'Incomplete', 1, NULL, 1, 36000, '2022-04-08 08:48:37', '2022-04-08 08:48:37'),
(3, 2, NULL, NULL, NULL, NULL, 'Incomplete', 2, NULL, 2, 37000, '2022-04-08 08:51:39', '2022-04-08 08:51:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'customer',
  `image` varchar(255) DEFAULT 'default.jpg',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrator', 'admin@tbc.net', '$2b$10$.1ROyEr8.ngimGZqGrwH2eoNPeSPIeG90QodNpe9rSN6sbcmyZz/6', 'admin', 'waysbucks.png', '2022-02-27 09:32:37', '2022-02-27 11:02:21'),
(2, 'Bayu Perkasa', 'bayupks@tbc.net', '$2b$10$1/pe34KQjQ/W0GoGvR0QQeVpO52qbZkFaqVCu7nf5sfhXIW0f04FW', 'customer', '1648637087003-bayu.jpg', '2022-02-27 10:59:22', '2022-03-30 10:44:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beverages`
--
ALTER TABLE `beverages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `toppings`
--
ALTER TABLE `toppings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `beverageId` (`beverageId`),
  ADD KEY `toppingId` (`toppingId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `beverages`
--
ALTER TABLE `beverages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `toppings`
--
ALTER TABLE `toppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`beverageId`) REFERENCES `beverages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`toppingId`) REFERENCES `toppings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
