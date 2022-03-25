-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2022 at 10:30 AM
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
(1, 'Ice Coffee Palm Sugar', 27000, 'palmsugar.png', '2022-02-19 14:22:41', '2022-02-19 14:22:41'),
(2, 'Ice Coffee Green Tea', 31000, 'greentea.png', '2022-02-20 12:26:56', '2022-02-20 12:26:56'),
(3, 'Hanami Latte', 29000, 'latte.png', '2022-02-21 10:36:50', '2022-02-21 10:36:50');

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
(1, 'Kiwi Popping Pearl', 5000, 'kiwi-pop-pearl.png', '2022-02-20 06:28:02', '2022-02-20 06:28:02'),
(2, 'Bubble Tea Gelatin', 4000, 'bubble-tea-gelatin.png', '2022-02-24 12:29:21', '2022-02-24 12:29:21'),
(3, 'Mango', 3500, 'mango.png', '2022-02-26 15:36:38', '2022-02-26 15:36:38'),
(4, 'Green Coconut', 4500, 'green-coconut.png', '2022-02-26 15:38:13', '2022-02-26 15:38:13'),
(5, 'Mango Boba', 4500, 'mango-boba.png', '2022-02-26 15:38:33', '2022-02-26 15:38:33'),
(6, 'Billberry Boba', 4000, 'bill-berry-boba.png', '2022-02-26 15:39:05', '2022-02-26 15:39:05'),
(7, 'Matcha Cantaloupe', 5500, 'matcha.png', '2022-02-26 15:39:46', '2022-02-26 15:39:46');

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
(1, 2, 'Bayu Perkasa', '081234567890', 'Jl. Jendral Soedirman No. 1, Krenceng, Jakarta Selatan', '12000', 'Completed', 2, 1, 7, 36500, '2022-03-01 10:43:42', '2022-03-01 10:48:07'),
(2, 2, 'Bayu Perkasa', '081234567890', 'Jl. Gatot Subroto No. 1', '12000', 'Completed', 2, 2, 6, 70000, '2022-03-18 03:19:03', '2022-03-18 03:22:43'),
(3, 2, 'Bayu Perkasa', '081888888880', 'Jl. Indramayu No. 98', '19065', 'Waiting', 1, 1, 7, 32500, '2022-03-18 13:53:43', '2022-03-18 13:56:36');

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
(2, 'Bayu Perkasa', 'bayupks@tbc.net', '$2b$10$1/pe34KQjQ/W0GoGvR0QQeVpO52qbZkFaqVCu7nf5sfhXIW0f04FW', 'customer', '1647514109334-bayu.jpg', '2022-02-27 10:59:22', '2022-03-17 10:48:29');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `toppings`
--
ALTER TABLE `toppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
